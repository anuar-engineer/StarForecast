"""Punto de entrada de la API de Star4cast (FastAPI)."""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import admin, auth, dashboard, imports, organization, products, team
from app.core.config import settings
from app.db.base import Base
from app.db.session import SessionLocal, engine
from app.seed import seed

# Importa los modelos para registrarlos en Base.metadata antes de create_all.
import app.models  # noqa: F401


@asynccontextmanager
async def lifespan(app: FastAPI):
    # En desarrollo creamos el esquema al arrancar; en producción se migraría
    # con Alembic, pero create_all es suficiente para este estadio del proyecto.
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    async with SessionLocal() as session:
        await seed(session)
    yield
    await engine.dispose()


app = FastAPI(title=settings.app_name, lifespan=lifespan, debug=settings.debug)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix=settings.api_prefix)
app.include_router(dashboard.router, prefix=settings.api_prefix)
app.include_router(imports.router, prefix=settings.api_prefix)
app.include_router(products.router, prefix=settings.api_prefix)
app.include_router(team.router, prefix=settings.api_prefix)
app.include_router(organization.router, prefix=settings.api_prefix)
app.include_router(admin.router, prefix=settings.api_prefix)


@app.get(f"{settings.api_prefix}/health", tags=["health"])
async def health() -> dict[str, str]:
    return {"status": "ok"}
