/**
 * Proxy del dev-server de Angular.
 *
 * Todas las llamadas a `/api/*` se redirigen al backend Python. El destino se
 * toma de la variable de entorno BACKEND_URL (la define docker-compose.dev.yml
 * como http://backend:8000); si no existe, cae a localhost para el desarrollo
 * sin Docker.
 */
const target = process.env.BACKEND_URL || 'http://localhost:8000';

module.exports = {
  '/api': {
    target,
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
};
