import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { SeoService, SITE_NAME, SITE_URL } from './seo.service';

describe('SeoService', () => {
  let seo: SeoService;
  let doc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    seo = TestBed.inject(SeoService);
    doc = TestBed.inject(DOCUMENT);
  });

  afterEach(() => {
    // Limpia el <head> para no contaminar el resto de tests.
    doc.head
      .querySelectorAll('script[type="application/ld+json"], link[rel="canonical"]')
      .forEach((el) => el.remove());
  });

  it('añade el sufijo de marca al título', () => {
    seo.update({ title: 'Precios', path: '/pricing' });
    expect(TestBed.inject(Title).getTitle()).toBe(`Precios · ${SITE_NAME}`);
  });

  it('no duplica la marca si el título ya la contiene', () => {
    seo.update({ title: `${SITE_NAME} · Inicio` });
    expect(TestBed.inject(Title).getTitle()).toBe(`${SITE_NAME} · Inicio`);
  });

  it('construye la URL canónica a partir del path', () => {
    seo.update({ title: 'Precios', path: '/pricing' });
    const link = doc.head.querySelector('link[rel="canonical"]');
    expect(link?.getAttribute('href')).toBe(`${SITE_URL}/pricing`);
  });

  it('reutiliza el mismo <link rel="canonical"> en navegaciones sucesivas', () => {
    seo.update({ title: 'Inicio', path: '/' });
    seo.update({ title: 'Precios', path: '/pricing' });
    expect(doc.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
  });

  it('fija og:title, og:url y twitter:card', () => {
    seo.update({ title: 'Precios', path: '/pricing' });
    expect(doc.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(
      `Precios · ${SITE_NAME}`,
    );
    expect(doc.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
      `${SITE_URL}/pricing`,
    );
    expect(doc.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe(
      'summary_large_image',
    );
  });

  it('inserta metadatos de artículo solo para type "article" y los retira al volver a website', () => {
    seo.update({ title: 'Post', type: 'article', publishedTime: '2026-01-01' });
    expect(
      doc.querySelector('meta[property="article:published_time"]')?.getAttribute('content'),
    ).toBe('2026-01-01');

    seo.update({ title: 'Inicio' });
    expect(doc.querySelector('meta[property="article:published_time"]')).toBeNull();
  });

  it('inserta y elimina bloques JSON-LD por id', () => {
    seo.setJsonLd('test-schema', { '@type': 'Thing' });
    const script = doc.head.querySelector('script#test-schema');
    expect(script).not.toBeNull();
    expect(JSON.parse(script!.textContent!)).toEqual({ '@type': 'Thing' });

    seo.removeJsonLd('test-schema');
    expect(doc.head.querySelector('script#test-schema')).toBeNull();
  });

  it('reemplaza el contenido de un JSON-LD existente sin duplicar el <script>', () => {
    seo.setJsonLd('dup', { a: 1 });
    seo.setJsonLd('dup', { a: 2 });
    const scripts = doc.head.querySelectorAll('script#dup');
    expect(scripts.length).toBe(1);
    expect(JSON.parse(scripts[0].textContent!)).toEqual({ a: 2 });
  });
});
