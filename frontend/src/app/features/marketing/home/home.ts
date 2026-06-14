import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService, SITE_NAME, SITE_URL } from '../../../core/services/seo.service';
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
      title: 'Star4cast · Predicción de stock y forecasting de inventario',
      description:
        'Star4cast analiza tu histórico de inventario y predice el stock futuro de cada producto con modelos de forecasting. Evita roturas, reduce el exceso y compra justo lo necesario.',
      path: '/',
      keywords:
        'predicción de stock, forecasting de demanda, gestión de inventario, evitar roturas de stock, software de inventario',
    });

    this.seo.setJsonLd('home-schema', [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/og-image.png`,
        description:
          'Plataforma de predicción de stock que estima el inventario futuro a partir del histórico de cada producto.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'es',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: SITE_NAME,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description:
          'Software de predicción de stock y forecasting de demanda para retail, distribución y pymes.',
        offers: { '@type': 'Offer', price: '19', priceCurrency: 'EUR' },
      },
    ]);
  }

  protected readonly steps = [
    { n: '01', title: 'Conecta tus datos', text: 'Importa el histórico de stock por CSV o integración. Sin fricción.' },
    { n: '02', title: 'Entrenamos el modelo', text: 'Star4cast analiza tendencia y estacionalidad de cada producto.' },
    { n: '03', title: 'Anticípate', text: 'Recibe predicciones, alertas de rotura y recomendaciones de pedido.' },
  ];

  protected readonly stats = [
    { value: '−32%', label: 'roturas de stock' },
    { value: '−21%', label: 'inventario inmovilizado' },
    { value: '< 5 min', label: 'para tu primer forecast' },
    { value: '99,9%', label: 'uptime del servicio' },
  ];
}
