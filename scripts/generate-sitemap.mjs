// Genera frontend/public/sitemap.xml a partir de las rutas estáticas del sitio
// y de los artículos definidos en blog-data.ts (única fuente de verdad para los
// posts). Se ejecuta automáticamente antes de cada build (`prebuild`).
//
// Uso manual: `npm run sitemap` desde frontend/.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const BLOG_DATA = resolve(ROOT, 'frontend/src/app/features/marketing/blog/blog-data.ts');
const OUTPUT = resolve(ROOT, 'frontend/public/sitemap.xml');

const SITE_URL = 'https://star4cast.app';

/** Rutas estáticas con su prioridad/frecuencia de cambio. */
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/features', changefreq: 'monthly', priority: '0.8' },
  { path: '/pricing', changefreq: 'monthly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'yearly', priority: '0.5' },
  { path: '/blog', changefreq: 'weekly', priority: '0.9' },
];

const LEGAL_ROUTES = [
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
];

/**
 * Extrae { slug, date, updated } de cada post de blog-data.ts. Evita ejecutar
 * TypeScript: parsea los campos relevantes de cada objeto del array.
 */
function readBlogPosts() {
  const source = readFileSync(BLOG_DATA, 'utf8');
  const posts = [];
  // Captura cada bloque que empieza por `slug: '...'` hasta el siguiente slug o
  // el final, y de ahí saca date/updated.
  const slugRe = /slug:\s*'([^']+)'/g;
  let match;
  const slugs = [];
  while ((match = slugRe.exec(source)) !== null) {
    slugs.push({ slug: match[1], index: match.index });
  }
  for (let i = 0; i < slugs.length; i++) {
    const start = slugs[i].index;
    const end = i + 1 < slugs.length ? slugs[i + 1].index : source.length;
    const block = source.slice(start, end);
    const date = block.match(/\bdate:\s*'([^']+)'/);
    const updated = block.match(/\bupdated:\s*'([^']+)'/);
    posts.push({
      slug: slugs[i].slug,
      lastmod: (updated?.[1] ?? date?.[1]) || undefined,
    });
  }
  return posts;
}

function urlNode({ path, changefreq, priority, lastmod }) {
  const lines = [`    <loc>${SITE_URL}${path}</loc>`];
  if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
  lines.push(`    <changefreq>${changefreq}</changefreq>`);
  lines.push(`    <priority>${priority}</priority>`);
  return `  <url>\n${lines.join('\n')}\n  </url>`;
}

const posts = readBlogPosts();
const blogRoutes = posts.map((p) => ({
  path: `/blog/${p.slug}`,
  changefreq: 'yearly',
  priority: '0.7',
  lastmod: p.lastmod,
}));

const all = [...STATIC_ROUTES, ...blogRoutes, ...LEGAL_ROUTES];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(urlNode).join('\n')}
</urlset>
`;

writeFileSync(OUTPUT, xml, 'utf8');
console.info(`[sitemap] ${all.length} URLs escritas en ${OUTPUT}`);
