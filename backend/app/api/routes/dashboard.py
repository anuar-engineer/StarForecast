"""Resumen del dashboard por organización, sobre los forecasts reales.

Mantiene el mismo contrato de respuesta (DashboardSummary) que la versión
inicial, pero ahora los datos salen del histórico importado y de la previsión
persistida por producto: la serie de stock agregada se reconstruye sumando la
proyección real de cada referencia, y las alertas usan la fecha de rotura
estimada por el modelo.
"""

from collections import defaultdict
from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import CurrentOrgId
from app.core.config import settings
from app.db.session import get_db
from app.models.forecast import Forecast
from app.models.product import Product
from app.schemas.dashboard import (
    CategoryBreakdown,
    DashboardSummary,
    Kpi,
    SeriesPoint,
    StockAlert,
)

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

_RISK_DAYS = 14
_CRITICAL_DAYS = 5


@router.get("/summary", response_model=DashboardSummary)
async def summary(org_id: CurrentOrgId, db: Annotated[AsyncSession, Depends(get_db)]) -> DashboardSummary:
    products = list(
        (await db.execute(select(Product).where(Product.organization_id == org_id))).scalars()
    )
    forecasts = {
        f.product_id: f
        for f in (
            await db.execute(select(Forecast).where(Forecast.organization_id == org_id))
        ).scalars()
    }

    total = len(products)
    inventory_value = sum(p.inventory_value for p in products)
    covers = [p.days_of_cover for p in products if p.days_of_cover is not None]
    avg_cover = sum(covers) / len(covers) if covers else 0.0

    # --- Alertas: rotura estimada por el forecast o poca cobertura. ---
    alerts: list[StockAlert] = []
    at_risk = 0
    for p in products:
        stockout = p.projected_stockout_day
        cover = p.days_of_cover
        risk_metric = stockout if stockout is not None else (int(cover) if cover is not None else None)
        if risk_metric is None or risk_metric > _RISK_DAYS:
            continue
        at_risk += 1
        alerts.append(
            StockAlert(
                sku=p.sku,
                name=p.name,
                category=p.category,
                current_stock=p.current_stock,
                days_of_cover=round(cover, 1) if cover is not None else None,
                projected_stockout_days=risk_metric,
                severity="critical" if risk_metric <= _CRITICAL_DAYS else "warning",
            )
        )
    alerts.sort(key=lambda a: a.projected_stockout_days if a.projected_stockout_days is not None else 1e9)

    kpi = Kpi(
        total_products=total,
        at_risk=at_risk,
        healthy=total - at_risk,
        inventory_value=round(inventory_value, 2),
        avg_days_of_cover=round(avg_cover, 1),
    )

    stock_series = _aggregate_stock_series(products, forecasts)

    # --- Desglose por categoría. ---
    by_category: dict[str, CategoryBreakdown] = {}
    for p in products:
        entry = by_category.get(p.category)
        if entry is None:
            by_category[p.category] = CategoryBreakdown(
                category=p.category, products=1, inventory_value=round(p.inventory_value, 2)
            )
        else:
            entry.products += 1
            entry.inventory_value = round(entry.inventory_value + p.inventory_value, 2)
    categories = sorted(by_category.values(), key=lambda c: c.inventory_value, reverse=True)

    return DashboardSummary(kpi=kpi, alerts=alerts, stock_series=stock_series, categories=categories)


def _aggregate_stock_series(
    products: list[Product], forecasts: dict[int, Forecast]
) -> list[SeriesPoint]:
    """Suma la proyección de stock de cada producto (histórico real + forecast)."""
    history = settings.forecast_history_days
    horizon = settings.forecast_horizon_days
    agg: dict[int, float] = defaultdict(float)

    for p in products:
        cur = float(p.current_stock)
        fc = forecasts.get(p.id)
        demand = {pt["day"]: float(pt["value"]) for pt in fc.series} if fc and fc.series else {}

        if demand:
            agg[0] += max(cur, 0.0)
            run = cur
            for d in sorted(x for x in demand if x > 0):
                run -= demand[d]
                agg[d] += max(run, 0.0)
            cum = 0.0
            for d in sorted((x for x in demand if x < 0), reverse=True):
                cum += demand.get(d + 1, 0.0)
                agg[d] += max(cur + cum, 0.0)
        else:
            # Sin forecast: proyección lineal con la demanda media.
            rate = p.daily_demand
            for d in range(-history, horizon + 1):
                agg[d] += max(cur - rate * d, 0.0)

    days = sorted(agg) or [0]
    return [SeriesPoint(day=d, value=round(agg[d], 1), forecast=d > 0) for d in days]
