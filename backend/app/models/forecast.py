"""Previsión persistida de un producto (serie completa con banda de confianza)."""

from datetime import datetime

from sqlalchemy import JSON, DateTime, Float, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Forecast(Base):
    __tablename__ = "forecasts"

    id: Mapped[int] = mapped_column(primary_key=True)
    organization_id: Mapped[int] = mapped_column(index=True, nullable=False)
    # Una previsión vigente por producto (se reemplaza al recalcular).
    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id", ondelete="CASCADE"), unique=True, index=True, nullable=False
    )

    model: Mapped[str] = mapped_column(nullable=False)
    mape: Mapped[float | None] = mapped_column(Float, nullable=True)
    daily_demand: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)

    # Serie: lista de {day, date, value, lo, hi, forecast} (histórico + predicción).
    series: Mapped[list] = mapped_column(JSON, nullable=False, default=list)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
