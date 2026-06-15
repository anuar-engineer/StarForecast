"""Modelo de producto de inventario (por organización).

Guarda el estado de stock, unos pocos parámetros de aprovisionamiento y el
resumen de la última previsión (demanda diaria estimada, fecha de rotura, punto
de pedido y stock de seguridad). La serie completa del forecast vive en el
modelo ``Forecast``.
"""

from datetime import date

from sqlalchemy import Float, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin


class Product(Base, TimestampMixin):
    __tablename__ = "products"
    # El SKU es único dentro de cada organización, no de forma global.
    __table_args__ = (UniqueConstraint("organization_id", "sku", name="uq_product_org_sku"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id"), index=True, nullable=False
    )

    sku: Mapped[str] = mapped_column(index=True, nullable=False)
    name: Mapped[str] = mapped_column(nullable=False)
    category: Mapped[str] = mapped_column(nullable=False, default="Sin categoría")

    current_stock: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    reorder_point: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    avg_daily_sales: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    unit_cost: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    lead_time_days: Mapped[int] = mapped_column(Integer, nullable=False, default=7)

    # --- Resumen del último forecast (lo rellena el motor de predicción) ---
    forecast_model: Mapped[str | None] = mapped_column(nullable=True)
    forecast_mape: Mapped[float | None] = mapped_column(Float, nullable=True)
    forecast_daily_demand: Mapped[float | None] = mapped_column(Float, nullable=True)
    safety_stock: Mapped[int | None] = mapped_column(Integer, nullable=True)
    # Día relativo (>=0) en el que se prevé la rotura; None si no se prevé.
    projected_stockout_day: Mapped[int | None] = mapped_column(Integer, nullable=True)
    forecast_updated_at: Mapped[date | None] = mapped_column(nullable=True)

    @property
    def daily_demand(self) -> float:
        """Demanda diaria efectiva: la del forecast si existe, si no la media."""
        if self.forecast_daily_demand is not None and self.forecast_daily_demand > 0:
            return self.forecast_daily_demand
        return self.avg_daily_sales

    @property
    def days_of_cover(self) -> float | None:
        """Días de stock restantes al ritmo de demanda (None si no hay demanda)."""
        demand = self.daily_demand
        if demand <= 0:
            return None
        return self.current_stock / demand

    @property
    def inventory_value(self) -> float:
        return self.current_stock * self.unit_cost
