"""Sembrado inicial: usuario demo y un catálogo de productos de ejemplo.

Es idempotente: si el usuario demo ya existe, no hace nada. Permite probar el
login y ver el dashboard con datos reales nada más levantar el stack.
"""

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import hash_password
from app.models.product import Product
from app.models.user import User

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


async def seed(db: AsyncSession) -> None:
    if not settings.seed_demo_data:
        return

    existing = await db.execute(select(User).where(User.email == settings.demo_email.lower()))
    if existing.scalar_one_or_none() is None:
        db.add(
            User(
                email=settings.demo_email.lower(),
                name=settings.demo_name,
                company="Star4cast Demo S.L.",
                password_hash=hash_password(settings.demo_password),
            )
        )

    count = await db.scalar(select(func.count()).select_from(Product))
    if not count:
        for sku, name, cat, stock, rop, sales, cost, lead in _DEMO_PRODUCTS:
            db.add(
                Product(
                    sku=sku,
                    name=name,
                    category=cat,
                    current_stock=stock,
                    reorder_point=rop,
                    avg_daily_sales=sales,
                    unit_cost=cost,
                    lead_time_days=lead,
                )
            )

    await db.commit()
