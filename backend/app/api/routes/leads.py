"""Formulario público de contacto (sin autenticación)."""

from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.lead import Lead
from app.schemas.lead import LeadCreate

router = APIRouter(prefix="/leads", tags=["leads"])

DbSession = Annotated[AsyncSession, Depends(get_db)]


def _clean(value: str | None) -> str | None:
    value = (value or "").strip()
    return value or None


@router.post("", status_code=status.HTTP_202_ACCEPTED)
async def create_lead(payload: LeadCreate, db: DbSession) -> dict[str, str]:
    # Si el honeypot viene relleno respondemos igual que en un envío válido,
    # para no darle pistas al bot, pero no guardamos nada.
    if _clean(payload.website):
        return {"status": "ok"}
    db.add(
        Lead(
            name=payload.name.strip(),
            email=payload.email.lower(),
            company=_clean(payload.company),
            plan=_clean(payload.plan),
            platform=_clean(payload.platform),
            catalog_size=_clean(payload.catalog_size),
            message=_clean(payload.message),
        )
    )
    await db.commit()
    return {"status": "ok"}
