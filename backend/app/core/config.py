"""Configuración de la aplicación, leída de variables de entorno.

Todos los valores tienen un valor por defecto razonable para desarrollo, pero
en producción deben sobreescribirse (sobre todo ``JWT_SECRET`` y las
credenciales de la base de datos) vía variables de entorno / docker-compose.
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # --- App ---
    app_name: str = "Star4cast API"
    api_prefix: str = "/api"
    debug: bool = False

    # --- Base de datos (PostgreSQL async / asyncpg) ---
    database_url: str = "postgresql+asyncpg://star4cast:star4cast@db:5432/star4cast"

    # --- Seguridad / JWT ---
    jwt_secret: str = "dev-insecure-change-me"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60 * 24  # 24 h

    # --- CORS (lista separada por comas) ---
    cors_origins: str = "http://localhost:4200,http://localhost:8080"

    # --- Sembrado inicial (usuario demo) ---
    seed_demo_data: bool = True
    demo_email: str = "demo@star4cast.com"
    demo_password: str = "demo1234"
    demo_name: str = "Equipo Demo"

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
