import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SeoService, SITE_URL } from '../../../../core/services/seo.service';
import { Reveal } from '../../../../shared/directives/reveal';
import { BLOG_POSTS, blogCategories } from '../blog-data';

@Component({
  selector: 'app-blog-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe, Reveal],
  templateUrl: './blog-list.html',
})
export class BlogList {
  private readonly seo = inject(SeoService);

  protected readonly featured = BLOG_POSTS[0];
  protected readonly categories = ['Todos', ...blogCategories()];
  protected readonly activeCategory = signal('Todos');

  /** Artículos (sin el destacado) filtrados por la categoría activa. */
  protected readonly rest = computed(() => {
    const cat = this.activeCategory();
    return BLOG_POSTS.slice(1).filter((p) => cat === 'Todos' || p.category === cat);
  });

  constructor() {
    this.seo.update({
      title: 'Blog · Star4cast',
      description:
        'Guías prácticas sobre predicción de stock, forecasting de demanda y gestión de inventario para tomar mejores decisiones de compra.',
      path: '/blog',
      keywords: 'blog inventario, forecasting, predicción de stock, gestión de inventario',
    });

    this.seo.setJsonLd('blog-schema', {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Blog de Star4cast',
      url: `${SITE_URL}/blog`,
      blogPost: BLOG_POSTS.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        author: { '@type': 'Person', name: p.author },
        url: `${SITE_URL}/blog/${p.slug}`,
      })),
    });
  }

  protected setCategory(cat: string): void {
    this.activeCategory.set(cat);
  }
}
