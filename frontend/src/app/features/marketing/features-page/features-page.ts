import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';
import { Reveal } from '../../../shared/directives/reveal';

@Component({
  selector: 'app-features-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Reveal],
  templateUrl: './features-page.html',
})
export class FeaturesPage {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Funcionalidades',
      description:
        'Forecast por producto, alertas de rotura y optimización de inventario. Descubre todo lo que Star4cast hace por tu stock.',
      path: '/features',
      keywords:
        'funcionalidades forecasting, alertas de rotura, optimización de inventario, predicción por producto',
    });
  }

  protected readonly blocks = [
    {
      eyebrow: 'Predicción',
      title: 'Forecast por producto, no por intuición',
      text: 'Modelos de series temporales que capturan tendencia y estacionalidad de cada referencia. Elige el horizonte (14, 30, 60 o 90 días) y obtén una predicción con su banda de confianza.',
      points: ['Estacionalidad semanal y mensual', 'Horizonte configurable', 'Margen de incertidumbre visible'],
    },
    {
      eyebrow: 'Alertas',
      title: 'Entérate antes de que sea tarde',
      text: 'Star4cast calcula la fecha estimada de rotura y la compara con tu punto de pedido para avisarte con tiempo de reponer, no cuando ya estás a cero.',
      points: ['Fecha estimada de agotamiento', 'Punto de pedido por producto', 'Listado de productos a reponer'],
    },
    {
      eyebrow: 'Inventario',
      title: 'Compra justo lo necesario',
      text: 'Visualiza el stock por categoría, detecta el inventario inmovilizado y ajusta tus compras para liberar capital sin arriesgar el servicio.',
      points: ['Stock agregado por categoría', 'Detección de exceso', 'Recomendaciones de pedido'],
    },
  ];
}
