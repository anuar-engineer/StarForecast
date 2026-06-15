"""Esquemas del panel de administración de plataforma (cross-organización)."""

from datetime import datetime

from pydantic import BaseModel


class AdminOverview(BaseModel):
    organizations: int
    users: int
    active_users: int
    products: int
    sales_records: int
    forecasts: int
    imports: int


class AdminOrganization(BaseModel):
    id: int
    name: str
    users: int
    products: int
    inventory_value: float
    created_at: datetime


class AdminUserRow(BaseModel):
    id: int
    email: str
    name: str
    company: str | None
    role: str
    is_active: bool
    organization_id: int
    organization_name: str
    created_at: datetime


class AdminUserUpdate(BaseModel):
    is_active: bool | None = None
    role: str | None = None
