"""Registro de una importación de fichero (estado y resumen de validación)."""

from sqlalchemy import JSON, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin


class ImportJob(Base, TimestampMixin):
    __tablename__ = "import_jobs"

    id: Mapped[int] = mapped_column(primary_key=True)
    organization_id: Mapped[int] = mapped_column(index=True, nullable=False)

    filename: Mapped[str] = mapped_column(nullable=False)
    # "pending" | "processing" | "completed" | "error"
    status: Mapped[str] = mapped_column(default="pending", nullable=False)
    # Tipo detectado del fichero: "sales" | "stock" | "catalog" | "unknown"
    kind: Mapped[str] = mapped_column(default="unknown", nullable=False)

    rows_total: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    rows_ok: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    rows_error: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    products_affected: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    # Mapeo de columnas detectado y muestra de errores (para mostrar al usuario).
    detected_columns: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    errors: Mapped[list | None] = mapped_column(JSON, nullable=True)
    message: Mapped[str | None] = mapped_column(nullable=True)
