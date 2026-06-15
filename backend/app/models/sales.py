"""Histórico de ventas: una fila por producto y día.

Es la materia prima del forecast. La ingesta normaliza cualquier fichero
(ventas, snapshots de stock, export de ERP) a este formato diario por SKU.
"""

from datetime import date

from sqlalchemy import Date, Float, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class SalesRecord(Base):
    __tablename__ = "sales_records"
    __table_args__ = (
        UniqueConstraint("product_id", "date", name="uq_sales_product_date"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id"), index=True, nullable=False
    )
    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id", ondelete="CASCADE"), index=True, nullable=False
    )
    date: Mapped[date] = mapped_column(Date, nullable=False)
    units: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
