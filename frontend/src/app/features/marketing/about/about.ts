import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';
import { Reveal } from '../../../shared/directives/reveal';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Reveal],
  templateUrl: './about.html',
})
export class About {
  private readonly seo = inject(SeoService);

  protected readonly values = [
    {
      title: 'Decisiones con datos',
      text: 'Creemos que comprar inventario no debería ser un acto de fe. Convertimos tu histórico en predicciones accionables.',
      icon: 'chart',
    },
    {
      title: 'Simplicidad radical',
      text: 'La potencia de un modelo de forecasting, sin la complejidad de montar un equipo de ciencia de datos.',
      icon: 'spark',
    },
    {
      title: 'Cerca del cliente',
      text: 'Construimos con quienes gestionan stock cada día: retail, distribución y pymes que quieren crecer sin roturas.',
      icon: 'heart',
    },
  ];

  protected readonly stats = [
    { value: '2026', label: 'año de fundación' },
    { value: '+1.2M', label: 'predicciones generadas' },
    { value: '−32%', label: 'roturas de media' },
    { value: '< 5 min', label: 'al primer forecast' },
  ];

  constructor() {
    this.seo.update({
      title: 'Sobre nosotros',
      description:
        'Star4cast nace para que cualquier negocio pueda predecir su stock con la misma precisión que las grandes cadenas. Conoce nuestra misión y valores.',
      path: '/about',
      keywords: 'sobre Star4cast, quiénes somos, misión, predicción de inventario',
    });
  }
}
