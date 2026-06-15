"""Sembrado inicial: organización demo, usuario demo, catálogo y un histórico
de ventas sintético realista (tendencia + estacionalidad semanal + ruido, con
algunas referencias de demanda intermitente) para que el forecast tenga datos
reales sobre los que trabajar nada más levantar el stack.

Es idempotente: si la organización demo ya tiene datos, no los duplica.
"""

import math
import random
from datetime import date, timedelta

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import hash_password
from app.models.organization import Organization
from app.models.product import Product
from app.models.sales import SalesRecord
from app.models.user import User
from app.services.processing import run_forecasts

# sku, nombre, categoría, stock, punto de pedido, venta media/día, coste, lead time
_DEMO_PRODUCTS = [
    ("SKU-1001", "Auriculares inalámbricos Aero", "Audio", 28, 40, 6.5, 24.90, 10),
    ("SKU-1002", "Altavoz portátil Pulse", "Audio", 320, 80, 4.2, 31.00, 14),
    ("SKU-1003", "Cargador USB-C 65W", "Accesorios", 12, 60, 9.1, 12.50, 7),
    ("SKU-1004", "Funda silicona iPhone", "Accesorios", 540, 120, 11.0, 4.20, 5),
    ("SKU-1005", "Smartwatch Solar S2", "Wearables", 64, 50, 3.0, 89.00, 21),
    ("SKU-1006", "Banda fitness Track", "Wearables", 18, 45, 7.8, 19.90, 12),
    ("SKU-1007", "Teclado mecánico Nova", "Periféricos", 210, 70, 2.4, 54.00, 18),
    ("SKU-1008", "Ratón ergonómico Glide", "Periféricos", 9, 30, 5.5, 22.00, 9),
    ("SKU-1009", "Webcam 4K Vision", "Periféricos", 145, 60, 3.7, 48.00, 15),
    ("SKU-1010", "Powerbank 20000mAh", "Accesorios", 76, 90, 12.3, 16.50, 8),
    ("SKU-1011", "Hub USB-C 7 en 1", "Accesorios", 33, 50, 4.9, 27.00, 11),
    ("SKU-1012", "Soporte monitor dual", "Mobiliario", 410, 60, 1.8, 39.00, 20),
]

_HISTORY_DAYS = 140


def _synth_sales(base: float, lead: int, rng: random.Random) -> list[float]:
    """Genera ventas diarias: nivel base + estacionalidad semanal + ruido.

    Las referencias de venta baja (base < 1.5) se modelan como intermitentes
    (días sueltos con pedido), para ejercitar el modelo tipo Croston.
    """
    intermittent = base < 1.5
    out: list[float] = []
    for i in range(_HISTORY_DAYS):
        if intermittent:
            out.append(float(rng.randint(1, 4)) if rng.random() < base / 2 else 0.0)
            continue
        weekday = (i % 7)
        season = 1.0 + 0.35 * math.sin(2 * math.pi * weekday / 7)
        trend = 1.0 + 0.0015 * i  # ligera tendencia al alza
        noise = rng.gauss(1.0, 0.25)
        out.append(max(round(base * season * trend * noise), 0))
    return out


async def seed(db: AsyncSession) -> None:
    if not settings.seed_demo_data:
        return

    org = (
        await db.execute(select(Organization).where(Organization.name == settings.demo_org))
    ).scalar_one_or_none()
    if org is None:
        org = Organization(name=settings.demo_org)
        db.add(org)
        await db.flush()

    user = (
        await db.execute(select(User).where(User.email == settings.demo_email.lower()))
    ).scalar_one_or_none()
    if user is None:
        db.add(
            User(
                email=settings.demo_email.lower(),
                name=settings.demo_name,
                company=settings.demo_org,
                password_hash=hash_password(settings.demo_password),
                organization_id=org.id,
                role="owner",
            )
        )

    # Administrador por defecto (mismo org demo, rol "admin").
    admin = (
        await db.execute(select(User).where(User.email == settings.admin_email.lower()))
    ).scalar_one_or_none()
    if admin is None:
        db.add(
            User(
                email=settings.admin_email.lower(),
                name=settings.admin_name,
                company=settings.demo_org,
                password_hash=hash_password(settings.admin_password),
                organization_id=org.id,
                role="admin",
            )
        )

    # Asegura que org y usuarios queden persistidos aunque ya existan productos
    # (en arranques posteriores no se entra en el bloque de seed de productos).
    await db.commit()

    count = await db.scalar(
        select(func.count()).select_from(Product).where(Product.organization_id == org.id)
    )
    if not count:
        rng = random.Random(42)
        today = date.today()
        for sku, name, cat, stock, rop, sales, cost, lead in _DEMO_PRODUCTS:
            product = Product(
                organization_id=org.id,
                sku=sku,
                name=name,
                category=cat,
                current_stock=stock,
                reorder_point=rop,
                avg_daily_sales=sales,
                unit_cost=cost,
                lead_time_days=lead,
            )
            db.add(product)
            await db.flush()
            daily = _synth_sales(sales, lead, rng)
            for offset, units in enumerate(daily):
                d = today - timedelta(days=_HISTORY_DAYS - offset)
                if units > 0:
                    db.add(
                        SalesRecord(
                            organization_id=org.id,
                            product_id=product.id,
                            date=d,
                            units=units,
                        )
                    )
        await db.commit()

    # Genera el forecast inicial si la organización aún no tiene previsiones.
    from app.models.forecast import Forecast

    has_fc = await db.scalar(
        select(func.count()).select_from(Forecast).where(Forecast.organization_id == org.id)
    )
    if not has_fc:
        await run_forecasts(db, org.id)
