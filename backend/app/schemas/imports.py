"""Esquemas de importación de ficheros."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ImportJobRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    filename: str
    status: str
    kind: str
    rows_total: int
    rows_ok: int
    rows_error: int
    products_affected: int
    detected_columns: dict | None = None
    errors: list | None = None
    message: str | None = None
    created_at: datetime
