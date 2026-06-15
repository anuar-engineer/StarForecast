# Star4cast — Backend (API)

API en **Python (FastAPI)** con **SQLAlchemy async** sobre **PostgreSQL**.
Gestiona la autenticación de la app interna y sirve el resumen del dashboard a
partir de datos reales en base de datos. Todo se ejecuta dockerizado.

## Stack

- **FastAPI** + **uvicorn**
- **SQLAlchemy 2.0** (async) + **asyncpg**
- **PostgreSQL 16**
- Auth con **JWT** (PyJWT) y hashing **bcrypt**
- Configuración por variables de entorno (`pydantic-settings`)

## Estructura

```
backend/
├── app/
│   ├── main.py            # FastAPI app; al arrancar crea tablas y siembra demo
│   ├── core/              # config (env) y security (bcrypt + JWT)
│   ├── db/                # base declarativa, motor y sesión async
│   ├── models/            # User, Product
│   ├── schemas/           # Pydantic: auth y dashboard
│   ├── api/               # deps (usuario actual) y rutas (auth, dashboard)
│   └── seed.py            # usuario demo + catálogo de productos de ejemplo
├── Dockerfile             # producción (uvicorn)
├── Dockerfile.dev         # desarrollo (uvicorn --reload, código por volumen)
└── requirements.txt
```

## Endpoints

| Método | Ruta                       | Auth | Devuelve                          |
| ------ | -------------------------- | ---- | --------------------------------- |
| GET    | `/api/health`              | —    | `{ "status": "ok" }`              |
| POST   | `/api/auth/register`       | —    | `Token` (access_token + user)     |
| POST   | `/api/auth/login`          | —    | `Token` (access_token + user)     |
| GET    | `/api/auth/me`             | JWT  | `UserRead`                        |
| GET    | `/api/dashboard/summary`   | JWT  | KPIs, alertas, serie y categorías |

La API se sirve bajo `/api` (el proxy del dev-server y nginx ya enrutan ahí).
Autenticación: `Authorization: Bearer <access_token>`.

## Datos sembrados (demo)

Al arrancar con la base vacía (y con `SEED_DEMO_DATA=true`) se crea:

- Usuario demo y administrador, con las credenciales definidas en el `.env`
  (`DEMO_EMAIL` / `DEMO_PASSWORD` y `ADMIN_EMAIL` / `ADMIN_PASSWORD`).
  No hay credenciales por defecto en el código: son obligatorias si el
  sembrado está activo.
- 12 productos de ejemplo con stock, venta media diaria y coste, que alimentan
  los KPIs, las alertas de rotura (cobertura < 14 días) y la serie del gráfico.

Es idempotente: si el usuario demo ya existe, no vuelve a sembrar.

## Configuración (variables de entorno)

Ver `.env.example`. Las más relevantes:

- `DATABASE_URL` — cadena async, p. ej. `postgresql+asyncpg://user:pass@db:5432/star4cast`
- `JWT_SECRET` — **cámbialo en producción**
- `JWT_EXPIRE_MINUTES`, `CORS_ORIGINS`, `SEED_DEMO_DATA`, `DEMO_EMAIL`, `DEMO_PASSWORD`

## Ejecución

Desde la raíz del repo, con Docker Compose (levanta backend + PostgreSQL):

```powershell
./scripts/dev.ps1 -Build      # primera vez
./scripts/dev.ps1             # arranques posteriores
```

La API queda en `http://localhost:8000` (docs interactivas en `/docs`).

> El esquema se crea con `Base.metadata.create_all` al arrancar (suficiente para
> este estadio). Cuando el modelo se estabilice, migrar a **Alembic**.
> El cálculo de cobertura/forecast del dashboard es una proyección lineal
> provisional hasta que exista el modelo de series temporales.
