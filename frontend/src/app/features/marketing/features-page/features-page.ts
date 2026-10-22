import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ogImage, SeoService } from '../../../core/services/seo.service';
import { Reveal } from '../../../shared/directives/reveal';

type Visual = 'forecast' | 'orders' | 'explain' | 'alerts' | 'warehouses' | 'integrations';

interface FeatureBlock {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly text: string;
  readonly points: readonly string[];
  readonly visual: Visual;
}

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
      title: 'Previsión de stock y pedidos de compra sugeridos',
      description:
        'Previsión por producto, alertas de rotura, pedidos de compra según el plazo de cada proveedor, multialmacén e importación de tu inventario desde CSV o Excel.',
      path: '/features',
      image: ogImage('features'),
    });
  }

  protected readonly blocks: readonly FeatureBlock[] = [
    {
      id: 'prevision',
      eyebrow: 'Predicción',
      title: 'Previsión por producto, no por intuición',
      text: 'Modelos estadísticos de series temporales que capturan la tendencia y la estacionalidad de cada referencia, y métodos específicos para productos de venta irregular. Elige el horizonte y obtén una previsión diaria con su banda de confianza.',
      points: ['Estacionalidad semanal y anual', 'Productos de venta intermitente', 'Horizonte de 14 a 90 días'],
      visual: 'forecast',
    },
    {
      id: 'pedidos',
      eyebrow: 'Compras',
      title: 'Pedidos de compra sugeridos, listos para enviar',
      text: 'Star4cast agrupa lo que hay que reponer por proveedor y calcula cuánto pedir teniendo en cuenta su plazo de entrega, tu stock de seguridad, el pedido mínimo y el múltiplo de caja. Revisas, ajustas y exportas.',
      points: ['Plazo de entrega por proveedor', 'Pedido mínimo y múltiplo de caja', 'Exportación a PDF y CSV'],
      visual: 'orders',
    },
    {
      id: 'explicacion',
      eyebrow: 'Transparencia',
      title: 'Una previsión que entiendes',
      text: 'Nada de cajas negras. Para cada producto ves qué modelo se ha usado, cuánto se equivoca con tu histórico y de dónde sale cada cantidad sugerida: demanda prevista, plazo del proveedor, stock de seguridad y stock disponible.',
      points: ['Modelo y error visibles', 'Desglose de cada pedido sugerido', 'Tú decides: puedes ajustar cualquier cifra'],
      visual: 'explain',
    },
    {
      id: 'alertas',
      eyebrow: 'Alertas',
      title: 'Entérate antes de que sea tarde',
      text: 'Star4cast calcula la fecha estimada de rotura y la compara con el plazo de tu proveedor para avisarte cuando todavía estás a tiempo de pedir. También detecta el exceso de stock que inmoviliza tu dinero.',
      points: ['Fecha estimada de rotura', 'Punto de pedido por producto', 'Detección de exceso y stock parado'],
      visual: 'alerts',
    },
    {
      id: 'multialmacen',
      eyebrow: 'Multialmacén',
      title: 'Todas tus ubicaciones en un solo panel',
      text: 'Tiendas, almacenes y tienda online: previsión y punto de pedido por ubicación, con la vista consolidada para comprar al proveedor de una sola vez.',
      points: ['Stock y previsión por ubicación', 'Vista consolidada para compras', 'Desequilibrios entre almacenes'],
      visual: 'warehouses',
    },
    {
      id: 'integraciones',
      eyebrow: 'Datos',
      title: 'Configurado en minutos, no en semanas',
      text: 'Sube un CSV o un Excel con tus ventas o tu stock: detectamos las columnas automáticamente, aunque uses punto y coma o decimales con coma. O conecta tu tienda Shopify o PrestaShop y olvídate de exportar.',
      points: ['CSV y Excel con detección automática', 'Integración nativa con Shopify y PrestaShop', 'Sin consultoras ni proyectos de implantación'],
      visual: 'integrations',
    },
  ];

  // Datos de ejemplo de los visuales (coherentes con el desglose de "¿por qué 850?").
  protected readonly warehouses = [
    { name: 'Tienda Centro', days: 18, bar: 45 },
    { name: 'Almacén Norte', days: 34, bar: 85 },
    { name: 'Tienda online', days: 7, bar: 18 },
  ];

  protected readonly integrations = [
    { name: 'CSV', ready: true },
    { name: 'Excel', ready: true },
    { name: 'Shopify', ready: false },
    { name: 'PrestaShop', ready: false },
  ];
}
