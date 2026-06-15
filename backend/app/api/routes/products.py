"""Catálogo de productos de la organización y detalle con su forecast."""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import CurrentOrgId, ManagerUser
from app.db.session import get_db
from app.models.forecast import Forecast
from app.models.product import Product
from app.schemas.products import ProductDetail, ProductRead
from app.services.processing import run_forecasts

router = APIRouter(prefix="/products", tags=["products"])

DbSession = Annotated[AsyncSession, Depends(get_db)]


@router.get("", response_model=list[ProductRead])
async def list_products(org_id: CurrentOrgId, db: DbSession) -> list[Product]:
    rows = (
        await db.execute(
            select(Product)
            .where(Product.organization_id == org_id)
            .order_by(Product.name)
        )
    ).scalars()
    return list(rows)


@router.get("/{product_id}", response_model=ProductDetail)
async def get_product(product_id: int, org_id: CurrentOrgId, db: DbSession) -> ProductDetail:
    product = (
        await db.execute(
            select(Product).where(Product.id == product_id, Product.organization_id == org_id)
        )
    ).scalar_one_or_none()
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado")

    forecast = (
        await db.execute(select(Forecast).where(Forecast.product_id == product_id))
    ).scalar_one_or_none()

    detail = ProductDetail.model_validate(product)
    if forecast is not None:
        detail = detail.model_copy(update={"series": forecast.series})
    return detail


@router.post("/reforecast")
async def reforecast(manager: ManagerUser, db: DbSession) -> dict[str, int]:
    """Recalcula la previsión de todo el catálogo (solo gestor de la organización)."""
    count = await run_forecasts(db, manager.organization_id, product_ids=None)
    return {"reforecasted": count}
