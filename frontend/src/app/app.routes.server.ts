import { RenderMode, ServerRoute } from '@angular/ssr';

import { publishedPosts } from './features/marketing/blog/blog-data';

/**
 * Modo de renderizado por ruta para el prerender (SSG). Todo el sitio es público
 * y estático; los artículos del blog generan una página por slug. Solo se
 * prerenderizan los posts ya publicados (fecha <= hoy en el momento del build):
 * los de fecha futura se destapan en el siguiente rebuild semanal de la VPS.
 */
export const serverRoutes: ServerRoute[] = [
  // La zona autenticada depende de la sesión del navegador: no se prerenderiza,
  // se sirve como shell de cliente (CSR) y se hidrata con los datos del usuario.
  { path: 'login', renderMode: RenderMode.Client },
  { path: 'app', renderMode: RenderMode.Client },
  { path: 'app/**', renderMode: RenderMode.Client },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => publishedPosts().map((post) => ({ slug: post.slug })),
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
