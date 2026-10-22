/**
 * Landings comerciales: una página por búsqueda con intención de compra
 * ("software de previsión de demanda", "reposición de stock"...). Todas usan el
 * mismo componente; aquí solo vive el contenido.
 *
 * Sin imports a propósito: los scripts de build (sitemap e imágenes OG) importan
 * este archivo directamente con Node.
 */

export interface LandingLink {
  readonly label: string;
  /** Ruta interna, p. ej. '/features' o '/blog/mi-articulo'. */
  readonly path: string;
  readonly fragment?: string;
}

export interface LandingCard {
  readonly title: string;
  readonly text: string;
  readonly link?: LandingLink;
}

export interface LandingComparison {
  readonly title: string;
  /** Nombre de la alternativa con la que se compara (columna derecha). */
  readonly them: string;
  readonly rows: readonly { readonly label: string; readonly us: string; readonly them: string }[];
}

export interface LandingPage {
  /** Ruta de la página, sin barra inicial. */
  readonly slug: string;
  /** Título SEO (sin la marca; SeoService la añade si cabe). */
  readonly title: string;
  /** Meta description (≤ 160 caracteres). */
  readonly description: string;
  /** Nombre corto para migas de pan y enlaces del footer. */
  readonly name: string;
  readonly eyebrow: string;
  readonly h1: string;
  readonly lead: string;
  readonly painsTitle: string;
  readonly pains: readonly LandingCard[];
  readonly benefitsTitle: string;
  readonly benefits: readonly LandingCard[];
  readonly comparison?: LandingComparison;
  readonly faqs: readonly { readonly q: string; readonly a: string }[];
  /** Slugs de artículos relacionados (solo se muestran los ya publicados). */
  readonly relatedPosts: readonly string[];
}

