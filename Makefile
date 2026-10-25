# Star4cast — comandos de gestión (servidor Ubuntu / VPS)
#
# En el servidor de producción, en /opt/star4cast, basta con:
#   make prod      -> construye y levanta la app en segundo plano (puerto 8089)
#   make update    -> git pull + reconstruir + relanzar (actualizar una app ya desplegada)
#   make backup    -> copia de seguridad de la base de datos en backups/
#   make logs      -> ver logs en vivo
#
# Los scripts .ps1 de scripts/ son para trabajar en local en Windows; este
# Makefile es la vía oficial en el servidor Linux.

COMPOSE  ?= docker compose
PROD     := docker-compose.yml
DEV      := docker-compose.dev.yml
PORT     ?= 8089

.DEFAULT_GOAL := help

# ── Ayuda ────────────────────────────────────────────────────────────────
.PHONY: help
help:
	@echo "Star4cast — comandos disponibles:"
	@echo ""
	@echo "  PRODUCCIÓN (servidor):"
	@echo "    make prod      Construye y levanta la app en segundo plano (-d)"
	@echo "    make update    git pull + reconstruir + relanzar"
	@echo "    make publish   Publica el post del blog de la semana (para el cron)"
	@echo "    make backup    Copia de seguridad de la BD (backups/, rota a 14 días)"
	@echo "    make down      Para la app de producción"
	@echo "    make restart   Reinicia la app sin reconstruir"
	@echo "    make logs      Logs en vivo (Ctrl+C para salir)"
	@echo "    make ps        Estado de los contenedores"
	@echo "    make health    Comprueba /api/health en localhost:$(PORT)"
	@echo ""
	@echo "  DESARROLLO (local):"
	@echo "    make dev       Levanta el entorno con hot-reload (Ctrl+C para parar)"
	@echo "    make dev-down  Para el entorno de desarrollo"

# ── Producción ───────────────────────────────────────────────────────────
.PHONY: prod
prod: check-env
	@echo "-> Construyendo y levantando PRODUCCIÓN (db + backend + frontend)..."
	$(COMPOSE) -f $(PROD) up --build -d
	@echo "-> Esperando a que los contenedores arranquen..."
	@sleep 10
	@$(MAKE) --no-print-directory ps
	@$(MAKE) --no-print-directory health

.PHONY: update
update: check-env
	@echo "-> Copia de seguridad previa a la actualización..."
	@$(MAKE) --no-print-directory backup
	@echo "-> Actualizando desde git..."
	git pull --ff-only
	$(COMPOSE) -f $(PROD) up --build -d
	@sleep 5
	@$(MAKE) --no-print-directory health
	@echo "[OK] App actualizada. (Refresca el navegador con Ctrl+Shift+R)"

# Rebuild del frontend para que el date-gating del blog revele el post de la semana.
#   0 8 * * 5  cd /opt/star4cast && make publish >> /var/log/star4cast-publish.log 2>&1
.PHONY: publish
publish: check-env
	git pull --ff-only || echo "[aviso] git pull falló; sigo con el rebuild del contenido ya presente."
	./scripts/publish-weekly.sh

#   30 3 * * *  cd /opt/star4cast && make backup >> /var/log/star4cast-backup.log 2>&1
.PHONY: backup
backup:
	./scripts/backup-db.sh

.PHONY: down
down:
	$(COMPOSE) -f $(PROD) down

.PHONY: restart
restart:
	$(COMPOSE) -f $(PROD) restart
	@sleep 5
	@$(MAKE) --no-print-directory health

.PHONY: logs
logs:
	$(COMPOSE) -f $(PROD) logs -f --tail=100

.PHONY: ps
ps:
	$(COMPOSE) -f $(PROD) ps

.PHONY: health
health:
	@echo "-> Comprobando http://localhost:$(PORT)/api/health ..."
	@curl -fsS http://localhost:$(PORT)/api/health && echo "  [OK]" || \
		(echo "  [FALLO] La API no responde. Revisa: make logs" && exit 1)

# ── Desarrollo (local) ───────────────────────────────────────────────────
.PHONY: dev
dev:
	$(COMPOSE) -f $(DEV) up --build

.PHONY: dev-down
dev-down:
	$(COMPOSE) -f $(DEV) down

# ── Guarda de configuración ──────────────────────────────────────────────
# El compose ya falla sin estas variables, pero así el mensaje es claro.
.PHONY: check-env
check-env:
	@test -f .env || { echo "✗ Falta .env. Créalo:  cp .env.example .env  y rellénalo."; exit 1; }
	@for v in POSTGRES_PASSWORD JWT_SECRET ADMIN_EMAIL ADMIN_PASSWORD; do \
		grep -q "^$$v=.\+" .env || { echo "✗ .env no define $$v."; exit 1; }; \
	done
	@echo "[OK] Configuración (.env) presente."
