"""Panel de administración de plataforma.

Endpoints protegidos por rol "admin" que operan a través de TODAS las
organizaciones (a diferencia del resto de la API, que se aísla por org).
"""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import AdminUser
from app.db.session import get_db
from app.models.forecast import Forecast
from app.models.import_job import ImportJob
from app.models.organization import Organization
from app.models.product import Product
from app.models.sales import SalesRecord
from app.models.user import User
from app.schemas.admin import (
    AdminOrganization,
    AdminOverview,
    AdminUserRow,
    AdminUserUpdate,
)

router = APIRouter(prefix="/admin", tags=["admin"])

DbSession = Annotated[AsyncSession, Depends(get_db)]
_ROLES = {"owner", "member", "admin"}


@router.get("/overview", response_model=AdminOverview)
async def overview(admin: AdminUser, db: DbSession) -> AdminOverview:
    async def count(model) -> int:
        return int(await db.scalar(select(func.count()).select_from(model)) or 0)

    active_users = int(
        await db.scalar(
            select(func.count()).select_from(User).where(User.is_active.is_(True))
        )
        or 0
    )
    return AdminOverview(
        organizations=await count(Organization),
        users=await count(User),
        active_users=active_users,
        products=await count(Product),
        sales_records=await count(SalesRecord),
        forecasts=await count(Forecast),
        imports=await count(ImportJob),
    )


@router.get("/organizations", response_model=list[AdminOrganization])
async def organizations(admin: AdminUser, db: DbSession) -> list[AdminOrganization]:
    orgs = list((await db.execute(select(Organization).order_by(Organization.id))).scalars())

    users_by_org = dict(
        (await db.execute(select(User.organization_id, func.count()).group_by(User.organization_id))).all()
    )
    prod_count_by_org = dict(
        (await db.execute(select(Product.organization_id, func.count()).group_by(Product.organization_id))).all()
    )
    value_by_org = dict(
        (
            await db.execute(
                select(Product.organization_id, func.coalesce(func.sum(Product.current_stock * Product.unit_cost), 0.0))
                .group_by(Product.organization_id)
            )
        ).all()
    )

    return [
        AdminOrganization(
            id=o.id,
            name=o.name,
            users=int(users_by_org.get(o.id, 0)),
            products=int(prod_count_by_org.get(o.id, 0)),
            inventory_value=round(float(value_by_org.get(o.id, 0.0)), 2),
            created_at=o.created_at,
        )
        for o in orgs
    ]


@router.get("/users", response_model=list[AdminUserRow])
async def users(admin: AdminUser, db: DbSession) -> list[AdminUserRow]:
    rows = (
        await db.execute(
            select(User, Organization.name)
            .join(Organization, Organization.id == User.organization_id)
            .order_by(User.id)
        )
    ).all()
    return [
        AdminUserRow(
            id=u.id,
            email=u.email,
            name=u.name,
            company=u.company,
            role=u.role,
            is_active=u.is_active,
            organization_id=u.organization_id,
            organization_name=org_name,
            created_at=u.created_at,
        )
        for u, org_name in rows
    ]


@router.patch("/users/{user_id}", response_model=AdminUserRow)
async def update_user(
    user_id: int, payload: AdminUserUpdate, admin: AdminUser, db: DbSession
) -> AdminUserRow:
    user = await db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")

    if payload.role is not None:
        if payload.role not in _ROLES:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Rol no válido")
        user.role = payload.role
    if payload.is_active is not None:
        # Evita que un admin se desactive a sí mismo y se quede fuera.
        if user.id == admin.id and not payload.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No puedes desactivar tu propia cuenta.",
            )
        user.is_active = payload.is_active

    await db.commit()
    await db.refresh(user)
    org_name = await db.scalar(
        select(Organization.name).where(Organization.id == user.organization_id)
    )
    return AdminUserRow(
        id=user.id,
        email=user.email,
        name=user.name,
        company=user.company,
        role=user.role,
        is_active=user.is_active,
        organization_id=user.organization_id,
        organization_name=org_name or "—",
        created_at=user.created_at,
    )
