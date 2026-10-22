# Star4cast

Plataforma de **predicción (forecast) de stock**: a partir del histórico de
inventario de una tienda o empresa, estima el nivel de stock futuro, detecta
riesgos de rotura y ayuda a planificar la reposición.

- **Sitio público (marketing):** Angular 21 (standalone, signals, zoneless) +
  Tailwind CSS, prerenderizado de forma estática (SSG) para SEO.
- **Backend:** API Python (FastAPI + SQLAlchemy async + PostgreSQL) con auth JWT
  y un resumen de dashboard sobre datos reales (ver `backend/`).
- **App interna (panel del cliente):** zona autenticada en `/app` (login + shell
  con sidebar/topbar + dashboard), construida sobre el mismo frontend.
- **Orquestación:** Docker + Docker Compose, con scripts PowerShell para dev y prod.

> Estado actual: el **sitio público** está montado y funcional (home,
> funcionalidades, precios, blog, sobre nosotros, contacto y páginas legales).
> Además existe ya el **backend** (auth JWT + dashboard) y la **app interna**
> con login y dashboard. Las credenciales demo se definen en el `.env`
> (`DEMO_EMAIL`/`DEMO_PASSWORD`); no hay valores por defecto en el código.

## Estructura

```
star4cast/
├── frontend/                 # Aplicación Angular (sitio público)
│   ├── src/app/
│   │   ├── core/services/    # SeoService (meta, Open Graph, JSON-LD)
│   │   ├── shared/directives/# Reveal (animación on-scroll, progressive enhancement)
│   │   ├── layout/           # PublicLayout: navbar + footer
│   │   └── features/marketing/  # home, features, pricing, about, blog, landing, contact, legal
│   ├── public/               # favicon, robots.txt, clave IndexNow; sitemap.xml y og/ (generados)
│   ├── scripts/              # prebuild: generate-sitemap.mjs y generate-og-images.mjs
│   ├── Dockerfile            # Build de producción (multi-stage -> nginx)
│   ├── Dockerfile.dev        # Imagen de desarrollo (ng serve)
│   ├── nginx.conf            # SPA fallback + proxy /api -> backend
│   └── proxy.conf.js         # Proxy del dev-server hacia el backend
├── backend/                  # API Python (pendiente)
├── scripts/
│   ├── dev.ps1               # Levanta el entorno de desarrollo
│   ├── prod.ps1              # Levanta el entorno de producción
│   └── publish-weekly.sh     # Cron en la VPS: rebuild semanal que destapa el siguiente post
├── docker-compose.dev.yml    # Stack de desarrollo (hot-reload)
└── docker-compose.yml        # Stack de producción
```

## Requisitos

- Docker Desktop (con Docker Compose v2)
- Para desarrollo sin Docker: Node.js 24+ y npm 11+

## Arranque rápido

### Desarrollo (hot-reload) — http://localhost:4300

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
- **Estilos:** Tailwind CSS v4 (`src/tailwind.css`), con fondo noche y acento
  esmeralda. `src/styles.scss` solo aporta las animaciones sutiles
  (reveal on-scroll y View Transitions), respetando `prefers-reduced-motion`.
- **Estado:** signals + `computed`; componentes `OnPush` y standalone.
- **Sitemap:** `public/sitemap.xml` se genera automáticamente antes de cada
  build (`prebuild`, `frontend/scripts/generate-sitemap.mjs`) a partir de los
  artículos (`blog-data.ts`) y las landings (`landing-data.ts`). Solo incluye
  los posts ya publicados (ver más abajo) y declara la portada de cada uno.
- **Imágenes:** `frontend/scripts/generate-og-images.mjs` (satori + resvg +
  sharp) genera en `public/og/` la imagen para compartir (`.jpg`, con título) y
  la portada (`-cover.webp` / `-thumb.webp`) de cada artículo, landing y página
  principal, con el diseño del sitio. Corre en `prebuild` y `prestart`, cachea
  por contenido y no se versiona (`.gitignore`).

## SEO

- **Landings comerciales:** una página por búsqueda con intención de compra
  (`/software-de-prevision-de-demanda`, `/software-de-reposicion-de-stock`,
  `/alternativa-a-excel-para-prevision-de-demanda`,
  `/prevision-de-stock-para-ecommerce`). El contenido vive en
  `features/marketing/landing/landing-data.ts`; para añadir una, añade el objeto
  y su slug a `LANDING_SLUGS` en `app.routes.ts` (un test comprueba que
  coinciden) y, si procede, al footer.
- **Títulos:** ≤ 60 caracteres; `SeoService` solo añade "· Star4cast" si cabe.
  Las rutas públicas no llevan `title` en el router: lo fija cada página.
- **Descriptions:** ≤ 160 caracteres (lo comprueba `marketing-links.spec.ts`).
- **Enlazado interno:** cada artículo enlaza a una página de producto y a otros
  artículos, y todos se encadenan con anterior/siguiente (la paginación de
  `/blog` es solo de cliente). Los tests fallan si un enlace apunta a una ruta,
  artículo o ancla que no existe.
- **404 reales:** nginx responde 404 a cualquier URL sin HTML prerenderizado.

### Puesta en marcha en buscadores (una vez, al publicar el dominio)

1. **Google Search Console** → Añadir propiedad → *Dominio* `star4cast.es` →
   crear el registro TXT que indica en el DNS del dominio y verificar.
