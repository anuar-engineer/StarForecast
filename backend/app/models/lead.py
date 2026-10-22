"""Mensaje del formulario de contacto de la web pública.

Mientras el registro público está cerrado, el formulario de contacto es la
única puerta de entrada: cada envío queda guardado
aquí para que el equipo dé de alta las cuentas a mano.
"""

from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin


class Lead(Base, TimestampMixin):
    __tablename__ = "leads"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(254), index=True, nullable=False)
    company: Mapped[str | None] = mapped_column(String(160))
    plan: Mapped[str | None] = mapped_column(String(40))
    platform: Mapped[str | None] = mapped_column(String(60))
    catalog_size: Mapped[str | None] = mapped_column(String(40))
    message: Mapped[str | None] = mapped_column(Text)
