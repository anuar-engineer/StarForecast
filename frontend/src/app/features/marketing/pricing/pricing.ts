import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';
import { Reveal } from '../../../shared/directives/reveal';

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

@Component({
  selector: 'app-pricing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Reveal],
  templateUrl: './pricing.html',
})
export class Pricing {
  // NOTA: importes provisionales (placeholders). Ajusta las cifras cuando definas
  // los precios definitivos.
  protected readonly plans: Plan[] = [
    {
      name: 'Starter',
      price: '19 €',
      period: '/mes',
      description: 'Para negocios que empiezan a profesionalizar su gestión de stock.',
      features: ['Hasta 50 productos', '1 tienda', 'Forecast a 30 días', 'Alertas de rotura', 'Importación CSV'],
      cta: 'Empezar prueba',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '49 €',
      period: '/mes',
      description: 'Para negocios en crecimiento que viven del stock.',
      features: ['Hasta 2.000 productos', 'Hasta 5 tiendas', 'Forecast a 90 días', 'Bandas de confianza', 'Recomendaciones de pedido', 'Soporte prioritario'],
      cta: 'Empezar prueba',
      highlighted: true,
    },
    {
      name: 'Empresa',
      price: 'A medida',
      period: '',
      description: 'Para cadenas y distribuidores con necesidades específicas.',
      features: ['Productos ilimitados', 'Tiendas ilimitadas', 'Integraciones a medida', 'Modelos personalizados', 'SLA y onboarding dedicado', 'Gestor de cuenta'],
      cta: 'Hablar con ventas',
      highlighted: false,
    },
  ];

  protected readonly faqs = [
    { q: '¿Cómo funciona la prueba de 14 días?', a: 'Puedes usar todas las funciones de tu plan durante 14 días. Si decides continuar, eliges plan y método de pago; si no, la prueba caduca sin coste alguno.' },
    { q: '¿Puedo cambiar de plan cuando quiera?', a: 'Sí, puedes subir o bajar de plan en cualquier momento; el cambio se prorratea automáticamente en tu siguiente factura.' },
    { q: '¿Cómo importo mi histórico de stock?', a: 'Puedes subir un CSV o conectar tu sistema de inventario. La predicción mejora cuanto más histórico aportes.' },
    { q: '¿Mis datos están seguros?', a: 'Sí. Ciframos los datos en tránsito y en reposo, y no los vendemos ni los compartimos con terceros con fines comerciales.' },
  ];

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Precios',
      description:
        'Planes de Star4cast para cada etapa, con 14 días de prueba. Escala cuando lo necesites, sin permanencia ni sorpresas.',
      path: '/pricing',
      keywords: 'precios Star4cast, planes, software de predicción de stock, prueba 14 días',
    });

    this.seo.setJsonLd('faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
}
