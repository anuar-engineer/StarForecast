// Genera frontend/public/sitemap.xml a partir de las rutas estáticas del sitio,
// de las landings (landing-data.ts) y de los artículos (blog-data.ts), que son la
// única fuente de verdad. Node importa esos .ts directamente (type stripping).
// Se ejecuta automáticamente antes de cada build (`prebuild`).
//
// Vive dentro de frontend/ a propósito: así forma parte del contexto de build de
// Docker (context: ./frontend) y el sitemap se regenera también en producción,
// no solo en local.
//
// Solo se incluyen los posts ya publicados (date <= hoy). Los de fecha futura
// quedan fuera del sitemap hasta que les toca; el rebuild semanal de la VPS los
// va incorporando uno a uno, en paralelo a su prerender.
//
// Cada artículo declara su portada (extensión image del sitemap) para que Google
// la descubra; la genera generate-og-images.mjs y se muestra en el propio post.
//
// Uso manual: `npm run sitemap` desde frontend/.

import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FRONTEND = resolve(__dirname, '..');
const OUTPUT = resolve(FRONTEND, 'public/sitemap.xml');
const importTs = (path) => import(pathToFileURL(resolve(FRONTEND, path)).href);

const { publishedPosts, BLOG_POSTS } = await importTs('src/app/features/marketing/blog/blog-data.ts');
const { LANDING_PAGES } = await importTs('src/app/features/marketing/landing/landing-data.ts');

const SITE_URL = 'https://star4cast.es';

/** Rutas estáticas con su prioridad/frecuencia de cambio. */
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/features', changefreq: 'monthly', priority: '0.8' },
  { path: '/pricing', changefreq: 'monthly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'yearly', priority: '0.5' },
  { path: '/blog', changefreq: 'weekly', priority: '0.9' },
];

const LANDING_ROUTES = LANDING_PAGES.map((l) => ({
  path: `/${l.slug}`,
  changefreq: 'monthly',
  priority: '0.8',
}));

// Páginas legales (/privacy, /terms, /cookies): fuera del sitemap a propósito,
// llevan noindex (ver features/marketing/legal/legal.ts).

// Solo posts ya publicados (fecha <= hoy): los futuros aún no deben indexarse.
const posts = publishedPosts();
const blogRoutes = posts.map((p) => ({
  path: `/blog/${p.slug}`,
  changefreq: 'yearly',
  priority: '0.7',
  lastmod: p.updated ?? p.date,
  image: `blog/${p.slug}`,
  imageTitle: p.title,
}));

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function urlNode({ path, changefreq, priority, lastmod, image, imageTitle }) {
  const lines = [`    <loc>${SITE_URL}${path}</loc>`];
  if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
  lines.push(`    <changefreq>${changefreq}</changefreq>`);
  lines.push(`    <priority>${priority}</priority>`);
  if (image) {
    lines.push('    <image:image>');
    lines.push(`      <image:loc>${SITE_URL}/og/${image}-cover.webp</image:loc>`);
    if (imageTitle) lines.push(`      <image:title>${escapeXml(imageTitle)}</image:title>`);
    lines.push('    </image:image>');
  }
  return `  <url>\n${lines.join('\n')}\n  </url>`;
}

const all = [...STATIC_ROUTES, ...LANDING_ROUTES, ...blogRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${all.map(urlNode).join('\n')}
</urlset>
`;

writeFileSync(OUTPUT, xml, 'utf8');
const hidden = BLOG_POSTS.length - posts.length;
console.info(
  `[sitemap] ${all.length} URLs escritas en ${OUTPUT}` +
    (hidden > 0 ? ` (${hidden} posts futuros aún ocultos)` : ''),
);
