"""Reexporta los modelos para que ``Base.metadata`` los conozca al crear tablas."""

from app.models.product import Product
from app.models.user import User

__all__ = ["User", "Product"]
