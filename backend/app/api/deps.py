"""Dependencias compartidas de la API (usuario autenticado vía Bearer JWT)."""

from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import decode_access_token
from app.db.session import get_db
from app.models.user import User

_bearer = HTTPBearer(auto_error=False)


async def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(_bearer)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> User:
    unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales no válidas",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if credentials is None:
        raise unauthorized

    subject = decode_access_token(credentials.credentials)
    if subject is None:
        raise unauthorized

    user = await db.get(User, int(subject)) if subject.isdigit() else None
    if user is None or not user.is_active:
        raise unauthorized
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]


async def get_current_org_id(current_user: CurrentUser) -> int:
    """Id de la organización del usuario autenticado (aísla todos los datos)."""
    return current_user.organization_id


CurrentOrgId = Annotated[int, Depends(get_current_org_id)]


async def get_current_admin(current_user: CurrentUser) -> User:
    """Exige rol de administrador de plataforma (acceso cross-organización)."""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Se requieren permisos de administrador.",
        )
    return current_user


AdminUser = Annotated[User, Depends(get_current_admin)]


async def get_current_manager(current_user: CurrentUser) -> User:
    """Exige gestionar el equipo: gestor de la organización (owner) o admin."""
    if current_user.role not in ("owner", "admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Solo el gestor de la organización puede gestionar el equipo.",
        )
    return current_user


ManagerUser = Annotated[User, Depends(get_current_manager)]
