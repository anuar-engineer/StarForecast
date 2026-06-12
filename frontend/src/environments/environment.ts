/**
 * Configuración de producción.
 * El frontend siempre habla con la API mediante la ruta relativa `/api`,
 * que nginx (prod) o el dev-server proxy (dev) redirigen al backend Python.
 */
export const environment = {
  production: true,
  apiBaseUrl: '/api',
  /** Usa datos sintéticos en el cliente mientras el backend no esté listo. */
  useMockData: false,
};
