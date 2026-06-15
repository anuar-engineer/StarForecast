"""Rutas de autenticación: registro, login y usuario actual."""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import CurrentUser
from app.core.security import create_access_token, hash_password, verify_password
from app.db.session import get_db
from app.models.organization import Organization
from app.models.user import User
from app.schemas.auth import (
    PasswordChange,
    ProfileUpdate,
    Token,
    UserCreate,
    UserLogin,
    UserRead,
)

router = APIRouter(prefix="/auth", tags=["auth"])

DbSession = Annotated[AsyncSession, Depends(get_db)]


async def _get_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email.lower()))
    return result.scalar_one_or_none()


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(payload: UserCreate, db: DbSession) -> Token:
    if await _get_by_email(db, payload.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Ya existe una cuenta con ese correo",
        )
    # Cada cuenta nueva estrena su propia organización (es su "owner").
    org = Organization(name=payload.company or f"{payload.name} (organización)")
    db.add(org)
    await db.flush()
    user = User(
        email=payload.email.lower(),
        name=payload.name,
        company=payload.company,
        password_hash=hash_password(payload.password),
        organization_id=org.id,
        role="owner",
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return Token(access_token=create_access_token(str(user.id)), user=UserRead.model_validate(user))


@router.post("/login", response_model=Token)
async def login(payload: UserLogin, db: DbSession) -> Token:
    user = await _get_by_email(db, payload.email)
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos",
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Tu cuenta está desactivada. Contacta con el administrador.",
        )
    return Token(access_token=create_access_token(str(user.id)), user=UserRead.model_validate(user))


@router.get("/me", response_model=UserRead)
async def me(current_user: CurrentUser) -> UserRead:
    return UserRead.model_validate(current_user)


@router.patch("/me", response_model=UserRead)
async def update_me(payload: ProfileUpdate, current_user: CurrentUser, db: DbSession) -> UserRead:
    current_user.name = payload.name
    await db.commit()
    await db.refresh(current_user)
    return UserRead.model_validate(current_user)


@router.post("/password")
async def change_password(
    payload: PasswordChange, current_user: CurrentUser, db: DbSession
) -> dict[str, str]:
    if not verify_password(payload.current_password, current_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La contraseña actual no es correcta.",
        )
    current_user.password_hash = hash_password(payload.new_password)
    await db.commit()
    return {"status": "ok"}
