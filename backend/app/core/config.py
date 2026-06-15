"""Configuración de la aplicación, leída de variables de entorno.

Todos los valores tienen un valor por defecto razonable para desarrollo, pero
en producción deben sobreescribirse (sobre todo ``JWT_SECRET`` y las
credenciales de la base de datos) vía variables de entorno / docker-compose.
"""

from functools import lru_cache

from pydantic import model_validator
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
    # Sin valor por defecto: es obligatorio definir JWT_SECRET en el entorno
    # (.env / docker-compose). La app no arranca si falta.
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60 * 24  # 24 h

    # --- CORS (lista separada por comas) ---
    cors_origins: str = "http://localhost:4200,http://localhost:8080"

    # --- Sembrado inicial (usuario demo + admin) ---
    # Las credenciales NO tienen valor por defecto: deben venir del entorno.
    # Son obligatorias solo cuando el sembrado está activo (ver validador).
    seed_demo_data: bool = True
    demo_email: str | None = None
    demo_password: str | None = None
    demo_name: str = "Equipo Demo"
    demo_org: str = "Star4cast Demo S.L."
    # Usuario administrador por defecto (rol "admin" en la org demo).
    admin_email: str | None = None
    admin_password: str | None = None
    admin_name: str = "Administrador"

    @model_validator(mode="after")
    def _require_seed_credentials(self) -> "Settings":
        """Si el sembrado está activo, las credenciales demo/admin son obligatorias."""
        if not self.seed_demo_data:
            return self
        missing = [
            name
            for name, value in (
                ("DEMO_EMAIL", self.demo_email),
                ("DEMO_PASSWORD", self.demo_password),
                ("ADMIN_EMAIL", self.admin_email),
                ("ADMIN_PASSWORD", self.admin_password),
            )
            if not value
        ]
        if missing:
            raise ValueError(
                "Faltan variables de entorno obligatorias para el sembrado "
                f"(SEED_DEMO_DATA=true): {', '.join(missing)}. "
                "Defínelas en el .env o desactiva SEED_DEMO_DATA."
            )
        return self

    # --- Forecast ---
    forecast_history_days: int = 30  # días de histórico que muestra el dashboard
    forecast_horizon_days: int = 30  # días a predecir
    forecast_service_level: float = 0.95  # nivel de servicio para el stock de seguridad
    # Tamaño máximo de fichero de importación (bytes). 25 MB por defecto.
    max_upload_bytes: int = 25 * 1024 * 1024

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
