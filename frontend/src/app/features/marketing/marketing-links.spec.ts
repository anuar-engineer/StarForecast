import { LANDING_SLUGS, routes } from '../../app.routes';
import { BLOG_POSTS } from './blog/blog-data';
import { parseInlineLinks } from './blog/rich-text';
import { LANDING_PAGES } from './landing/landing-data';

/** Anclas de la página de funcionalidades (ids de los bloques de features-page.ts). */
const FEATURE_ANCHORS = ['prevision', 'pedidos', 'explicacion', 'alertas', 'multialmacen', 'integraciones'];

/** Rutas públicas de primer nivel definidas en el router. */
const publicPaths = new Set(
  routes.flatMap((r) => r.children ?? []).map((r) => `/${r.path}`),
);

function assertInternalLink(path: string, fragment: string | undefined, where: string): void {
  const blogSlug = path.match(/^\/blog\/([^/]+)$/)?.[1];
  if (blogSlug) {
    expect(BLOG_POSTS.some((p) => p.slug === blogSlug), `${where}: artículo ${blogSlug}`).toBe(true);
  } else {
    expect(publicPaths.has(path), `${where}: ruta ${path}`).toBe(true);
  }
  if (path === '/features' && fragment) {
    expect(FEATURE_ANCHORS, `${where}: ancla #${fragment}`).toContain(fragment);
  }
}

describe('Enlaces internos del contenido de marketing', () => {
  it('cada landing tiene ruta y cada ruta de landing tiene contenido', () => {
    expect([...LANDING_SLUGS].sort()).toEqual(LANDING_PAGES.map((l) => l.slug).sort());
  });

  it('los enlaces de los artículos apuntan a páginas que existen', () => {
    const LINK_RE = /\[[^\]]+\]\((\/[^)\s#]*)(?:#([^)\s]+))?\)/g;
    for (const post of BLOG_POSTS) {
      for (const block of post.body) {
        const texts = 'items' in block ? block.items : [block.text];
        for (const text of texts) {
          for (const m of text.matchAll(LINK_RE)) {
            assertInternalLink(m[1], m[2], post.slug);
          }
        }
      }
    }
  });

  it('los enlaces y artículos relacionados de las landings existen', () => {
    for (const landing of LANDING_PAGES) {
      for (const card of landing.benefits) {
        if (card.link) assertInternalLink(card.link.path, card.link.fragment, landing.slug);
      }
      for (const slug of landing.relatedPosts) {
        expect(BLOG_POSTS.some((p) => p.slug === slug), `${landing.slug}: relacionado ${slug}`).toBe(true);
      }
    }
  });

  it('los títulos SEO no pasan de 60 caracteres', () => {
    for (const post of BLOG_POSTS) {
      expect((post.seoTitle ?? post.title).length, post.slug).toBeLessThanOrEqual(60);
    }
    for (const landing of LANDING_PAGES) {
      expect(landing.title.length, landing.slug).toBeLessThanOrEqual(60);
    }
  });

  it('las meta descriptions no pasan de 160 caracteres', () => {
    for (const item of [...BLOG_POSTS, ...LANDING_PAGES]) {
      expect(item.description.length, item.slug).toBeLessThanOrEqual(160);
    }
  });
});

describe('parseInlineLinks', () => {
  it('separa texto y enlaces internos con ancla', () => {
    expect(parseInlineLinks('Mira la [previsión](/features#prevision) ya.')).toEqual([
      { text: 'Mira la ' },
      { text: 'previsión', path: '/features', fragment: 'prevision' },
      { text: ' ya.' },
    ]);
  });

  it('deja como texto los enlaces a artículos que no existen o no se han publicado', () => {
    expect(parseInlineLinks('Lee [esto](/blog/no-existe).')).toEqual([
      { text: 'Lee ' },
      { text: 'esto' },
      { text: '.' },
    ]);
  });

  it('devuelve el texto tal cual si no hay enlaces', () => {
    expect(parseInlineLinks('Sin enlaces')).toEqual([{ text: 'Sin enlaces' }]);
  });
});
