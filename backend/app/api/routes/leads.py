"""Formulario público de contacto (sin autenticación)."""

from typing import Annotated

from fastapi import APIRouter, BackgroundTasks, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.db.session import get_db
from app.models.lead import Lead
from app.schemas.lead import LeadCreate
from app.services.mailer import send_email

router = APIRouter(prefix="/leads", tags=["leads"])

DbSession = Annotated[AsyncSession, Depends(get_db)]


def _clean(value: str | None) -> str | None:
    value = (value or "").strip()
    return value or None


@router.post("", status_code=status.HTTP_202_ACCEPTED)
async def create_lead(payload: LeadCreate, db: DbSession, background: BackgroundTasks) -> dict[str, str]:
    # Si el honeypot viene relleno respondemos igual que en un envío válido,
    # para no darle pistas al bot, pero no guardamos nada.
    if _clean(payload.website):
        return {"status": "ok"}
    lead = Lead(
        name=payload.name.strip(),
        email=payload.email.lower(),
        company=_clean(payload.company),
        plan=_clean(payload.plan),
        platform=_clean(payload.platform),
        catalog_size=_clean(payload.catalog_size),
        message=_clean(payload.message),
    )
    db.add(lead)
    await db.commit()
    # Aviso al equipo tras guardar; Reply-To al cliente para responder directamente.
    background.add_task(
        send_email,
        to=settings.lead_notify_to,
        subject=f"Nuevo contacto web: {lead.name}" + (f" ({lead.company})" if lead.company else ""),
        body=_notification_body(lead),
        reply_to=lead.email,
    )
    return {"status": "ok"}


def _notification_body(lead: Lead) -> str:
    fields = [
        ("Nombre", lead.name),
        ("Email", lead.email),
        ("Empresa", lead.company),
        ("Plan", lead.plan),
        ("Plataforma", lead.platform),
        ("Tamaño de catálogo", lead.catalog_size),
    ]
    lines = [f"{label}: {value}" for label, value in fields if value]
    lines += ["", "Mensaje:", lead.message or "(sin mensaje)"]
    return "\n".join(lines)