2. Search Console → *Sitemaps* → enviar `https://star4cast.es/sitemap.xml`.
3. *Inspección de URLs* → solicitar indexación de `/`, `/features`, `/pricing`
   y las 4 landings (el resto lo descubre por el sitemap y los enlaces).
4. **Bing Webmaster Tools** → *Importar desde Google Search Console* (un clic).
   Bing ya recibe los artículos nuevos por IndexNow desde `publish-weekly.sh`.
5. Comprobar en el [Rich Results Test](https://search.google.com/test/rich-results)
   una landing (FAQ) y un artículo (Article + Breadcrumb).
6. Revisar a las 2-4 semanas: *Páginas* (indexadas vs. excluidas) y
   *Rendimiento* (consultas por las que ya aparece cada landing).
- **Comunicación con la API (futura):** el front llamará a rutas relativas
  `/api/*`. En desarrollo las redirige el proxy del dev-server; en producción,
  nginx. Así la misma build sirve para cualquier entorno.

## Blog y publicación programada

El blog es estático y se alimenta de un único archivo, sin base de datos ni CMS:
`frontend/src/app/features/marketing/blog/blog-data.ts` (constante `BLOG_POSTS`).
De ahí salen el listado, la página de cada artículo, el JSON-LD y el sitemap.

### Publicación por fecha (drip semanal)

Cada post tiene un campo `date` (`YYYY-MM-DD`) que actúa como **fecha de
publicación**:

- Un artículo **solo es visible si `date <= hoy`**. Los posts con fecha futura
  ya viven en el repo, pero quedan ocultos: no aparecen en el listado, no se
  prerenderizan y no entran en el sitemap. Si alguien entra a su URL a mano, ve
  "Artículo no encontrado".
- La lógica está en `blog-data.ts`: `isPublished()`, `publishedPosts()` y
  `findPost()` aplican el filtro. El listado, el detalle, el prerender
  (`app.routes.server.ts`) y el generador de sitemap usan esas funciones.

La idea: tener una cola de posts fechados (uno por semana) y dejar que el sitio
los vaya destapando solo. **No hace falta editar nada cada semana**, solo
reconstruir el frontend: el `date` de cada post hace de interruptor.

> Estado: hay una tanda de posts programados un viernes por semana. Para ver
> qué hay publicado u oculto en un momento dado:
> `cd frontend && node scripts/generate-sitemap.mjs` (informa de cuántos posts
> futuros siguen ocultos).

### Añadir un post nuevo

1. Añade un objeto a `BLOG_POSTS` en `blog-data.ts` (copia uno existente como
   plantilla). Campos clave: `slug` (único, va en la URL), `title`, `seoTitle`
   (solo si `title` pasa de 60 caracteres), `excerpt`, `description` (meta SEO,
   ≤ 160 caracteres), `keywords`, `category`, `tags`, `date` y `body` (bloques
   `p`, `h2`, `ul`, `ol`, `quote`).
   - Enlaces internos en el texto: `[texto](/ruta#ancla)`. Un enlace a un
     artículo aún no publicado se muestra como texto hasta su fecha.
   - Incluye al menos un enlace a producto (landing o `/features#…`) y uno o
     dos a artículos relacionados. Antes de escribir sobre un tema, comprueba
     que no hay ya un artículo que apunte a la misma palabra clave.
   - La portada y la imagen para compartir se generan solas en el build.
2. Pon la `date` en el futuro para programarlo, o en hoy/pasado para publicarlo ya.
3. El orden dentro del array es indiferente: se ordena por fecha automáticamente.

### Publicar en la VPS cada semana (cron)

El script `scripts/publish-weekly.sh` reconstruye **solo** el frontend; en ese
build, el prerender y el sitemap recalculan qué posts están publicados según la
fecha del día. Es idempotente: ejecutarlo de más no rompe nada.

```bash
# En la VPS, una sola vez:
chmod +x scripts/publish-weekly.sh

# Probarlo a mano:
./scripts/publish-weekly.sh

# Programarlo: cada viernes a las 08:00 (día en el que están fechados los posts)
crontab -e
0 8 * * 5  /ruta/al/repo/scripts/publish-weekly.sh >> /var/log/star4cast-publish.log 2>&1
```

Qué hace el script por dentro:

1. *(Opcional)* `git pull --ff-only` para traer cambios del repo. Está
   **comentado** por defecto; descoméntalo si despliegas vía `git pull`.
2. `docker compose build frontend` → ejecuta `prebuild` (sitemap e imágenes) +
   `ng build` (prerender) con la fecha de hoy.
3. `docker compose up -d frontend` → recrea el contenedor del frontend sin tocar
   `backend` ni `db`.
4. `docker image prune -f` → limpia imágenes huérfanas para no acumular capas.
5. Avisa por IndexNow (Bing, Yandex…) de los artículos publicados en los
   últimos 7 días. Si falla, no interrumpe el despliegue.

> Nota: el contexto de build de Docker del frontend es `./frontend`, por eso el
> generador de sitemap vive en `frontend/scripts/` (y no en `scripts/`): así
> forma parte del build y el sitemap también se regenera en producción.

## Roadmap

- [x] Sitio público (home, funcionalidades, precios, blog, contacto, legales) con SEO/SSG
- [x] Backend Python (FastAPI + SQLAlchemy + PostgreSQL): auth JWT y resumen de dashboard
- [x] App interna autenticada: login + shell (sidebar/topbar) + dashboard
- [ ] Productos: listado + ficha con forecast por producto
- [ ] Backend de forecast real (series temporales) e ingesta de histórico (CSV)
- [ ] Multi-tenant (varias tiendas/empresas)
