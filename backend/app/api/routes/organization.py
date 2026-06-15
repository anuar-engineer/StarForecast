"""Datos de la organización del usuario (lectura/edición por el gestor)."""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import ManagerUser
from app.db.session import get_db
from app.models.organization import Organization
from app.schemas.organization import OrganizationRead, OrganizationUpdate

router = APIRouter(prefix="/organization", tags=["organization"])

DbSession = Annotated[AsyncSession, Depends(get_db)]


@router.get("", response_model=OrganizationRead)
async def get_organization(manager: ManagerUser, db: DbSession) -> Organization:
    org = await db.get(Organization, manager.organization_id)
    if org is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Organización no encontrada")
    return org


@router.patch("", response_model=OrganizationRead)
async def update_organization(
    payload: OrganizationUpdate, manager: ManagerUser, db: DbSession
) -> Organization:
    org = await db.get(Organization, manager.organization_id)
    if org is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Organización no encontrada")
    org.name = payload.name
    await db.commit()
    await db.refresh(org)
    return org
