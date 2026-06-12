import { RenderMode, ServerRoute } from '@angular/ssr';

import { BLOG_POSTS } from './features/marketing/blog/blog-data';

/**
 * Modo de renderizado por ruta para el prerender (SSG). Todo el sitio es público
 * y estático; los artículos del blog generan una página por slug.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => BLOG_POSTS.map((post) => ({ slug: post.slug })),
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
