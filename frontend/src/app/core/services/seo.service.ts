import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';

/** Dominio canónico del sitio. Ajusta aquí si cambia el dominio de producción. */
export const SITE_URL = 'https://star4cast.app';
export const SITE_NAME = 'Star4cast';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;
const DEFAULT_DESCRIPTION =
  'Star4cast predice el stock futuro de cada producto a partir de tu histórico de inventario. Evita roturas, reduce el exceso y compra justo lo necesario.';

export interface SeoData {
  /** Título de la página (sin el sufijo de marca; se añade automáticamente). */
  readonly title: string;
  readonly description?: string;
  /** Ruta relativa, p. ej. '/blog/mi-articulo'. Construye la URL canónica. */
  readonly path?: string;
  readonly image?: string;
  readonly type?: 'website' | 'article';
  readonly keywords?: string;
  readonly publishedTime?: string;
  readonly modifiedTime?: string;
  readonly author?: string;
}

/**
 * Centraliza el SEO on-page: título, meta description, canónica, Open Graph,
 * Twitter Cards y datos estructurados JSON-LD. Llamar a `update()` desde cada
 * página pública en su inicialización.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  constructor() {
    // Al cambiar de página, retira los datos estructurados de la página anterior
    // para que no queden bloques JSON-LD huérfanos en el <head>.
    inject(Router).events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.doc.head
          .querySelectorAll('script[type="application/ld+json"][data-seo]')
          .forEach((el) => el.remove());
      }
    });
  }

  update(data: SeoData): void {
    const description = data.description ?? DEFAULT_DESCRIPTION;
    const url = SITE_URL + (data.path ?? '');
    const image = data.image ?? DEFAULT_IMAGE;
    const type = data.type ?? 'website';
    const fullTitle = data.title.includes(SITE_NAME)
      ? data.title
      : `${data.title} · ${SITE_NAME}`;

    this.title.setTitle(fullTitle);
    this.name('description', description);
    this.name('keywords', data.keywords);

    // Open Graph
    this.prop('og:title', fullTitle);
    this.prop('og:description', description);
    this.prop('og:type', type);
    this.prop('og:url', url);
    this.prop('og:image', image);
    this.prop('og:site_name', SITE_NAME);
    this.prop('og:locale', 'es_ES');

    // Twitter Cards
    this.name('twitter:card', 'summary_large_image');
    this.name('twitter:title', fullTitle);
    this.name('twitter:description', description);
    this.name('twitter:image', image);

    // Metadatos específicos de artículo
    if (type === 'article') {
      this.prop('article:published_time', data.publishedTime);
      this.prop('article:modified_time', data.modifiedTime ?? data.publishedTime);
      this.prop('article:author', data.author);
    } else {
      this.remove("property='article:published_time'");
      this.remove("property='article:modified_time'");
      this.remove("property='article:author'");
    }

    this.setCanonical(url);
  }

  /** Inserta (o reemplaza) un bloque de datos estructurados JSON-LD. */
  setJsonLd(id: string, schema: Record<string, unknown> | Record<string, unknown>[]): void {
    const selector = `script[type="application/ld+json"]#${id}`;
    let script = this.doc.head.querySelector<HTMLScriptElement>(selector);
    if (!script) {
      script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.setAttribute('data-seo', '');
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }

  /** Elimina un bloque JSON-LD previamente insertado. */
  removeJsonLd(id: string): void {
    this.doc.head.querySelector(`script[type="application/ld+json"]#${id}`)?.remove();
  }

  private name(name: string, content: string | undefined): void {
    if (content) {
      this.meta.updateTag({ name, content });
    } else {
      this.meta.removeTag(`name='${name}'`);
    }
  }

  private prop(property: string, content: string | undefined): void {
    if (content) {
      this.meta.updateTag({ property, content });
    } else {
      this.meta.removeTag(`property='${property}'`);
    }
  }

  private remove(selector: string): void {
    this.meta.removeTag(selector);
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
