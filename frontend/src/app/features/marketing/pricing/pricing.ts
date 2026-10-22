import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ogImage, SeoService } from '../../../core/services/seo.service';
import { Reveal } from '../../../shared/directives/reveal';

type Billing = 'monthly' | 'yearly';

interface Plan {
  id: string;
  name: string;
  /** Precio mensual en euros, IVA no incluido. */
  monthly: number;
  description: string;
  limits: string[];
  features: string[];
  highlighted: boolean;
}

/** Facturación anual: se pagan 10 meses de 12. */
const YEARLY_MONTHS = 10;

@Component({
  selector: 'app-pricing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Reveal],
  templateUrl: './pricing.html',
})
export class Pricing {
  protected readonly billing = signal<Billing>('monthly');

  // Posicionamiento: por debajo de las herramientas de ecommerce de gama media
  // (≈ 49–199 $/mes, por facturación) y muy lejos de las suites enterprise
  // (≈ 400–900 $/mes + implantación). Se cobra por referencias, no por ventas.
  protected readonly plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      monthly: 29,
      description: 'Para tiendas que quieren dejar de reponer a ojo.',
      limits: ['Hasta 300 referencias', '1 almacén', '2 usuarios'],
      features: [
        'Previsión diaria por producto',
        'Alertas de rotura y exceso',
        'Importación CSV y Excel',
        'Explicación de cada previsión',
      ],
      highlighted: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      monthly: 99,
      description: 'Para negocios que viven del stock y venden en varios canales.',
      limits: ['Hasta 3.000 referencias', 'Hasta 3 almacenes', '5 usuarios'],
      features: [
        'Todo lo de Starter',
        'Pedidos sugeridos con plazo por proveedor',
        'Stock por almacén y previsión por ubicación',
        'Stock de seguridad por nivel de servicio',
        'Soporte prioritario',
      ],
      highlighted: true,
    },
    {
      id: 'business',
      name: 'Business',
      monthly: 199,
      description: 'Para distribuidores y cadenas con catálogos grandes.',
      limits: ['Hasta 15.000 referencias', 'Almacenes ilimitados', 'Usuarios ilimitados'],
      features: [
        'Todo lo de Pro',
        'Varias integraciones a la vez',
        'Acceso por API',
        'Onboarding guiado con tus datos',
        'Gestor de cuenta',
      ],
      highlighted: false,
    },
  ];

  protected readonly included = [
    'Sin permanencia',
    'Sin coste de alta',
    '14 días de prueba',
    'Configurado en minutos',
    'Soporte en español',
  ];

  protected readonly faqs = [
    {
      q: '¿Cómo funciona la prueba de 14 días?',
      a: 'Puedes usar todas las funciones de tu plan durante 14 días. Si decides continuar, eliges plan y método de pago; si no, la prueba caduca sin coste alguno.',
    },
    {
      q: '¿Hay permanencia o coste de alta?',
      a: 'No. El plan mensual se cancela cuando quieras y no hay coste de alta ni de implantación. El plan anual se paga por adelantado y equivale a pagar 10 meses de 12.',
    },
    {
      q: '¿Cuánto se tarda en configurarlo?',
      a: 'Minutos, no semanas. Subes un CSV o Excel con tus ventas o tu stock (o conectas tu tienda), indicas el plazo de entrega de cada proveedor y obtienes la primera previsión el mismo día. Sin proyectos de implantación de 6 a 10 semanas.',
    },
    {
      q: '¿Cómo calculáis la previsión?',
      a: 'Con modelos estadísticos de series temporales (suavizado exponencial, modelos estacionales y métodos específicos para productos de venta intermitente). Para cada producto elegimos el que menos error comete con tu histórico y te mostramos el modelo usado, su error y de dónde sale cada cantidad sugerida. Nada de cajas negras.',
    },
    {
      q: '¿Qué cuenta como una referencia?',
      a: 'Cada producto o variante (SKU) que quieras prever. Los productos archivados o sin movimiento que no se analizan no cuentan para el límite de tu plan.',
    },
    {
      q: '¿Os integráis con Shopify o PrestaShop?',
      a: 'Las integraciones están incluidas en el plan Business y se van activando por fases. En cualquier plan puedes trabajar con importación CSV o Excel.',
    },
    {
      q: '¿Puedo cambiar de plan?',
      a: 'Sí, puedes subir o bajar de plan en cualquier momento. El cambio se prorratea en tu siguiente factura.',
    },
    {
      q: '¿Los precios incluyen IVA?',
      a: 'No. Todos los precios se muestran en euros y sin IVA.',
    },
    {
      q: '¿Mis datos están seguros?',
      a: 'Tus datos viajan cifrados, solo los ve tu organización y no los vendemos ni los compartimos con terceros con fines comerciales.',
    },
  ];

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Precios del software de previsión de stock',
      description:
        'Planes de Star4cast desde 29 €/mes: previsión de stock, pedidos sugeridos y multialmacén. Sin permanencia, sin coste de alta y con 14 días de prueba.',
      path: '/pricing',
      image: ogImage('pricing'),
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

  /** Precio mensual mostrado según la facturación elegida. */
  protected price(plan: Plan): number {
    return this.billing() === 'yearly' ? Math.round((plan.monthly * YEARLY_MONTHS) / 12) : plan.monthly;
  }

  protected yearlyTotal(plan: Plan): number {
    return plan.monthly * YEARLY_MONTHS;
  }
}
