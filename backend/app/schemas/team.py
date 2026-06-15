"""Esquemas de gestión del equipo dentro de una organización (rol gestor)."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class TeamMember(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: EmailStr
    name: str
    role: str
    is_active: bool
    created_at: datetime


class TeamMemberCreate(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=120)
    password: str = Field(min_length=8, max_length=128)
    # Un gestor solo puede crear "member" o "owner" (nunca "admin").
    role: str = "member"


class TeamMemberUpdate(BaseModel):
    role: str | None = None
    is_active: bool | None = None
