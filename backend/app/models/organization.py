"""Organización: unidad de aislamiento de datos (multi-tenant).

Cada usuario pertenece a una organización; los productos, importaciones,
ventas y previsiones cuelgan de ella. Así varios usuarios de una misma empresa
comparten el mismo catálogo y forecast.
"""

from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin


class Organization(Base, TimestampMixin):
    __tablename__ = "organizations"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
