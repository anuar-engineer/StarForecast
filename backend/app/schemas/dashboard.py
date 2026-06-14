"""Esquemas del resumen del dashboard."""

from pydantic import BaseModel


class Kpi(BaseModel):
    total_products: int
    at_risk: int
    healthy: int
    inventory_value: float
    avg_days_of_cover: float


class StockAlert(BaseModel):
    sku: str
    name: str
    category: str
    current_stock: int
    days_of_cover: float | None
    projected_stockout_days: int | None
    severity: str  # "critical" | "warning"


class SeriesPoint(BaseModel):
    day: int  # día relativo: negativo = histórico, 0 = hoy, positivo = forecast
    value: float
    forecast: bool


class CategoryBreakdown(BaseModel):
    category: str
    products: int
    inventory_value: float


class DashboardSummary(BaseModel):
    kpi: Kpi
    alerts: list[StockAlert]
    stock_series: list[SeriesPoint]
    categories: list[CategoryBreakdown]
