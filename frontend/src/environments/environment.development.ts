/**
 * Configuración de desarrollo.
 * El backend FastAPI ya existe (el proxy del dev-server redirige `/api`), así
 * que el front habla con la API real.
 */
export const environment = {
  production: false,
  apiBaseUrl: '/api',
  useMockData: false,
};
