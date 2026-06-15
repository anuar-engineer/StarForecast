"""Gestión del equipo de una organización (rol gestor: owner o admin).

Cada gestor solo ve y administra los usuarios de SU propia organización, y nunca
puede crear ni asignar el rol "admin" (reservado a la plataforma).
"""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import ManagerUser
from app.core.security import hash_password
from app.db.session import get_db
from app.models.user import User
from app.schemas.team import TeamMember, TeamMemberCreate, TeamMemberUpdate

router = APIRouter(prefix="/team", tags=["team"])

DbSession = Annotated[AsyncSession, Depends(get_db)]
# Roles que un gestor puede asignar dentro de su organización.
_ASSIGNABLE = {"owner", "member"}


@router.get("/members", response_model=list[TeamMember])
async def list_members(manager: ManagerUser, db: DbSession) -> list[User]:
    rows = (
        await db.execute(
            select(User)
            .where(User.organization_id == manager.organization_id)
            .order_by(User.id)
        )
    ).scalars()
    return list(rows)


@router.post("/members", response_model=TeamMember, status_code=status.HTTP_201_CREATED)
async def create_member(payload: TeamMemberCreate, manager: ManagerUser, db: DbSession) -> User:
    if payload.role not in _ASSIGNABLE:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Rol no válido. Solo puedes asignar 'owner' o 'member'.",
        )
    exists = (
        await db.execute(select(User).where(User.email == payload.email.lower()))
    ).scalar_one_or_none()
    if exists is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Ya existe una cuenta con ese correo.",
        )

    user = User(
        email=payload.email.lower(),
        name=payload.name,
        password_hash=hash_password(payload.password),
        organization_id=manager.organization_id,
        role=payload.role,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@router.patch("/members/{user_id}", response_model=TeamMember)
async def update_member(
    user_id: int, payload: TeamMemberUpdate, manager: ManagerUser, db: DbSession
) -> User:
    user = await db.get(User, user_id)
    if user is None or user.organization_id != manager.organization_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    # Un gestor no puede tocar a un admin de plataforma.
    if user.role == "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No puedes gestionar a un administrador de plataforma.",
        )

    if payload.role is not None:
        if payload.role not in _ASSIGNABLE:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Rol no válido. Solo puedes asignar 'owner' o 'member'.",
            )
        user.role = payload.role
    if payload.is_active is not None:
        if user.id == manager.id and not payload.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No puedes desactivar tu propia cuenta.",
            )
        user.is_active = payload.is_active

    await db.commit()
    await db.refresh(user)
    return user
