#!/usr/bin/env bash
#
# publish-weekly.sh — "publica" el siguiente post programado en la VPS.
#
# Cómo funciona el mecanismo de publicación programada:
#   - Los posts viven ya en el repo (frontend/.../blog-data.ts) con fechas
#     futuras escalonadas (un viernes por semana).
#   - El sitio es estático: el listado, las páginas de cada post y el sitemap
#     solo incluyen los artículos con fecha <= hoy (ver publishedPosts()).
#   - Por tanto NO hay que editar nada cada semana: basta con reconstruir el
#     frontend. En el build, el prerender y el sitemap "destapan" los posts que
#     ya han alcanzado su fecha. Este script es justamente ese rebuild.
#
# Idempotente: si se ejecuta dos veces el mismo día no pasa nada; simplemente
# vuelve a construir con el mismo conjunto de posts publicados.
#
# Uso:   ./scripts/publish-weekly.sh
# Cron:  ver instrucciones al final de este archivo.

set -euo pipefail

# Raíz del repositorio (este script vive en <repo>/scripts/).
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="${REPO_ROOT}/docker-compose.yml"

log() { printf '[publish-weekly] %s\n' "$*"; }

cd "${REPO_ROOT}"

# 1) (Opcional) Traer los últimos cambios del repo. Si despliegas vía git pull,
#    descomenta. Si subes el código de otra forma, déjalo comentado.
# log "Actualizando repositorio..."
# git pull --ff-only

# 2) Reconstruir SOLO el frontend. El build ejecuta prebuild (sitemap) + prerender,
#    que recalculan qué posts están publicados según la fecha de hoy.
log "Reconstruyendo imagen del frontend ($(date +%Y-%m-%d))..."
docker compose -f "${COMPOSE_FILE}" build frontend

# 3) Recrear el contenedor del frontend con la nueva imagen, sin tocar backend/db.
log "Recreando contenedor del frontend..."
docker compose -f "${COMPOSE_FILE}" up -d frontend

# 4) Limpiar imágenes huérfanas para no acumular capas viejas semana a semana.
log "Limpiando imágenes sin usar..."
docker image prune -f >/dev/null 2>&1 || true

# 5) Avisar por IndexNow (Bing, Yandex, Seznam...) de los artículos publicados en
#    los últimos 7 días. Google no usa IndexNow: descubre las URLs nuevas por el
#    sitemap enviado en Search Console. La clave es pública por diseño y se sirve
#    en https://star4cast.es/<clave>.txt (frontend/public/<clave>.txt).
INDEXNOW_KEY="d6cba34e6a797f385c845b4825404c34"
SITE_URL="https://star4cast.es"
SINCE="$(date -d '7 days ago' +%Y-%m-%d)"
NEW_URLS="$(
  curl -fsS "${SITE_URL}/sitemap.xml" 2>/dev/null \
    | awk -v since="${SINCE}" '
        /<loc>/     { gsub(/.*<loc>|<\/loc>.*/, ""); loc = $0 }
        /<lastmod>/ { gsub(/.*<lastmod>|<\/lastmod>.*/, ""); if ($0 >= since) print loc }'
)" || true
if [[ -n "${NEW_URLS}" ]]; then
  URL_LIST="$(printf '%s\n' "${SITE_URL}/blog" ${NEW_URLS} | sed 's/.*/"&"/' | paste -sd, -)"
  log "IndexNow: avisando de $(wc -w <<<"${NEW_URLS}") URL(s) nueva(s)..."
  curl -fsS -X POST "https://api.indexnow.org/indexnow" \
    -H 'Content-Type: application/json; charset=utf-8' \
    -d "{\"host\":\"star4cast.es\",\"key\":\"${INDEXNOW_KEY}\",\"urlList\":[${URL_LIST}]}" >/dev/null \
    || log "IndexNow no respondió (no es crítico)."
else
  log "IndexNow: no hay artículos nuevos esta semana."
fi

log "Hecho. El sitio sirve ahora los posts con fecha <= hoy."

# --------------------------------------------------------------------------
# Programar en la VPS (cron). Publicar cada viernes a las 08:00, que es el día
# en el que están fechados los posts:
#
#   crontab -e
#   0 8 * * 5  /ruta/al/repo/scripts/publish-weekly.sh >> /var/log/star4cast-publish.log 2>&1
#
# Recuerda dar permisos de ejecución una vez:  chmod +x scripts/publish-weekly.sh
# --------------------------------------------------------------------------
