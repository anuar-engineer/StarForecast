# Star4cast

Plataforma de **predicción (forecast) de stock**: a partir del histórico de
inventario de una tienda o empresa, estima el nivel de stock futuro, detecta
riesgos de rotura y ayuda a planificar la reposición.

- **Sitio público (marketing):** Angular 21 (standalone, signals, zoneless) +
  Tailwind CSS, prerenderizado de forma estática (SSG) para SEO.
- **Backend:** API Python de modelos de forecast — _pendiente_ (ver `backend/`).
- **App interna (panel del cliente):** _pendiente_, se construirá sobre el mismo
  frontend cuando exista el backend.
- **Orquestación:** Docker + Docker Compose, con scripts PowerShell para dev y prod.

> Estado actual: el **sitio público** está montado y funcional (home,
> funcionalidades, precios, blog, sobre nosotros, contacto y páginas legales).
> El backend y la app interna autenticada aún no existen.

## Estructura

```
star4cast/
├── frontend/                 # Aplicación Angular (sitio público)
│   ├── src/app/
│   │   ├── core/services/    # SeoService (meta, Open Graph, JSON-LD)
│   │   ├── shared/directives/# Reveal (animación on-scroll, progressive enhancement)
│   │   ├── layout/           # PublicLayout: navbar + footer
│   │   └── features/marketing/  # home, features, pricing, about, blog, contact, legal
│   ├── public/               # favicon, og-image, robots.txt, sitemap.xml (generado)
│   ├── Dockerfile            # Build de producción (multi-stage -> nginx)
│   ├── Dockerfile.dev        # Imagen de desarrollo (ng serve)
│   ├── nginx.conf            # SPA fallback + proxy /api -> backend
│   └── proxy.conf.js         # Proxy del dev-server hacia el backend
├── backend/                  # API Python (pendiente)
├── scripts/
│   ├── dev.ps1               # Levanta el entorno de desarrollo
│   ├── prod.ps1              # Levanta el entorno de producción
│   └── generate-sitemap.mjs  # Genera public/sitemap.xml desde BLOG_POSTS
├── docker-compose.dev.yml    # Stack de desarrollo (hot-reload)
└── docker-compose.yml        # Stack de producción
```

## Requisitos

- Docker Desktop (con Docker Compose v2)
- Para desarrollo sin Docker: Node.js 24+ y npm 11+

## Arranque rápido

### Desarrollo (hot-reload) — http://localhost:4200

```powershell
./scripts/dev.ps1 -Build      # primera vez o tras cambiar dependencias
./scripts/dev.ps1             # arranques posteriores
./scripts/dev.ps1 -Down       # parar
```

### Producción — http://localhost:8080

```powershell
./scripts/prod.ps1 -Build     # compila y levanta en segundo plano
./scripts/prod.ps1 -Down      # parar
```

### Sin Docker (solo frontend)

```powershell
cd frontend
npm install
npm start                     # http://localhost:4200
```

## Arquitectura del frontend

- **SEO y SSG:** todo el sitio se prerenderiza de forma estática
  (`outputMode: static`), con una página por artículo de blog. `SeoService`
  centraliza título, meta description, canónica, Open Graph, Twitter Cards y
  datos estructurados JSON-LD.
- **Estilos:** Tailwind CSS v4 (`src/tailwind.css`), con paleta de marca
  índigo → esmeralda. `src/styles.scss` solo aporta las animaciones sutiles
  (reveal on-scroll y View Transitions), respetando `prefers-reduced-motion`.
- **Estado:** signals + `computed`; componentes `OnPush` y standalone.
- **Sitemap:** `public/sitemap.xml` se genera automáticamente antes de cada
  build (`prebuild`) a partir de los artículos en
  `frontend/src/app/features/marketing/blog/blog-data.ts`.
- **Comunicación con la API (futura):** el front llamará a rutas relativas
  `/api/*`. En desarrollo las redirige el proxy del dev-server; en producción,
  nginx. Así la misma build sirve para cualquier entorno.

## Roadmap

- [x] Sitio público (home, funcionalidades, precios, blog, contacto, legales) con SEO/SSG
- [ ] Backend Python: ingesta de histórico y API de forecast
- [ ] App interna autenticada (panel del cliente) sobre el backend real
- [ ] Carga de históricos (CSV / integración con el sistema de inventario)
- [ ] Multi-tenant (varias tiendas/empresas)
