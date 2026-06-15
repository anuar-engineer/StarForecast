"""Persistencia de una importación y orquestación del recálculo de forecast.

Convierte un ``ParsedImport`` en filas de la BD (productos + ventas) y, a
continuación, recalcula la previsión de los productos afectados con el motor de
``forecast.py``. El cálculo (CPU-bound) se delega a un threadpool para no
bloquear el event loop.
"""

from __future__ import annotations

from collections import defaultdict
from datetime import date, timezone, datetime

from sqlalchemy import delete, select
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.concurrency import run_in_threadpool

from app.core.config import settings
from app.models.forecast import Forecast
from app.models.product import Product
from app.models.sales import SalesRecord
from app.services.forecast import forecast_product
from app.services.ingestion import ParsedImport


async def apply_import(db: AsyncSession, org_id: int, parsed: ParsedImport) -> set[int]:
    """Inserta/actualiza productos y ventas. Devuelve los ids de producto tocados."""
    # SKUs que aparecen, ya sea en el maestro o en las ventas.
    skus = set(parsed.products) | {s[0] for s in parsed.sales}
    if not skus:
        return set()

    existing = {
        p.sku: p
        for p in (
            await db.execute(
                select(Product).where(Product.organization_id == org_id, Product.sku.in_(skus))
            )
        ).scalars()
    }

    for sku in skus:
        meta = parsed.products.get(sku, {})
        product = existing.get(sku)
        if product is None:
            product = Product(
                organization_id=org_id,
                sku=sku,
                name=meta.get("name") or sku,
                category=meta.get("category") or "Sin categoría",
            )
            db.add(product)
            existing[sku] = product
        else:
            if meta.get("name"):
                product.name = meta["name"]
            if meta.get("category"):
                product.category = meta["category"]
        if "unit_cost" in meta:
            product.unit_cost = meta["unit_cost"]
        if "lead_time_days" in meta:
            product.lead_time_days = meta["lead_time_days"]
        if "reorder_point" in meta:
            product.reorder_point = meta["reorder_point"]
        if "current_stock" in meta:
            product.current_stock = meta["current_stock"]

    await db.flush()  # asigna ids a los productos nuevos
    sku_to_id = {sku: p.id for sku, p in existing.items()}

    # Agrega ventas por (sku, fecha) y hace upsert (suma si se repite la fecha).
    agg: dict[tuple[int, date], float] = defaultdict(float)
    for sku, d, units in parsed.sales:
        pid = sku_to_id.get(sku)
        if pid is not None:
            agg[(pid, d)] += units

    if agg:
        rows = [
            {"organization_id": org_id, "product_id": pid, "date": d, "units": u}
            for (pid, d), u in agg.items()
        ]
        stmt = pg_insert(SalesRecord).values(rows)
        stmt = stmt.on_conflict_do_update(
            index_elements=["product_id", "date"],
            set_={"units": stmt.excluded.units},
        )
        await db.execute(stmt)

    await db.commit()
    return {sku_to_id[s] for s in skus if s in sku_to_id}


async def run_forecasts(
    db: AsyncSession, org_id: int, product_ids: set[int] | None = None
) -> int:
    """Recalcula y persiste el forecast de los productos indicados (o todos)."""
    today = date.today()
    q = select(Product).where(Product.organization_id == org_id)
    if product_ids is not None:
        if not product_ids:
            return 0
        q = q.where(Product.id.in_(product_ids))
    products = list((await db.execute(q)).scalars())

    done = 0
    for product in products:
        sales_rows = (
            await db.execute(
                select(SalesRecord.date, SalesRecord.units)
                .where(SalesRecord.product_id == product.id)
                .order_by(SalesRecord.date)
            )
        ).all()
        sales = [(r.date, float(r.units)) for r in sales_rows]

        result = await run_in_threadpool(
            forecast_product,
            sales,
            product.current_stock,
            product.lead_time_days,
            today,
            settings.forecast_history_days,
            settings.forecast_horizon_days,
            settings.forecast_service_level,
        )

        # Demanda media histórica (mantiene avg_daily_sales con sentido).
        if sales:
            span_days = max((today - min(d for d, _ in sales)).days + 1, 1)
            product.avg_daily_sales = round(sum(u for _, u in sales) / span_days, 3)

        product.forecast_model = result.model
        product.forecast_mape = result.mape
        product.forecast_daily_demand = result.daily_demand
        product.safety_stock = result.safety_stock
        product.projected_stockout_day = result.projected_stockout_day
        product.forecast_updated_at = today
        # Punto de pedido: demanda durante el lead time + stock de seguridad.
        product.reorder_point = int(
            round(result.daily_demand * product.lead_time_days + result.safety_stock)
        )

        # Reemplaza la previsión vigente del producto.
        await db.execute(delete(Forecast).where(Forecast.product_id == product.id))
        db.add(
            Forecast(
                organization_id=org_id,
                product_id=product.id,
                model=result.model,
                mape=result.mape,
                daily_demand=result.daily_demand,
                series=result.series,
                created_at=datetime.now(timezone.utc),
            )
        )
        done += 1

    await db.commit()
    return done
