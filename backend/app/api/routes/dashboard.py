"""Resumen del dashboard: KPIs, alertas de rotura y serie de stock agregada.

El cálculo es deliberadamente sencillo (proyección lineal por días de cobertura)
hasta que exista el modelo de series temporales del backend de forecast. Sirve
para alimentar la portada del panel con datos reales de la base de datos.
"""

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import CurrentUser
from app.db.session import get_db
from app.models.product import Product
from app.schemas.dashboard import (
    CategoryBreakdown,
    DashboardSummary,
    Kpi,
    SeriesPoint,
    StockAlert,
)

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

# Umbral de días de cobertura para considerar un producto en riesgo de rotura.
_RISK_DAYS = 14
_CRITICAL_DAYS = 5
_HISTORY_DAYS = 30
_FORECAST_DAYS = 30


@router.get("/summary", response_model=DashboardSummary)
async def summary(
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> DashboardSummary:
    products = list((await db.execute(select(Product))).scalars().all())

    total = len(products)
    inventory_value = sum(p.inventory_value for p in products)
    total_daily_sales = sum(p.avg_daily_sales for p in products)
    total_stock = sum(p.current_stock for p in products)

    covers = [p.days_of_cover for p in products if p.days_of_cover is not None]
    avg_cover = sum(covers) / len(covers) if covers else 0.0

    # --- Alertas: productos con poca cobertura, los más urgentes primero. ---
    alerts: list[StockAlert] = []
    at_risk = 0
    for p in products:
        cover = p.days_of_cover
        if cover is None or cover > _RISK_DAYS:
            continue
        at_risk += 1
        alerts.append(
            StockAlert(
                sku=p.sku,
                name=p.name,
                category=p.category,
                current_stock=p.current_stock,
                days_of_cover=round(cover, 1),
                projected_stockout_days=int(cover),
                severity="critical" if cover <= _CRITICAL_DAYS else "warning",
            )
        )
    alerts.sort(key=lambda a: a.days_of_cover if a.days_of_cover is not None else 1e9)

    kpi = Kpi(
        total_products=total,
        at_risk=at_risk,
        healthy=total - at_risk,
        inventory_value=round(inventory_value, 2),
        avg_days_of_cover=round(avg_cover, 1),
    )

    # --- Serie de stock agregada: histórico sintético + forecast lineal. ---
    # Histórico: se reconstruye hacia atrás sumando ventas (stock pasado mayor).
    # Forecast: el stock total baja al ritmo de venta agregado.
    stock_series: list[SeriesPoint] = []
    for day in range(-_HISTORY_DAYS, _FORECAST_DAYS + 1):
        value = max(total_stock - total_daily_sales * day, 0.0)
        stock_series.append(SeriesPoint(day=day, value=round(value, 1), forecast=day > 0))

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

    return DashboardSummary(
        kpi=kpi, alerts=alerts, stock_series=stock_series, categories=categories
    )
