"""Esquemas de productos y de la serie de forecast por producto."""

from datetime import date

from pydantic import BaseModel, ConfigDict


class ProductRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    sku: str
    name: str
    category: str
    current_stock: int
    reorder_point: int
    unit_cost: float
    lead_time_days: int
    avg_daily_sales: float
    forecast_model: str | None = None
    forecast_mape: float | None = None
    forecast_daily_demand: float | None = None
    safety_stock: int | None = None
    projected_stockout_day: int | None = None
    days_of_cover: float | None = None
    inventory_value: float = 0.0
    forecast_updated_at: date | None = None


class ForecastPoint(BaseModel):
    day: int
    date: str
    value: float
    lo: float | None = None
    hi: float | None = None
    forecast: bool


class ProductDetail(ProductRead):
    series: list[ForecastPoint] = []
