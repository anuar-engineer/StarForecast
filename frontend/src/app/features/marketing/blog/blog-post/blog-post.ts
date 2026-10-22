import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ogImage, SeoService, SITE_LOGO, SITE_NAME, SITE_URL } from '../../../../core/services/seo.service';
import { findPost, publishedPosts } from '../blog-data';
import { RichText } from '../rich-text';

@Component({
  selector: 'app-blog-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe, RichText],
  templateUrl: './blog-post.html',
})
export class BlogPost {
  private readonly seo = inject(SeoService);

  /** Slug recibido de la ruta /blog/:slug (component input binding). */
  readonly slug = input.required<string>();

  protected readonly post = computed(() => findPost(this.slug()));

  protected readonly related = computed(() => {
    const posts = publishedPosts();
    return posts
      .filter((p) => p.slug !== this.slug() && p.category === this.post()?.category)
      .concat(posts.filter((p) => p.slug !== this.slug()))
      .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
      .slice(0, 2);
  });

  /**
   * Artículo más reciente y más antiguo que el actual. Encadena todos los posts
   * con enlaces rastreables: la paginación del listado es solo de cliente y el
   * HTML prerenderizado de /blog únicamente enlaza la primera página.
   */
  protected readonly adjacent = computed(() => {
    const posts = publishedPosts();
    const i = posts.findIndex((p) => p.slug === this.slug());
    return i < 0 ? { newer: undefined, older: undefined } : { newer: posts[i - 1], older: posts[i + 1] };
  });

  constructor() {
    effect(() => {
      const p = this.post();
      if (!p) {
        this.seo.update({
          title: 'Artículo no encontrado',
          description: 'El artículo que buscas no existe o ha sido movido.',
          path: '/blog',
          noindex: true,
        });
        this.seo.removeJsonLd('article-schema');
        return;
      }

      const path = `/blog/${p.slug}`;
      this.seo.update({
        title: p.seoTitle ?? p.title,
        description: p.description,
        path,
        type: 'article',
        image: ogImage(`blog/${p.slug}`),
        publishedTime: p.date,
        modifiedTime: p.updated ?? p.date,
        author: p.author,
      });

      this.seo.setJsonLd('article-schema', [
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          dateModified: p.updated ?? p.date,
          // La firma es el equipo, no una persona: se declara como Organization.
          author: { '@type': 'Organization', name: p.author, url: SITE_URL },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
            logo: { '@type': 'ImageObject', url: SITE_LOGO },
          },
          image: [ogImage(`blog/${p.slug}`), `${SITE_URL}/og/blog/${p.slug}-cover.webp`],
          inLanguage: 'es',
          articleSection: p.category,
          url: SITE_URL + path,
          mainEntityOfPage: { '@type': 'WebPage', '@id': SITE_URL + path },
          keywords: p.keywords,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL + '/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: SITE_URL + '/blog' },
            { '@type': 'ListItem', position: 3, name: p.title, item: SITE_URL + path },
          ],
        },
      ]);
    });
  }
}
