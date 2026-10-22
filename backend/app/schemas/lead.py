"""Esquemas del formulario público de contacto."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class LeadCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company: str | None = Field(default=None, max_length=160)
    plan: str | None = Field(default=None, max_length=40)
    platform: str | None = Field(default=None, max_length=60)
    catalog_size: str | None = Field(default=None, max_length=40)
    message: str | None = Field(default=None, max_length=4000)
    # Honeypot anti-spam: invisible para personas; si llega relleno, es un bot.
    website: str | None = Field(default=None, max_length=200)


class LeadRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    company: str | None
    plan: str | None
    platform: str | None
    catalog_size: str | None
    message: str | None
    created_at: datetime
