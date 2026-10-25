#!/usr/bin/env bash
#
# backup-db.sh — copia de seguridad de la base de datos de producción.
#
# Hace un pg_dump comprimido del contenedor star4cast-db en <repo>/backups/ y
# borra las copias con más de RETENTION_DAYS días. Las copias quedan en la
# propia VPS: conviene sacarlas también fuera (rsync/rclone a otro servidor o
# almacenamiento) para cubrir la pérdida del servidor entero.
#
# Restaurar una copia:
#   gunzip -c backups/star4cast-AAAAMMDD-HHMMSS.sql.gz \
#     | docker exec -i star4cast-db psql -U star4cast -d star4cast
#
# Uso:   ./scripts/backup-db.sh
# Cron:  30 3 * * *  cd /opt/star4cast && make backup >> /var/log/star4cast-backup.log 2>&1

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR="${REPO_ROOT}/backups"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
CONTAINER="star4cast-db"
FILE="${BACKUP_DIR}/star4cast-$(date +%Y%m%d-%H%M%S).sql.gz"

log() { printf '[backup-db] %s\n' "$*"; }

mkdir -p "${BACKUP_DIR}"
chmod 700 "${BACKUP_DIR}"

log "Volcando la base de datos en ${FILE}..."
# Se escribe a un .tmp y se renombra al final: un volcado a medias nunca
# parece una copia válida.
docker exec "${CONTAINER}" pg_dump -U star4cast -d star4cast --no-owner \
  | gzip > "${FILE}.tmp"
mv "${FILE}.tmp" "${FILE}"
chmod 600 "${FILE}"

log "Borrando copias con más de ${RETENTION_DAYS} días..."
find "${BACKUP_DIR}" -name 'star4cast-*.sql.gz' -mtime "+${RETENTION_DAYS}" -delete

log "Hecho ($(du -h "${FILE}" | cut -f1))."
