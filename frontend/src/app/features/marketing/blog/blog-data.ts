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
    slug: 'rotura-de-stock-que-es-y-como-evitarla',
    title: 'Rotura de stock: qué es, cuánto te cuesta y cómo evitarla',
    excerpt:
      'Cada vez que un producto se agota pierdes la venta y, a menudo, al cliente. Te explicamos el coste real de una rotura y cómo anticiparte.',
    description:
      'Qué es una rotura de stock, cuánto cuesta de verdad en ventas y clientes perdidos, y cómo evitarla con previsión de demanda y un punto de pedido dinámico.',
    keywords:
      'rotura de stock, quiebre de stock, evitar roturas de stock, ventas perdidas, punto de pedido',
    category: 'Operaciones',
    tags: ['Rotura de stock', 'Disponibilidad', 'Inventario'],
    date: '2026-06-12',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Una rotura de stock ocurre cuando un cliente quiere comprar un producto y no hay existencias para servirlo. Es uno de los fallos más caros de la gestión de inventario y, a la vez, uno de los más invisibles: la venta perdida no aparece en ningún informe porque, sencillamente, nunca llegó a registrarse.',
      },
      {
        type: 'h2',
        text: 'El coste que no ves',
      },
      {
        type: 'p',
        text: 'El daño no se queda en el ticket que no cobras. Una rotura repetida empuja al cliente hacia la competencia, erosiona la confianza en tu marca y, en canales como el ecommerce, penaliza tu visibilidad dentro del propio marketplace. El coste real de una rotura es siempre mayor que el margen de la venta concreta que se pierde.',
      },
      {
        type: 'quote',
        text: 'La venta perdida por una rotura no aparece en ninguna cuenta de resultados. Por eso es tan fácil de ignorar y tan cara de mantener.',
      },
      {
        type: 'h2',
        text: 'Por qué se producen',
      },
      {
        type: 'ul',
        items: [
          'Previsiones demasiado optimistas o desactualizadas que no anticipan los picos.',
          'Un punto de pedido fijo que no se adapta a la estacionalidad ni al plazo de entrega.',
          'Retrasos del proveedor que el stock de seguridad no llega a cubrir.',
          'Errores en el inventario: el sistema cree que hay unidades que en realidad no están.',
        ],
      },
      {
        type: 'h2',
        text: 'Cómo anticiparte',
      },
      {
        type: 'p',
        text: 'Evitar las roturas no consiste en acumular stock por si acaso, sino en saber cuándo cada referencia va a entrar en zona de riesgo. Eso exige una previsión de demanda por producto y un punto de pedido que se mueva con ella.',
      },
      {
        type: 'ol',
        items: [
          'Predice la demanda futura de cada referencia a partir de tu histórico.',
          'Calcula la fecha estimada de rotura comparando la previsión con tu stock actual.',
          'Ajusta el punto de pedido al plazo de entrega real de cada proveedor.',
          'Activa alertas que avisen antes de llegar al límite, no cuando ya es tarde.',
        ],
      },
      {
        type: 'p',
        text: 'Star4cast hace exactamente esto: proyecta el stock de cada producto día a día y te avisa antes de que la rotura ocurra, para que el pedido llegue a tiempo.',
      },
    ],
  },
  {
    slug: 'prevision-de-demanda-en-excel-limites',
    title: 'Previsión de demanda en Excel: hasta dónde llega y cuándo se queda corta',
    excerpt:
      'Excel es donde casi todos empiezan a prever ventas. Funciona… hasta cierto punto. Te contamos sus límites y cuándo conviene dar el salto.',
    description:
      'Cómo hacer previsión de demanda en Excel, qué fórmulas usar y cuáles son sus límites frente a un software de forecasting cuando crece tu catálogo.',
    keywords:
      'previsión de demanda en excel, forecasting en excel, plantilla previsión de ventas, predicción de ventas excel, software de previsión',
    category: 'Guías',
    tags: ['Excel', 'Forecasting', 'Herramientas'],
    date: '2026-06-09',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Casi todo el mundo empieza a prever sus ventas en una hoja de cálculo, y tiene sentido: Excel es flexible, está en todas partes y para un puñado de productos cumple de sobra. El problema aparece cuando el catálogo crece y las decisiones se vuelven críticas.',
      },
      {
        type: 'h2',
        text: 'Lo que Excel hace bien',
      },
      {
        type: 'p',
        text: 'Para una primera aproximación, Excel ofrece herramientas más que suficientes. Una media móvil, un suavizado exponencial o la función de previsión integrada (PRONOSTICO.ETS) permiten captar tendencia y estacionalidad de una serie con un esfuerzo razonable.',
      },
      {
        type: 'ul',
        items: [
          'Medias móviles para suavizar el ruido de la demanda.',
          'Suavizado exponencial y PRONOSTICO.ETS para tendencia y estacionalidad.',
          'Gráficos rápidos para detectar patrones a simple vista.',
        ],
      },
      {
        type: 'h2',
        text: 'Dónde se queda corto',
      },
      {
        type: 'p',
        text: 'Los límites llegan pronto. Una hoja que funciona con 20 productos se vuelve inmanejable con 2.000: las fórmulas se rompen, nadie sabe quién tocó qué y actualizar la previsión cada semana se convierte en un trabajo a tiempo completo.',
      },
      {
        type: 'ul',
        items: [
          'No escala: mantener cientos o miles de referencias a mano es inviable.',
          'Es frágil: una celda mal copiada propaga errores silenciosos.',
          'No mide su propio error de forma sistemática ni elige el mejor modelo por producto.',
          'No genera bandas de confianza para dimensionar el stock de seguridad.',
        ],
      },
      {
        type: 'quote',
        text: 'Excel no es el enemigo: es un excelente punto de partida. El problema es quedarse en él cuando el negocio ya ha crecido por encima de la hoja.',
      },
      {
        type: 'h2',
        text: 'Cuándo dar el salto',
      },
      {
        type: 'p',
        text: 'Si dedicas más tiempo a mantener la hoja que a decidir con ella, o si las roturas y los excesos persisten pese a tener una previsión, es momento de una herramienta dedicada. Star4cast automatiza el flujo completo —entrena un modelo por producto, mide su precisión y entrega la predicción con su banda de confianza— sin que tengas que tocar una sola fórmula.',
      },
    ],
  },
  {
    slug: 'analisis-abc-de-inventario',
    title: 'Análisis ABC de inventario: prioriza lo que de verdad importa',
    excerpt:
      'No todos los productos merecen la misma atención. El análisis ABC te dice dónde concentrar el control del stock para mover la aguja.',
    description:
      'Qué es el análisis ABC de inventario, cómo clasificar tus productos por su impacto y cómo aplicar políticas de stock distintas a cada categoría.',
    keywords:
      'análisis ABC de inventario, clasificación ABC, gestión de inventario, rotación de inventario, categorización de productos',
    category: 'Operaciones',
    tags: ['Análisis ABC', 'Clasificación', 'Inventario'],
    date: '2026-06-05',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'En casi cualquier catálogo se cumple una versión de la regla de Pareto: una minoría de productos concentra la mayor parte de las ventas. El análisis ABC convierte esa intuición en un criterio operativo para decidir dónde concentrar el control del inventario.',
      },
      {
        type: 'h2',
        text: 'Las tres categorías',
      },
      {
        type: 'ul',
        items: [
          'Clase A: pocas referencias que suman la mayor parte de la facturación (en torno al 80 %). Merecen el control más estricto.',
          'Clase B: un grupo intermedio, con un peso moderado en las ventas.',
          'Clase C: muchas referencias que, juntas, aportan poco. La cola larga del catálogo.',
        ],
      },
      {
        type: 'h2',
        text: 'Por qué clasificar',
      },
      {
        type: 'p',
        text: 'Aplicar la misma política de stock a todo el catálogo es ineficiente: o sobreproteges la cola larga inmovilizando capital, o desatiendes los productos A y te arriesgas a roturas justo donde más duelen. La clasificación te permite ajustar el nivel de servicio y el stock de seguridad a la importancia real de cada referencia.',
      },
      {
        type: 'quote',
        text: 'Un 20 % de tus referencias paga las facturas. Asegúrate de que nunca son esas las que se quedan sin stock.',
      },
      {
        type: 'h2',
        text: 'Cómo aplicarlo',
      },
      {
        type: 'ol',
        items: [
          'Ordena las referencias por su contribución a las ventas o al margen.',
          'Acumula el porcentaje hasta trazar los cortes A, B y C.',
          'Asigna a cada clase un nivel de servicio y una frecuencia de revisión.',
          'Revísalo periódicamente: los productos cambian de categoría con el tiempo.',
        ],
      },
      {
        type: 'p',
        text: 'Conviene combinar el ABC clásico (por ventas) con un eje de previsibilidad: un producto A pero muy volátil necesita un tratamiento distinto a uno A y estable. Star4cast aporta justo esa segunda dimensión al medir la incertidumbre de cada referencia.',
      },
    ],
  },
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
    slug: 'mape-mae-rmse-precision-del-forecast',
    title: 'MAPE, MAE y RMSE: cómo medir la precisión de tu previsión',
    excerpt:
      'Un forecast solo sirve si sabes cuánto se equivoca. Te explicamos las tres métricas de error más usadas y cuándo aplicar cada una.',
    description:
      'Guía de las métricas de precisión del forecast: qué miden MAPE, MAE y RMSE, cómo se calculan y cuál elegir según tu negocio y tus datos.',
    keywords:
      'MAPE, MAE, RMSE, precisión del forecast, métricas de previsión de demanda, error de pronóstico',
    category: 'Guías',
    tags: ['MAPE', 'Métricas', 'Precisión'],
    date: '2026-05-24',
    readingTime: '7 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Una previsión sin una medida de error es un acto de fe. Si no sabes cuánto se equivoca tu forecast, no puedes mejorarlo ni dimensionar el stock de seguridad que lo protege. Estas son las tres métricas que de verdad acabarás usando.',
      },
      {
        type: 'h2',
        text: 'MAE: el error en unidades',
      },
      {
        type: 'p',
        text: 'El error absoluto medio (MAE) es el promedio de la diferencia, en valor absoluto, entre lo previsto y lo real. Se expresa en las mismas unidades que vendes, así que es muy intuitivo: «me equivoco, de media, en 12 unidades». Trata todos los errores por igual, sean grandes o pequeños.',
      },
      {
        type: 'h2',
        text: 'MAPE: el error en porcentaje',
      },
      {
        type: 'p',
        text: 'El error porcentual absoluto medio (MAPE) expresa esa misma desviación en porcentaje, lo que permite comparar productos de volúmenes muy distintos. Su pega: se dispara cuando la demanda real es muy baja o cero, así que conviene usarlo con cuidado en referencias de venta esporádica.',
      },
      {
        type: 'h2',
        text: 'RMSE: penaliza los grandes fallos',
      },
      {
        type: 'p',
        text: 'La raíz del error cuadrático medio (RMSE) eleva al cuadrado cada error antes de promediar, de modo que castiga con dureza las desviaciones grandes. Es la métrica adecuada cuando un fallo aislado pero enorme te duele mucho más que muchos fallos pequeños.',
      },
      {
        type: 'quote',
        text: 'No hay una métrica perfecta: hay una métrica adecuada para cada decisión. Elige según lo que más te cueste equivocarte.',
      },
      {
        type: 'h2',
        text: 'La regla de oro: compara contra una referencia',
      },
      {
        type: 'p',
        text: 'Ningún número de error significa nada en el vacío. Compáralo siempre con un modelo simple —una media móvil o repetir el dato del año anterior—. Si tu modelo sofisticado no supera a esa referencia, no está aportando valor. Star4cast hace esa comparación automáticamente y elige, para cada producto, el modelo que minimiza el error.',
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
    slug: 'lead-time-plazo-de-entrega-y-stock',
    title: 'Lead time: por qué el plazo de entrega manda en tu inventario',
    excerpt:
      'El tiempo que tarda tu proveedor en servir marca cuándo y cuánto pedir. Si lo ignoras, las roturas son solo cuestión de tiempo.',
    description:
      'Qué es el lead time o plazo de entrega, cómo afecta al punto de pedido y al stock de seguridad, y por qué su variabilidad importa tanto como su media.',
    keywords:
      'lead time, plazo de entrega, tiempo de aprovisionamiento, punto de pedido, stock de seguridad',
    category: 'Operaciones',
    tags: ['Lead time', 'Aprovisionamiento', 'Proveedores'],
    date: '2026-05-16',
    readingTime: '5 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'El lead time, o plazo de entrega, es el tiempo que transcurre desde que lanzas un pedido a tu proveedor hasta que la mercancía está disponible para vender. Es uno de los parámetros más determinantes del inventario y, a la vez, uno de los peor medidos.',
      },
      {
        type: 'h2',
        text: 'Por qué manda tanto',
      },
      {
        type: 'p',
        text: 'El punto de pedido no es más que la demanda que esperas cubrir durante el lead time, más un colchón de seguridad. Si tu proveedor tarda dos semanas en servir, tienes que pedir cuando aún te queda stock para esas dos semanas. Alargar el plazo de entrega obliga a anticipar el pedido y a mantener más inventario.',
      },
      {
        type: 'h2',
        text: 'La variabilidad importa tanto como la media',
      },
      {
        type: 'p',
        text: 'Un proveedor que tarda siempre 10 días es mucho más fácil de gestionar que uno que tarda entre 5 y 20, aunque la media sea la misma. Esa irregularidad es la que de verdad infla tu stock de seguridad: para protegerte de un retraso debes prepararte para el peor caso razonable, no para el promedio.',
      },
      {
        type: 'quote',
        text: 'No te protege un plazo de entrega corto, sino uno predecible. La variabilidad es la que paga el stock de seguridad.',
      },
      {
        type: 'ul',
        items: [
          'Mide el lead time real de cada proveedor, no el que figura en el contrato.',
          'Registra también su variabilidad: cuánto se desvía de su media.',
          'Incorpora ambos al cálculo del punto de pedido de cada referencia.',
        ],
      },
      {
        type: 'h2',
        text: 'Plazo de entrega y previsión, juntos',
      },
      {
        type: 'p',
        text: 'Cuando combinas una buena previsión de demanda con el lead time real de cada proveedor, el punto de pedido deja de ser un número fijo y pasa a ajustarse solo. Star4cast contempla el plazo de entrega de cada referencia para avisarte con el margen justo: ni tan pronto que acumules, ni tan tarde que te quedes corto.',
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
    slug: 'planificar-demanda-black-friday-campanas',
    title: 'Cómo planificar la demanda para Black Friday y campañas de temporada',
    excerpt:
      'Los picos de campaña no perdonan: o llegas con stock o pierdes la venta del año. Así se planifica con datos y no a ojo.',
    description:
      'Cómo planificar la demanda y el stock para Black Friday, rebajas y campañas de temporada: anticipa los picos con tu histórico y ajusta los pedidos a tiempo.',
    keywords:
      'planificación de la demanda, black friday inventario, demanda estacional, campañas de venta, previsión de picos',
    category: 'Estrategia',
    tags: ['Black Friday', 'Campañas', 'Estacionalidad'],
    date: '2026-05-08',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'En campañas como Black Friday, las rebajas o la Navidad, la demanda de algunas referencias se multiplica en cuestión de días. Llegar con stock significa hacer la caja del año; llegar sin él, regalarle la venta a la competencia. Y, por el plazo de entrega, esas decisiones se toman semanas antes del pico.',
      },
      {
        type: 'h2',
        text: 'El problema de planificar a ojo',
      },
      {
        type: 'p',
        text: 'Confiar en la intuición o en «lo que pedimos el año pasado» deja demasiado al azar. El año pasado pudo haber una rotura que ocultó la demanda real, o una promoción que no se repetirá. Sin mirar el dato, repites los errores del pasado sin saberlo.',
      },
      {
        type: 'h2',
        text: 'Planificar con el histórico',
      },
      {
        type: 'ol',
        items: [
          'Aísla las campañas anteriores en tu histórico y mide el pico real de cada referencia.',
          'Corrige las roturas pasadas: si te quedaste sin stock, la demanda fue mayor que la venta registrada.',
          'Proyecta el pico de este año sobre la tendencia actual del producto.',
          'Lanza los pedidos con la antelación que exige el plazo de entrega de cada proveedor.',
        ],
      },
      {
        type: 'quote',
        text: 'La venta de Black Friday no se gana el viernes: se gana semanas antes, cuando decides cuánto pedir.',
      },
      {
        type: 'h2',
        text: 'Anticiparse sin pasarse',
      },
      {
        type: 'p',
        text: 'El riesgo de las campañas es doble: quedarte corto o acabar con un excedente que tendrás que liquidar en enero. La clave es dimensionar el pedido al pico previsto de cada referencia, no aplicar un aumento general a todo el catálogo. Star4cast detecta la estacionalidad de cada producto y anticipa esos picos para que pidas lo justo en el momento justo.',
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
    slug: 'como-elegir-software-de-prevision-de-demanda',
    title: 'Cómo elegir un software de previsión de demanda',
    excerpt:
      'Hojas de cálculo, módulos del ERP o herramientas dedicadas: te damos los criterios para acertar sin pagar de más.',
    description:
      'Guía para elegir un software de previsión de demanda: qué funciones mirar, cómo valorar la precisión, la integración con tu ERP y el coste real.',
    keywords:
      'software de previsión de demanda, software de forecasting, herramienta de predicción de stock, planificación de la demanda, comparativa',
    category: 'Guías',
    tags: ['Software', 'Forecasting', 'Compra'],
    date: '2026-05-02',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Cuando la hoja de cálculo se queda corta, llega la pregunta: ¿qué herramienta uso para prever la demanda? El mercado va desde módulos integrados en el ERP hasta plataformas especializadas, y la decisión condiciona durante años cómo compras y cuánto inmovilizas.',
      },
      {
        type: 'h2',
        text: 'Las opciones habituales',
      },
      {
        type: 'ul',
        items: [
          'El módulo de previsión del ERP: cómodo por estar integrado, pero a menudo rígido y poco preciso.',
          'Hojas de cálculo avanzadas: máxima flexibilidad, pero frágiles y difíciles de mantener a escala.',
          'Software especializado de previsión de demanda: pensado para esta tarea, con modelos por producto y métricas de error.',
        ],
      },
      {
        type: 'h2',
        text: 'Qué mirar antes de decidir',
      },
      {
        type: 'ol',
        items: [
          'Precisión: ¿mide su propio error y lo compara con una referencia simple?',
          'Granularidad: ¿genera una previsión por producto, o solo agregados?',
          'Incertidumbre: ¿entrega bandas de confianza para dimensionar el stock de seguridad?',
          'Integración: ¿se conecta con tu ERP, TPV o ecommerce sin un proyecto interminable?',
          'Coste total: licencia, implantación y el tiempo de tu equipo, no solo el precio de lista.',
        ],
      },
      {
        type: 'quote',
        text: 'La mejor herramienta no es la que más opciones tiene, sino la que convierte tus datos en una decisión de compra sin fricción.',
      },
      {
        type: 'h2',
        text: 'Empieza por el problema, no por la función',
      },
      {
        type: 'p',
        text: 'Antes de comparar funciones, define qué decisión quieres mejorar: cuándo reponer, cuánto pedir, qué stock de seguridad mantener. Star4cast se centra precisamente en eso: a partir de tu histórico entrena un modelo por producto, mide su precisión y te entrega la previsión lista para decidir, con una prueba para validarlo con tus propios datos.',
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
  {
    slug: 'gestion-de-inventario-para-ecommerce',
    title: 'Gestión de inventario para ecommerce: cómo no quedarte sin stock',
    excerpt:
      'Vender online multiplica los canales y la presión sobre el stock. Estas son las claves para mantener la disponibilidad sin pasarte de inventario.',
    description:
      'Claves de la gestión de inventario para ecommerce: previsión de demanda, stock de seguridad, multicanal y reposición para evitar roturas y sobrestock.',
    keywords:
      'gestión de inventario ecommerce, stock ecommerce, inventario tienda online, previsión de demanda ecommerce, evitar roturas',
    category: 'Estrategia',
    tags: ['Ecommerce', 'Inventario', 'Multicanal'],
    date: '2026-04-24',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'En el ecommerce, el stock es el cuello de botella silencioso. Puedes tener el mejor producto y la mejor campaña, pero si el cliente llega a una ficha de «agotado», la venta se evapora y, a menudo, el cliente también. Y al revés: acumular para no fallar inmoviliza una caja que el comercio online necesita ágil.',
      },
      {
        type: 'h2',
        text: 'Por qué es más difícil online',
      },
      {
        type: 'ul',
        items: [
          'Multicanal: el mismo stock alimenta tu web, los marketplaces y, a veces, la tienda física.',
          'Picos bruscos: una campaña, un envío de email o un producto viral disparan la demanda en horas.',
          'Expectativa de inmediatez: el cliente online no espera; si no lo tienes, lo compra en otro sitio.',
        ],
      },
      {
        type: 'h2',
        text: 'Las claves para no fallar',
      },
      {
        type: 'ol',
        items: [
          'Centraliza el stock real y descuéntalo por todos los canales casi en tiempo real.',
          'Prevé la demanda por referencia con tu histórico de pedidos, no por intuición.',
          'Dimensiona el stock de seguridad según la volatilidad de cada producto.',
          'Configura alertas de reposición ligadas al plazo de entrega de cada proveedor.',
        ],
      },
      {
        type: 'quote',
        text: 'En el ecommerce no compites solo en precio o producto: compites en estar disponible cuando el cliente decide comprar.',
      },
      {
        type: 'h2',
        text: 'Disponibilidad sin sobrestock',
      },
      {
        type: 'p',
        text: 'El objetivo no es llenar el almacén, sino que cada referencia esté disponible cuando se busca, sin inmovilizar más capital del necesario. Star4cast proyecta la demanda de cada producto y te avisa antes de la rotura, para que mantengas la disponibilidad que el ecommerce exige sin pagarla con inventario parado.',
      },
    ],
  },
  {
    slug: 'demanda-intermitente-metodo-croston',
    title: 'Demanda intermitente: cómo prever productos de venta esporádica',
    excerpt:
      'Los recambios y la cola larga se venden a saltos, y los modelos clásicos fallan con ellos. Aquí es donde entra el método Croston.',
    description:
      'Qué es la demanda intermitente y por qué los modelos clásicos fallan: cómo el método Croston prevé recambios y productos de venta esporádica.',
    keywords:
      'demanda intermitente, método Croston, previsión de recambios, demanda esporádica, forecasting cola larga',
    category: 'Producto',
    tags: ['Demanda intermitente', 'Croston', 'Recambios'],
    date: '2026-04-18',
    readingTime: '5 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'No todos los productos se venden de forma regular. Los recambios, la maquinaria especializada o buena parte de la cola larga de un catálogo se venden a saltos: semanas con cero ventas y, de pronto, un pedido. A esto se le llama demanda intermitente, y rompe los modelos de previsión clásicos.',
      },
      {
        type: 'h2',
        text: 'Por qué fallan los modelos habituales',
      },
      {
        type: 'p',
        text: 'Una media móvil o un suavizado exponencial aplicados a una serie llena de ceros tienden a predecir prácticamente cero siempre. El resultado es engañoso: parece que no hay demanda, justo hasta que llega el pedido que no habías previsto y provoca una rotura.',
      },
      {
        type: 'quote',
        text: 'Con demanda intermitente el problema no es el tamaño del error medio, sino estar preparado para el pedido que llega cuando menos lo esperas.',
      },
      {
        type: 'h2',
        text: 'El método Croston',
      },
      {
        type: 'p',
        text: 'El método Croston aborda el problema separando dos preguntas: cada cuánto aparece un pedido y de qué tamaño es cuando aparece. Al estimar ambas por separado y combinarlas, ofrece una previsión mucho más realista para este tipo de referencias que los métodos tradicionales.',
      },
      {
        type: 'ul',
        items: [
          'Estima el intervalo medio entre pedidos.',
          'Estima el tamaño medio de cada pedido cuando se produce.',
          'Combina ambos para obtener una tasa de demanda más estable y útil.',
        ],
      },
      {
        type: 'h2',
        text: 'Cómo lo abordamos',
      },
      {
        type: 'p',
        text: 'La clave práctica es no aplicar el mismo modelo a todo el catálogo. Star4cast identifica las referencias de demanda intermitente y emplea métodos específicos para ellas, de modo que la cola larga y los recambios reciban una previsión adecuada en lugar de un cero engañoso.',
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
