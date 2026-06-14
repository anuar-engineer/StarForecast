"""Modelo de producto de inventario.

Guarda el estado de stock y unos pocos parámetros de demanda que bastan para
calcular, sin un modelo de series temporales todavía, una proyección lineal de
cobertura y las alertas de rotura que muestra el dashboard.
"""

from sqlalchemy import Float, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin


class Product(Base, TimestampMixin):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True)
    sku: Mapped[str] = mapped_column(unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(nullable=False)
    category: Mapped[str] = mapped_column(nullable=False)

    current_stock: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    reorder_point: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    avg_daily_sales: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    unit_cost: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    lead_time_days: Mapped[int] = mapped_column(Integer, nullable=False, default=7)

    @property
    def days_of_cover(self) -> float | None:
        """Días de stock restantes al ritmo de venta medio (None si no vende)."""
        if self.avg_daily_sales <= 0:
            return None
        return self.current_stock / self.avg_daily_sales

    @property
    def inventory_value(self) -> float:
        return self.current_stock * self.unit_cost
