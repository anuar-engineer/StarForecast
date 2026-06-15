"""Importación de ficheros de inventario (CSV / Excel) y su historial."""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import ManagerUser
from app.core.config import settings
from app.db.session import get_db
from app.models.import_job import ImportJob
from app.schemas.imports import ImportJobRead
from app.services.ingestion import parse_file
from app.services.processing import apply_import, run_forecasts

router = APIRouter(prefix="/imports", tags=["imports"])

DbSession = Annotated[AsyncSession, Depends(get_db)]
_ALLOWED = (".csv", ".tsv", ".txt", ".xlsx", ".xls")


@router.post("", response_model=ImportJobRead, status_code=status.HTTP_201_CREATED)
async def create_import(file: UploadFile, manager: ManagerUser, db: DbSession) -> ImportJob:
    org_id = manager.organization_id
    filename = file.filename or "import"
    if not filename.lower().endswith(_ALLOWED):
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Formato no soportado. Sube un CSV o un Excel (.xlsx).",
        )

    content = await file.read()
    if len(content) > settings.max_upload_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="El fichero supera el tamaño máximo permitido.",
        )

    job = ImportJob(organization_id=org_id, filename=filename, status="processing")
    db.add(job)
    await db.commit()
    await db.refresh(job)

    try:
        parsed = parse_file(filename, content)
        product_ids = await apply_import(db, org_id, parsed)
        await run_forecasts(db, org_id, product_ids)

        job.kind = parsed.kind
        job.rows_total = parsed.rows_total
        job.rows_ok = parsed.rows_ok
        job.rows_error = parsed.rows_error
        job.products_affected = len(product_ids)
        job.detected_columns = parsed.detected
        job.errors = parsed.errors or None
        job.status = "completed"
        job.message = (
            f"Importadas {parsed.rows_ok} filas ({parsed.kind}) sobre "
            f"{len(product_ids)} productos."
        )
    except Exception as exc:  # noqa: BLE001 - se reporta al cliente
        job.status = "error"
        job.message = str(exc)

    await db.commit()
    await db.refresh(job)
    return job


@router.get("", response_model=list[ImportJobRead])
async def list_imports(manager: ManagerUser, db: DbSession) -> list[ImportJob]:
    rows = (
        await db.execute(
            select(ImportJob)
            .where(ImportJob.organization_id == manager.organization_id)
            .order_by(ImportJob.created_at.desc())
            .limit(50)
        )
    ).scalars()
    return list(rows)
