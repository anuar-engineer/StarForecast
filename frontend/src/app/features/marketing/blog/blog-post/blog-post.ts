import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SeoService, SITE_NAME, SITE_URL } from '../../../../core/services/seo.service';
import { findPost, publishedPosts } from '../blog-data';

@Component({
  selector: 'app-blog-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe],
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

  constructor() {
    effect(() => {
      const p = this.post();
      if (!p) {
        this.seo.update({
          title: 'Artículo no encontrado',
          description: 'El artículo que buscas no existe o ha sido movido.',
          path: '/blog',
        });
        this.seo.removeJsonLd('article-schema');
        return;
      }

      const path = `/blog/${p.slug}`;
      this.seo.update({
        title: p.title,
        description: p.description,
        path,
        type: 'article',
        keywords: p.keywords,
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
          author: { '@type': 'Person', name: p.author },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.png` },
          },
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
