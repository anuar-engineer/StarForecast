# syntax=docker/dockerfile:1

# ---------- Etapa de build ----------
FROM node:24-alpine AS build
WORKDIR /app

# Instala dependencias con la lockfile para builds reproducibles.
COPY package.json package-lock.json ./
RUN npm ci

# Compila la aplicación en modo producción.
COPY . .
RUN npm run build -- --configuration production

# ---------- Etapa de runtime (nginx) ----------
FROM nginx:1.27-alpine AS runtime

# Configuración propia (SSG + proxy /api -> backend, límites y cabeceras de seguridad).
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/star4cast.conf
COPY nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
# Un error en la configuración rompe el build, no el sitio en producción.
RUN nginx -t

# Artefactos estáticos generados por Angular (carpeta browser del builder).
COPY --from=build /app/dist/star4cast/browser /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
