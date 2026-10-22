import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ogImage, SeoService, SITE_URL } from '../../../core/services/seo.service';
import { Reveal } from '../../../shared/directives/reveal';
import { findPost } from '../blog/blog-data';
import { findLanding, type LandingPage } from './landing-data';

/** Landing comercial genérica; el contenido sale de `landing-data.ts`. */
@Component({
  selector: 'app-landing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Reveal],
  templateUrl: './landing.html',
})
export class Landing {
  private readonly seo = inject(SeoService);

  /** Slug de la landing; viene de la `data` de la ruta. */
  readonly slug = input.required<string>();

  protected readonly page = computed<LandingPage>(() => {
    const page = findLanding(this.slug());
    if (!page) throw new Error(`Landing desconocida: ${this.slug()}`);
    return page;
  });

  /** Artículos relacionados ya publicados (los futuros darían 404). */
  protected readonly related = computed(() =>
    this.page()
      .relatedPosts.map((slug) => findPost(slug))
      .filter((p) => p !== undefined)
      .slice(0, 3),
  );

  protected readonly steps = [
    { n: '01', title: 'Sube tus datos', text: 'Un CSV o Excel con tus ventas o tu stock. Star4cast detecta las columnas automáticamente.' },
    { n: '02', title: 'Indica tus proveedores', text: 'Plazo de entrega, pedido mínimo y múltiplo de caja. El modelo de cada producto se elige solo.' },
    { n: '03', title: 'Pide lo justo', text: 'Recibe alertas de rotura y pedidos de compra sugeridos, con el porqué de cada cifra.' },
  ];

  constructor() {
    effect(() => {
      const p = this.page();
      const path = `/${p.slug}`;
      this.seo.update({
        title: p.title,
        description: p.description,
        path,
        image: ogImage(p.slug),
      });

      this.seo.setJsonLd('landing-schema', [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: p.title,
          description: p.description,
          url: SITE_URL + path,
          inLanguage: 'es',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@type': 'SoftwareApplication', name: 'Star4cast', applicationCategory: 'BusinessApplication' },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: p.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL + '/' },
            { '@type': 'ListItem', position: 2, name: p.name, item: SITE_URL + path },
          ],
        },
      ]);
    });
  }
}