export const LANDING_PAGES: readonly LandingPage[] = [
  {
    slug: 'software-de-prevision-de-demanda',
    title: 'Software de previsión de demanda para pymes',
    description:
      'Software de previsión de demanda por producto: elige el modelo que menos falla con tu histórico, muestra su error y sugiere pedidos. Desde 29 €/mes.',
    name: 'Previsión de demanda',
    eyebrow: 'Software de previsión de demanda',
    h1: 'Previsión de demanda por producto, sin cajas negras',
    lead: 'Star4cast calcula la demanda futura de cada referencia a partir de tu histórico de ventas, elige el modelo que menos se equivoca con tus datos y te enseña de dónde sale cada cifra.',
    painsTitle: 'Prever la demanda no debería depender de una corazonada',
    pains: [
      {
        title: 'Previsiones a ojo o en una hoja',
        text: 'La previsión vive en la cabeza de quien compra o en un Excel que nadie más entiende. Cuando esa persona falta, el criterio desaparece con ella.',
      },
      {
        title: 'Una misma fórmula para todo el catálogo',
        text: 'Una media de las últimas semanas no sirve igual para un producto estacional, uno que crece y uno que se vende de vez en cuando.',
      },
      {
        title: 'Herramientas pensadas para grandes empresas',
        text: 'Las suites de planificación exigen meses de implantación, contratos anuales y un equipo dedicado. Una pyme necesita resultados esta semana.',
      },
    ],
    benefitsTitle: 'Cómo prevé Star4cast la demanda de tu negocio',
    benefits: [
      {
        title: 'Un modelo para cada producto',
        text: 'Suavizado exponencial, modelos estacionales y métodos para demanda intermitente compiten con tu histórico. Para cada referencia se queda el que menos error comete.',
        link: { label: 'Ver la previsión por producto', path: '/features', fragment: 'prevision' },
      },
      {
        title: 'El error, a la vista',
        text: 'Cada previsión muestra el modelo usado, cuánto se ha equivocado con tus datos y su banda de confianza. Sabes cuándo fiarte de la cifra y cuándo revisarla.',
        link: { label: 'Cómo medir la precisión', path: '/blog/mape-mae-rmse-precision-del-forecast' },
      },
      {
        title: 'Estacionalidad y venta irregular',
        text: 'Detecta patrones semanales y anuales, y trata aparte los productos que se venden de forma esporádica, donde una media normal falla siempre.',
        link: { label: 'Demanda intermitente explicada', path: '/blog/demanda-intermitente-metodo-croston' },
      },
      {
        title: 'De la previsión al pedido',
        text: 'La demanda prevista se convierte en un pedido de compra sugerido con el plazo de entrega de cada proveedor, el pedido mínimo y el múltiplo de caja.',
        link: { label: 'Ver los pedidos sugeridos', path: '/features', fragment: 'pedidos' },
      },
    ],
    faqs: [
      {
        q: '¿Qué datos necesito para empezar?',
        a: 'Un histórico de ventas o de movimientos de stock con, al menos, producto, fecha y cantidad. Puedes subirlo en CSV o Excel: Star4cast detecta las columnas automáticamente.',
      },
      {
        q: '¿Cuánto histórico hace falta?',
        a: 'Cuanto más, mejor. Con un año de datos se puede capturar la estacionalidad anual; con menos también obtienes previsión, pero basada en la tendencia y los patrones semanales.',
      },
      {
        q: '¿Qué modelos de previsión usáis?',
        a: 'Modelos estadísticos de series temporales: suavizado exponencial, modelos estacionales y métodos específicos para demanda intermitente. Para cada producto se elige el que menos error comete con tu histórico.',
      },
      {
        q: '¿Cómo sé si la previsión es buena?',
        a: 'Para cada producto ves el error del modelo medido con tu propio histórico y la banda de confianza de la previsión. Así distingues las referencias fiables de las que conviene vigilar.',
      },
      {
        q: '¿Cuánto cuesta?',
        a: 'Desde 29 € al mes (IVA no incluido), sin permanencia ni coste de alta, con 14 días de prueba.',
      },
    ],
    relatedPosts: [
      'forecasting-de-demanda-guia',
      'como-elegir-software-de-prevision-de-demanda',
      'series-temporales-explicado-para-no-tecnicos',
      'como-mejorar-la-precision-del-forecast',
    ],
  },
  {
    slug: 'software-de-reposicion-de-stock',
    title: 'Software de reposición de stock para pymes',
    description:
      'Calcula qué pedir, cuánto y cuándo a cada proveedor según su plazo de entrega, tu stock de seguridad y el pedido mínimo. Sin permanencia, desde 29 €/mes.',
    name: 'Reposición de stock',
    eyebrow: 'Software de reposición de stock',
    h1: 'Reposición de stock sin pedidos de pánico',
    lead: 'Star4cast te dice qué pedir, cuánto y cuándo a cada proveedor, teniendo en cuenta su plazo de entrega, tu stock de seguridad, el pedido mínimo y el múltiplo de caja.',
    painsTitle: 'Reponer a ojo sale caro por los dos lados',
    pains: [
      {
        title: 'Pedidos urgentes cuando ya es tarde',
        text: 'Te das cuenta de que falta stock cuando el producto ya está agotado, y el proveedor tarda dos semanas en servir.',
      },
      {
        title: 'Un stock mínimo que no se mueve',
        text: 'El mínimo se fijó hace años y no sabe de temporadas, de productos que crecen ni de proveedores que han alargado sus plazos.',
      },
      {
        title: 'Horas cuadrando pedidos',
        text: 'Revisar referencia a referencia, sumar por proveedor y redondear a cajas se come una mañana entera cada semana.',
      },
    ],
    benefitsTitle: 'Qué hace Star4cast por tus compras',
    benefits: [
      {
        title: 'Punto de pedido que se recalcula',
        text: 'El momento de pedir sale de la demanda prevista y del plazo de cada proveedor, no de un número fijo. Si la demanda sube, el aviso llega antes.',
        link: { label: 'Cómo se calcula el punto de pedido', path: '/blog/como-calcular-el-punto-de-pedido' },
      },
      {
        title: 'Pedidos agrupados por proveedor',
        text: 'Lo que hay que reponer se agrupa por proveedor, respetando su pedido mínimo y su múltiplo de caja. Revisas, ajustas y exportas a PDF o CSV.',
        link: { label: 'Ver los pedidos sugeridos', path: '/features', fragment: 'pedidos' },
      },
      {
        title: 'Stock de seguridad con criterio',
        text: 'El colchón de cada referencia se dimensiona según su incertidumbre y el nivel de servicio que quieras darle, no con un porcentaje igual para todo.',
        link: { label: 'Cómo calcular el stock de seguridad', path: '/blog/calcular-stock-de-seguridad' },
      },
      {
        title: 'Alertas antes de la rotura',
        text: 'Star4cast estima la fecha de rotura de cada producto y la compara con el plazo del proveedor para avisarte mientras todavía estás a tiempo.',
        link: { label: 'Ver las alertas', path: '/features', fragment: 'alertas' },
      },
    ],
    faqs: [
      {
        q: '¿Star4cast envía los pedidos a mis proveedores?',
        a: 'No. Te propone el pedido de cada proveedor con el porqué de cada cantidad; tú lo revisas, lo ajustas si quieres y lo exportas a PDF o CSV para enviarlo como siempre.',
      },
      {
        q: '¿Tiene en cuenta el pedido mínimo y las cajas?',
        a: 'Sí. Para cada proveedor puedes indicar su plazo de entrega, su pedido mínimo y el múltiplo de caja, y la cantidad sugerida los respeta.',
      },
      {
        q: '¿Qué pasa si un proveedor cambia su plazo de entrega?',
        a: 'Actualizas el plazo de ese proveedor y el punto de pedido y las cantidades sugeridas de sus productos se recalculan con el nuevo dato.',
      },
      {
        q: '¿Sirve si tengo varios almacenes o tiendas?',
        a: 'Sí. Desde el plan Pro tienes stock y previsión por ubicación, con una vista consolidada para comprar al proveedor de una sola vez.',
      },
    ],
    relatedPosts: [
      'automatizar-la-reposicion-de-stock',
      'como-calcular-el-punto-de-pedido',
      'lead-time-plazo-de-entrega-y-stock',
      'stock-minimo-y-stock-maximo',
      'plan-de-aprovisionamiento-y-compras',
    ],
  },
  {
    slug: 'alternativa-a-excel-para-prevision-de-demanda',
    title: 'Alternativa a Excel para la previsión de demanda',
    description:
      '¿Tu Excel de previsión de demanda se ha quedado corto? Sube la misma hoja de ventas o stock y obtén una previsión por producto y pedidos sugeridos.',
    name: 'Alternativa a Excel',
    eyebrow: 'Alternativa a Excel',
    h1: 'Tu Excel de previsión ha llegado a su límite',
    lead: 'No cambies tu forma de trabajar: sube la misma hoja de ventas o de stock que ya usas y Star4cast prevé la demanda de cada producto, calcula cuándo pedir y te propone el pedido.',
    painsTitle: 'Las hojas de cálculo no se hicieron para prever un catálogo',
    pains: [
      {
        title: 'Fórmulas que se rompen',
        text: 'Una fila insertada, un rango que no se amplió o un copia y pega de más, y la previsión deja de cuadrar sin que nadie lo note.',
      },
      {
        title: 'Solo una persona sabe cómo funciona',
        text: 'La hoja creció a base de parches y depende de quien la montó. Delegar las compras se vuelve imposible.',
      },
      {
        title: 'Una media móvil para todo',
        text: 'Hacer un modelo distinto para cada producto en Excel no es viable, así que todo el catálogo acaba con la misma fórmula.',
      },
    ],
    benefitsTitle: 'Lo que ganas al dejar la hoja de cálculo',
    benefits: [
      {
        title: 'Importa tu archivo tal cual',
        text: 'Sube un CSV o un Excel: Star4cast detecta las columnas aunque uses punto y coma o decimales con coma. Sin plantillas ni formatos especiales.',
        link: { label: 'Ver la importación de datos', path: '/features', fragment: 'integraciones' },
      },
      {
        title: 'Un modelo por producto, sin fórmulas',
        text: 'Cada referencia recibe el modelo que mejor se ajusta a su histórico, con estacionalidad y tendencia incluidas.',
        link: { label: 'Ver la previsión por producto', path: '/features', fragment: 'prevision' },
      },
      {
        title: 'Sigues teniendo el control',
        text: 'Ves el modelo, el error y el desglose de cada cantidad sugerida, y puedes ajustar cualquier cifra. Y si lo necesitas, exportas a CSV y vuelves a tu hoja.',
        link: { label: 'Una previsión que entiendes', path: '/features', fragment: 'explicacion' },
      },
    ],
    comparison: {
      title: 'Excel frente a Star4cast',
      them: 'Hoja de cálculo',
      rows: [
        { label: 'Modelo de previsión', us: 'El que menos falla con cada producto', them: 'Media móvil o crecimiento fijo' },
        { label: 'Estacionalidad', us: 'Detectada producto a producto', them: 'Ajustes manuales' },
        { label: 'Plazo del proveedor', us: 'Integrado en cada pedido sugerido', them: 'Otra columna que mantener' },
        { label: 'Error de la previsión', us: 'Visible para cada producto', them: 'Nadie lo mide' },
        { label: 'Mantenimiento', us: 'Se actualiza al subir datos nuevos', them: 'Horas cada semana' },
        { label: 'Si falta quien la hizo', us: 'Cualquiera del equipo la entiende', them: 'Nadie sabe tocarla' },
      ],
    },
    faqs: [
      {
        q: '¿Qué columnas necesita mi archivo?',
        a: 'Basta con producto, fecha y cantidad vendida o en stock. Si además tienes proveedor o almacén, mejor. Star4cast detecta las columnas al importar.',
      },
      {
        q: '¿Puedo seguir usando Excel?',
        a: 'Sí. Puedes exportar la previsión y los pedidos sugeridos a CSV para seguir trabajando con tu hoja, o para compartirlos con quien la necesite.',
      },
      {
        q: '¿Tengo que limpiar los datos antes?',
        a: 'No hace falta que estén perfectos. Star4cast tolera separadores y formatos de número distintos y trata los periodos de rotura para no infravalorar la demanda.',
      },
      {
        q: '¿Cuánto tardo en tener la primera previsión?',
        a: 'Minutos: subes el archivo, indicas el plazo de entrega de tus proveedores y la previsión está lista el mismo día.',
      },
    ],
    relatedPosts: [
      'prevision-de-demanda-en-excel-limites',
      'predecir-stock-sin-ser-data-scientist',
      'limpiar-datos-de-ventas-para-el-forecasting',
    ],
  },
  {
    slug: 'prevision-de-stock-para-ecommerce',
    title: 'Previsión de stock para ecommerce',
    description:
      'Previsión de stock para tiendas online en Shopify, PrestaShop o WooCommerce: evita agotados en campaña y no inmovilices dinero en stock que no rota.',
    name: 'Ecommerce',
    eyebrow: 'Previsión de stock para ecommerce',
    h1: 'Stock para tu tienda online antes de que llegue la demanda',
    lead: 'Star4cast prevé las ventas de cada producto y variante de tu ecommerce, te avisa antes de que se agoten y te dice cuánto pedir a cada proveedor.',
    painsTitle: 'En una tienda online, un agotado es una venta para la competencia',
    pains: [
      {
        title: 'Agotados en plena campaña',
        text: 'Black Friday, rebajas o un producto que se hace viral: la demanda se dispara y el proveedor no llega a tiempo.',
      },
      {
        title: 'Dinero parado en el almacén',
        text: 'Para no quedarte corto compras de más, y el capital se queda inmovilizado en referencias que no rotan.',
      },
      {
        title: 'Cientos de variantes',
        text: 'Tallas, colores y formatos multiplican las referencias. Revisarlas una a una cada semana no es realista.',
      },
    ],
    benefitsTitle: 'Pensado para cómo vende un ecommerce',
    benefits: [
      {
        title: 'Previsión por producto y variante',
        text: 'Cada SKU tiene su propia previsión diaria, con su estacionalidad y su banda de confianza.',
        link: { label: 'Ver la previsión por producto', path: '/features', fragment: 'prevision' },
      },
      {
        title: 'Campañas y temporadas',
        text: 'Las campañas pasadas quedan en tu histórico y la estacionalidad anual se recoge en la previsión, para preparar el stock con tiempo.',
        link: { label: 'Cómo planificar Black Friday', path: '/blog/planificar-demanda-black-friday-campanas' },
      },
      {
        title: 'Tienda online y tienda física',
        text: 'Si vendes en varios canales o almacenes, ves la previsión por ubicación y una vista consolidada para comprar.',
        link: { label: 'Ver el multialmacén', path: '/features', fragment: 'multialmacen' },
      },
      {
        title: 'Tus datos, sin integraciones complejas',
        text: 'Exporta los pedidos o el stock de tu plataforma a CSV y súbelos. La conexión directa con Shopify y PrestaShop se está activando por fases.',
        link: { label: 'Ver la importación de datos', path: '/features', fragment: 'integraciones' },
      },
    ],
    faqs: [
      {
        q: '¿Funciona con Shopify, PrestaShop o WooCommerce?',
        a: 'Sí: cualquier plataforma que exporte pedidos o stock a CSV o Excel sirve desde el primer día. La conexión directa con Shopify y PrestaShop, incluida en el plan Business, se está activando por fases.',
      },
      {
        q: '¿Cada variante cuenta como una referencia?',
        a: 'Sí, cada producto o variante (SKU) que quieras prever cuenta como una referencia. Los productos archivados o sin movimiento que no se analizan no cuentan para el límite de tu plan.',
      },
      {
        q: '¿Tiene en cuenta campañas como Black Friday?',
        a: 'Las campañas de años anteriores forman parte de tu histórico, así que la estacionalidad anual se refleja en la previsión. Antes de pedir puedes ajustar cualquier cifra si este año la campaña será distinta.',
      },
      {
        q: '¿Qué plan necesito?',
        a: 'Starter cubre hasta 300 referencias y un almacén, desde 29 €/mes. Si vendes en varios canales o tienes más catálogo, Pro llega a 3.000 referencias y 3 almacenes.',
      },
    ],
    relatedPosts: [
      'gestion-de-inventario-para-ecommerce',
      'planificar-demanda-black-friday-campanas',
      'rotura-de-stock-que-es-y-como-evitarla',
      'reducir-inventario-inmovilizado',
    ],
  },
];

export function findLanding(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((l) => l.slug === slug);
}
