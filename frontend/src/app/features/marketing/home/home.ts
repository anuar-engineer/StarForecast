import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService, SITE_LOGO, SITE_NAME, SITE_URL } from '../../../core/services/seo.service';
import { Reveal } from '../../../shared/directives/reveal';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Reveal],
  templateUrl: './home.html',
})
export class Home {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Software de previsión de stock para pymes · Star4cast',
      description:
        'Predice la demanda de cada producto, evita roturas de stock y recibe pedidos de compra sugeridos por proveedor. Sin permanencia, desde 29 €/mes.',
      path: '/',
      keywords:
        'software de previsión de stock, previsión de demanda, predicción de stock, software de reposición, evitar roturas de stock, pedidos de compra sugeridos, forecasting de inventario pymes',
    });

    this.seo.setJsonLd('home-schema', [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: SITE_LOGO,
        email: 'hola@star4cast.es',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'hola@star4cast.es',
          availableLanguage: 'es',
        },
        description:
          'Plataforma de predicción de stock que estima el inventario futuro a partir del histórico de cada producto.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'es',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: SITE_NAME,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: SITE_URL,
        inLanguage: 'es',
        publisher: { '@id': `${SITE_URL}/#organization` },
        description:
          'Software de predicción de stock y forecasting de demanda para retail, distribución y pymes.',
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '29',
          highPrice: '199',
          priceCurrency: 'EUR',
          offerCount: 3,
          url: `${SITE_URL}/pricing`,
        },
      },
    ]);
  }

  protected readonly steps = [
    { n: '01', title: 'Conecta tus datos', text: 'Sube un CSV o Excel con tus ventas o tu stock, o conecta Shopify o PrestaShop.' },
    { n: '02', title: 'Indica tus proveedores', text: 'Plazo de entrega, pedido mínimo y múltiplo de caja. Star4cast elige el mejor modelo para cada producto.' },
    { n: '03', title: 'Pide lo justo', text: 'Recibe alertas de rotura y pedidos de compra sugeridos, con el porqué de cada cifra.' },
  ];

  // Solo compromisos verificables del producto: sin métricas de clientes hasta tener casos reales.
  protected readonly stats = [
    { value: '0 €', label: 'de coste de alta' },
    { value: '0', label: 'meses de permanencia' },
    { value: 'Minutos', label: 'hasta tu primera previsión' },
    { value: '29 €', label: 'al mes, desde' },
  ];

  protected readonly comparison = [
    { label: 'Puesta en marcha', us: 'Minutos', them: '6 a 10 semanas de implantación' },
    { label: 'Contrato', us: 'Mensual, sin permanencia', them: 'Anual, por adelantado' },
    { label: 'Precio', us: 'Desde 29 €/mes', them: 'Cientos de euros al mes, más implantación' },
    { label: 'Cómo calcula', us: 'Te explica cada cifra', them: 'Caja negra' },
    { label: 'Tus datos', us: 'CSV, Excel, Shopify, PrestaShop', them: 'Proyecto de integración' },
    { label: 'Soporte', us: 'En español', them: 'Normalmente en inglés' },
  ];
}
