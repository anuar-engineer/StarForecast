/**
 * Configuración de desarrollo.
 * Mantiene `useMockData: true` para poder trabajar el front sin backend.
 * Cambia a `false` cuando la API Python esté disponible (el proxy ya apunta a ella).
 */
export const environment = {
  production: false,
  apiBaseUrl: '/api',
  useMockData: true,
};
