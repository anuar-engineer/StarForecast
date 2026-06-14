/** Bloques de contenido renderizables dentro del cuerpo de un artículo. */
export type ContentBlock =
  | { readonly type: 'p'; readonly text: string }
  | { readonly type: 'h2'; readonly text: string }
  | { readonly type: 'ul'; readonly items: readonly string[] }
  | { readonly type: 'ol'; readonly items: readonly string[] }
  | { readonly type: 'quote'; readonly text: string };

export interface BlogPostMeta {
  readonly slug: string;
  readonly title: string;
  /** Resumen para la tarjeta del listado. */
  readonly excerpt: string;
  /** Meta description optimizada para SEO (≈150-160 caracteres). */
  readonly description: string;
  readonly keywords: string;
  readonly category: string;
  readonly tags: readonly string[];
  readonly date: string;
  readonly updated?: string;
  readonly readingTime: string;
  readonly author: string;
  readonly authorRole: string;
  readonly body: readonly ContentBlock[];
}

export const BLOG_POSTS: readonly BlogPostMeta[] = [
  {
    slug: 'forecasting-de-demanda-guia',
    title: 'Forecasting de demanda: guía práctica para empezar',
    excerpt:
      'Qué es el forecasting de demanda, qué métodos existen y cómo aplicarlo en tu negocio aunque no tengas un equipo de datos.',
    description:
      'Guía práctica de forecasting de demanda: qué es, métodos de predicción, datos necesarios y cómo medir la precisión para optimizar tu inventario.',
    keywords:
      'forecasting de demanda, predicción de demanda, previsión de ventas, series temporales, gestión de inventario',
    category: 'Guías',
    tags: ['Forecasting', 'Demanda', 'Series temporales'],
    date: '2026-06-02',
    readingTime: '8 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'El forecasting de demanda es el proceso de estimar cuántas unidades de un producto vas a vender en un periodo futuro. Suena sencillo, pero es la base sobre la que se apoyan compras, producción, logística y finanzas. Si la previsión falla, todo lo demás se resiente: o te quedas sin stock o acumulas inventario que no se mueve.',
      },
      {
        type: 'h2',
        text: '¿Por qué importa tanto acertar?',
      },
      {
        type: 'p',
        text: 'Cada error de previsión tiene un coste real. Predecir de menos provoca roturas de stock: ventas perdidas y clientes que se van a la competencia. Predecir de más inmoviliza capital en el almacén, aumenta los costes de almacenamiento y eleva el riesgo de obsolescencia o caducidad.',
      },
      {
        type: 'quote',
        text: 'Una mejora del 10 % en la precisión del forecast suele traducirse en menos roturas y menos stock de seguridad a la vez. No es un trade-off: es eficiencia.',
      },
      {
        type: 'h2',
        text: 'Los métodos más habituales',
      },
      {
        type: 'p',
        text: 'No existe un único método válido para todo. La elección depende de cuántos datos tengas, de la regularidad de la demanda y del horizonte que necesites cubrir.',
      },
      {
        type: 'ul',
        items: [
          'Media móvil y suavizado exponencial: simples y robustos para productos con demanda estable.',
          'Modelos con estacionalidad (Holt-Winters, SARIMA): capturan patrones que se repiten cada semana, mes o temporada.',
          'Modelos de machine learning: aprovechan variables externas (promociones, precio, clima) cuando hay suficiente histórico.',
          'Métodos para demanda intermitente (Croston): pensados para referencias que se venden de forma esporádica.',
        ],
      },
      {
        type: 'h2',
        text: 'Qué datos necesitas',
      },
      {
        type: 'p',
        text: 'Para empezar basta con el histórico de ventas o de movimientos de stock por producto y fecha. Cuanto más limpio y granular sea, mejor. A partir de ahí, añadir el calendario de promociones, festivos y precios mejora notablemente los resultados, pero no es imprescindible para arrancar.',
      },
      {
        type: 'ol',
        items: [
          'Reúne al menos un año de histórico para captar la estacionalidad anual.',
          'Limpia los datos: corrige roturas pasadas, devoluciones y picos atípicos.',
          'Define el horizonte y la granularidad (diaria, semanal) según tus decisiones de compra.',
          'Entrena, valida con datos que el modelo no ha visto y mide el error.',
        ],
      },
      {
        type: 'h2',
        text: 'Cómo medir si funciona',
      },
      {
        type: 'p',
        text: 'Un forecast solo es útil si sabes cuánto te equivocas. Las métricas más usadas son el MAPE (error porcentual medio absoluto) y el MAE (error absoluto medio). Compáralas siempre contra un modelo simple de referencia: si tu sofisticado modelo no supera a una media móvil, algo falla.',
      },
      {
        type: 'p',
        text: 'En Star4cast automatizamos todo este flujo: partimos de tu histórico, entrenamos un modelo por producto y te entregamos la predicción con su banda de confianza, lista para decidir cuándo y cuánto reponer.',
      },
    ],
  },
  {
    slug: 'predecir-stock-sin-ser-data-scientist',
    title: 'Cómo predecir tu stock sin ser data scientist',
    excerpt:
      'Las roturas de stock cuestan ventas y la sobre-acumulación inmoviliza capital. Te contamos cómo anticiparte con datos que ya tienes.',
    description:
      'Aprende a predecir el stock de tu negocio sin equipo de datos: con tu histórico de inventario y modelos de series temporales puedes anticipar roturas.',
    keywords:
      'predecir stock, predicción de inventario, evitar roturas de stock, series temporales, punto de pedido',
    category: 'Guías',
    tags: ['Inventario', 'Predicción', 'Pyme'],
    date: '2026-05-28',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Cada producto que se agota es una venta perdida, y cada palé que sobra es dinero parado en el almacén. El equilibrio entre ambos extremos es uno de los problemas más antiguos del retail y la distribución, y también uno de los que más margen deja sobre la mesa cuando se resuelve bien.',
      },
      {
        type: 'h2',
        text: 'No necesitas un equipo de datos',
      },
      {
        type: 'p',
        text: 'La buena noticia es que no hace falta contratar a científicos de datos para empezar. Con el histórico de stock que tu negocio ya genera, un modelo de series temporales puede aprender la tendencia y la estacionalidad de cada referencia y proyectarlas al futuro.',
      },
      {
        type: 'p',
        text: 'El histórico que ya tienes en tu TPV, tu ERP o incluso en una hoja de cálculo suele ser suficiente para arrancar. La clave no es la cantidad de datos, sino su calidad y consistencia.',
      },
      {
        type: 'h2',
        text: 'De los datos a la decisión',
      },
      {
        type: 'p',
        text: 'En Star4cast partimos de ese histórico, lo limpiamos y entrenamos un modelo por producto. El resultado es una predicción diaria con su banda de confianza: no solo el valor esperado, sino también el margen de error, que es justo lo que te permite dimensionar el stock de seguridad.',
      },
      {
        type: 'ul',
        items: [
          'Proyección del stock día a día para cada referencia.',
          'Fecha estimada de rotura comparada con tu punto de pedido.',
          'Alertas automáticas cuando una referencia entra en zona de riesgo.',
        ],
      },
      {
        type: 'quote',
        text: 'Un dato que no cambia una decisión es solo ruido. El objetivo no es predecir por predecir, sino saber qué comprar y cuándo.',
      },
      {
        type: 'p',
        text: 'A partir de ahí, calcular la fecha estimada de rotura y compararla con tu punto de pedido es inmediato. Y eso es exactamente lo que convierte un dato en una decisión que protege tus ventas y libera tu caja.',
      },
    ],
  },
  {
    slug: 'calcular-stock-de-seguridad',
    title: 'Stock de seguridad: cómo calcularlo sin pasarte ni quedarte corto',
    excerpt:
      'El colchón que te protege de las roturas también puede inmovilizar capital. Te explicamos cómo dimensionarlo con criterio.',
    description:
      'Cómo calcular el stock de seguridad correcto: variabilidad de la demanda, plazo de entrega y nivel de servicio. Fórmula y ejemplos prácticos.',
    keywords:
      'stock de seguridad, nivel de servicio, plazo de entrega, punto de pedido, gestión de inventario',
    category: 'Operaciones',
    tags: ['Stock de seguridad', 'Nivel de servicio', 'Inventario'],
    date: '2026-05-20',
    readingTime: '7 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'El stock de seguridad es el inventario extra que mantienes para absorber lo inesperado: un pico de demanda, un proveedor que se retrasa o un error de previsión. Sin él, cualquier sobresalto se convierte en una rotura. Con demasiado, inmovilizas capital innecesariamente.',
      },
      {
        type: 'h2',
        text: 'De qué depende',
      },
      {
        type: 'p',
        text: 'Tres factores determinan cuánto colchón necesitas. Entenderlos es más importante que memorizar una fórmula.',
      },
      {
        type: 'ul',
        items: [
          'Variabilidad de la demanda: cuanto más irregulares son las ventas, más colchón necesitas.',
          'Plazo de entrega (lead time) y su variabilidad: un proveedor impredecible obliga a protegerte más.',
          'Nivel de servicio objetivo: el porcentaje de pedidos que quieres satisfacer sin rotura.',
        ],
      },
      {
        type: 'h2',
        text: 'La fórmula clásica',
      },
      {
        type: 'p',
        text: 'La aproximación más extendida calcula el stock de seguridad como el factor de servicio (Z) multiplicado por la desviación estándar de la demanda durante el plazo de entrega. Subir del 90 % al 99 % de nivel de servicio no cuesta un 9 % más de stock: la curva se dispara, y por eso conviene fijar el objetivo producto a producto.',
      },
      {
        type: 'quote',
        text: 'No todas las referencias merecen el mismo nivel de servicio. Tus productos estrella justifican un 98 %; la cola larga, mucho menos.',
      },
      {
        type: 'h2',
        text: 'Dónde encaja la predicción',
      },
      {
        type: 'p',
        text: 'Aquí está la clave que muchos pasan por alto: el stock de seguridad debe cubrir el error de tu previsión, no la demanda en sí. Si tu forecast es más preciso, necesitas menos colchón para el mismo nivel de servicio. Por eso mejorar la predicción y reducir inventario van de la mano.',
      },
      {
        type: 'p',
        text: 'La banda de confianza que entrega Star4cast es precisamente esa medida de incertidumbre. Úsala para dimensionar el colchón de cada referencia de forma dinámica, en lugar de aplicar un porcentaje fijo a todo el catálogo.',
      },
    ],
  },
  {
    slug: 'estacionalidad-y-punto-de-pedido',
    title: 'Estacionalidad y punto de pedido: la pareja que evita roturas',
    excerpt:
      'El punto de pedido fijo se queda corto cuando la demanda sube en campaña. Así lo ajustamos de forma dinámica.',
    description:
      'Por qué un punto de pedido fijo provoca roturas en campaña y cómo ajustarlo de forma dinámica con la estacionalidad de cada producto.',
    keywords:
      'punto de pedido, estacionalidad, reposición de stock, demanda estacional, gestión de inventario',
    category: 'Producto',
    tags: ['Punto de pedido', 'Estacionalidad', 'Reposición'],
    date: '2026-05-12',
    readingTime: '5 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Muchos negocios fijan un punto de pedido estático: cuando el stock baja de X, se repone. Funciona… hasta que llega la campaña de Navidad, el verano o el Black Friday y la demanda se multiplica.',
      },
      {
        type: 'h2',
        text: 'El problema del umbral fijo',
      },
      {
        type: 'p',
        text: 'La demanda no es constante, y un punto de pedido que ignora la estacionalidad te deja corto justo cuando más vendes. El mismo umbral que te sobra en febrero te provoca una rotura en diciembre. La solución pasa por hacerlo dinámico.',
      },
      {
        type: 'quote',
        text: 'Un punto de pedido que no se mueve con la demanda es una rotura esperando el momento adecuado para ocurrir.',
      },
      {
        type: 'h2',
        text: 'Un umbral que respira con la demanda',
      },
      {
        type: 'p',
        text: 'Al incorporar la estacionalidad detectada por el modelo, el umbral de reposición se adapta a cada periodo. En temporada alta se anticipa para que el pedido llegue antes del pico; en temporada baja, evita el exceso y libera caja.',
      },
      {
        type: 'ul',
        items: [
          'El umbral sube semanas antes de cada campaña conocida.',
          'Tiene en cuenta el plazo de entrega real de cada proveedor.',
          'Se recalcula con cada nueva predicción, sin intervención manual.',
        ],
      },
      {
        type: 'p',
        text: 'El resultado es un sistema que pide lo justo en el momento justo, sin que nadie tenga que acordarse de subir los umbrales antes de cada temporada.',
      },
    ],
  },
  {
    slug: 'kpis-de-inventario-imprescindibles',
    title: '6 KPIs de inventario que deberías estar midiendo',
    excerpt:
      'Rotación, cobertura, fill rate… los indicadores que separan una gestión de inventario que funciona de una que improvisa.',
    description:
      'Los 6 KPIs de inventario imprescindibles: rotación, días de cobertura, fill rate, roturas, exceso y exactitud del inventario. Qué miden y cómo usarlos.',
    keywords:
      'KPIs de inventario, rotación de inventario, fill rate, días de cobertura, indicadores logísticos',
    category: 'Operaciones',
    tags: ['KPIs', 'Métricas', 'Inventario'],
    date: '2026-05-05',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Gestionar inventario sin medir es como conducir sin cuadro de mandos. Estos seis indicadores te dicen, de un vistazo, si tu stock está trabajando a tu favor o en tu contra.',
      },
      {
        type: 'h2',
        text: '1. Rotación de inventario',
      },
      {
        type: 'p',
        text: 'Cuántas veces vendes y repones tu stock medio en un periodo. Una rotación baja indica capital dormido; una muy alta puede señalar riesgo de rotura. El número ideal depende del sector, pero la tendencia siempre debería vigilarse.',
      },
      {
        type: 'h2',
        text: '2. Días de cobertura',
      },
      {
        type: 'p',
        text: 'Cuántos días aguanta tu stock actual al ritmo de venta previsto. Es la lectura más intuitiva para anticipar una rotura: si la cobertura cae por debajo de tu plazo de entrega, vas tarde.',
      },
      {
        type: 'h2',
        text: '3. Fill rate (tasa de servicio)',
      },
      {
        type: 'p',
        text: 'El porcentaje de demanda que satisfaces directamente desde el stock disponible. Es el KPI que mejor refleja la experiencia del cliente: mide lo que sí pudiste vender frente a lo que te pidieron.',
      },
      {
        type: 'h2',
        text: '4. Tasa de rotura de stock',
      },
      {
        type: 'p',
        text: 'La frecuencia con la que una referencia llega a cero teniendo demanda. Cada rotura es una venta perdida y, a menudo, un cliente perdido. Cruza este dato con el margen de cada producto para priorizar.',
      },
      {
        type: 'h2',
        text: '5. Exceso y obsolescencia',
      },
      {
        type: 'p',
        text: 'El valor del inventario que se mueve por debajo de lo previsto o que corre riesgo de caducar. Identificarlo a tiempo te permite liquidarlo antes de que se convierta en pérdida directa.',
      },
      {
        type: 'h2',
        text: '6. Exactitud del inventario',
      },
      {
        type: 'p',
        text: 'La diferencia entre lo que el sistema cree que tienes y lo que hay realmente en la estantería. Sin exactitud, ningún forecast sirve: el mejor modelo del mundo falla si parte de un stock equivocado.',
      },
      {
        type: 'quote',
        text: 'Empieza por la cobertura y el fill rate: son los dos que más rápido conectan el inventario con las ventas reales.',
      },
    ],
  },
  {
    slug: 'reducir-inventario-inmovilizado',
    title: '3 formas de reducir el inventario inmovilizado sin arriesgar el servicio',
    excerpt:
      'Liberar capital atrapado en el almacén es posible sin aumentar las roturas. Tres palancas concretas.',
    description:
      'Tres palancas para reducir el inventario inmovilizado sin disparar las roturas: segmentar por rotación, ajustar el stock de seguridad y automatizar alertas.',
    keywords:
      'inventario inmovilizado, reducir stock, capital circulante, stock de seguridad, optimización de inventario',
    category: 'Operaciones',
    tags: ['Inventario', 'Capital', 'Optimización'],
    date: '2026-04-30',
    readingTime: '4 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'El inventario inmovilizado es capital que no trabaja. Reducirlo mejora la caja, pero hacerlo a ciegas dispara las roturas. Estas son tres palancas que sí funcionan sin sacrificar el nivel de servicio.',
      },
      {
        type: 'h2',
        text: '1. Segmenta por rotación',
      },
      {
        type: 'p',
        text: 'No todos los productos merecen el mismo colchón de seguridad. Aplica un análisis ABC: tus referencias de alta rotación necesitan disponibilidad casi total, mientras que la cola larga puede operar con stocks mucho más ajustados.',
      },
      {
        type: 'h2',
        text: '2. Ajusta el stock de seguridad al riesgo real',
      },
      {
        type: 'p',
        text: 'En lugar de un porcentaje fijo para todo el catálogo, dimensiona el colchón según la incertidumbre real de cada referencia. Los productos predecibles necesitan menos; los volátiles, más. Es la forma más rápida de liberar capital sin tocar el nivel de servicio.',
      },
      {
        type: 'h2',
        text: '3. Automatiza las alertas de reposición',
      },
      {
        type: 'p',
        text: 'Reponer justo a tiempo, ni antes ni después, evita acumular sin renunciar a la disponibilidad. Unas alertas que avisan cuando una referencia entra en zona de riesgo eliminan tanto los pedidos de pánico como los excesos preventivos.',
      },
      {
        type: 'quote',
        text: 'Con predicciones fiables por producto, estas tres palancas dejan de ser intuición y pasan a ser proceso.',
      },
      {
        type: 'p',
        text: 'El objetivo no es tener menos stock por tener menos, sino tener exactamente el que cada producto necesita. Ahí es donde una buena previsión paga su precio con creces.',
      },
    ],
  },
];

export function findPost(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Categorías únicas presentes en los artículos, para filtrar en el listado. */
export function blogCategories(): readonly string[] {
  return [...new Set(BLOG_POSTS.map((p) => p.category))];
}
