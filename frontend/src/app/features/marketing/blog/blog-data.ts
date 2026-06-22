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
    slug: 'integrar-erp-o-tpv-con-prevision-de-demanda',
    title: 'Cómo integrar tu ERP o TPV con un sistema de previsión de demanda',
    excerpt:
      'Una buena previsión empieza por buenos datos. Te explicamos cómo conectar tu ERP o TPV con una herramienta de forecasting sin un proyecto interminable.',
    description:
      'Cómo integrar tu ERP o TPV con un software de previsión de demanda: qué datos exportar, cada cuánto sincronizar y cómo evitar los errores más comunes.',
    keywords:
      'integrar ERP previsión, conectar TPV forecasting, exportar datos de ventas, integración de inventario, sincronización de datos',
    category: 'Guías',
    tags: ['Integración', 'ERP', 'Datos'],
    date: '2027-01-01',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Cualquier previsión de demanda es tan buena como los datos que la alimentan. Por eso, antes de elegir modelos o métricas, conviene resolver una pregunta más básica: cómo llevar el histórico de ventas que ya vive en tu ERP, tu TPV o tu plataforma de ecommerce hasta la herramienta que va a predecir.',
      },
      {
        type: 'h2',
        text: 'Qué datos necesitas exportar',
      },
      {
        type: 'p',
        text: 'No hace falta volcar toda la base de datos. Con unos pocos campos bien estructurados se puede entrenar un modelo por producto y obtener una previsión útil.',
      },
      {
        type: 'ul',
        items: [
          'Identificador de producto (SKU o referencia) estable en el tiempo.',
          'Fecha de la venta o del movimiento de stock, con la granularidad que uses para decidir.',
          'Cantidad vendida o servida, no solo el importe en euros.',
          'Opcional pero valioso: stock disponible, precio, promociones y plazo de entrega del proveedor.',
        ],
      },
      {
        type: 'h2',
        text: 'Las tres vías de integración',
      },
      {
        type: 'p',
        text: 'Hay un abanico de opciones según la madurez de tus sistemas, y todas son válidas para empezar. Lo importante es elegir la más sencilla que cubra tu caso.',
      },
      {
        type: 'ol',
        items: [
          'Exportación manual a CSV: rápida de montar y suficiente para validar la herramienta con tus datos reales.',
          'Sincronización programada: un volcado automático periódico (diario o semanal) desde tu ERP.',
          'Conexión por API: lo más robusto cuando quieres datos casi en tiempo real y sin intervención humana.',
        ],
      },
      {
        type: 'quote',
        text: 'El mejor formato de integración no es el más sofisticado, sino el que puedes mantener sin que dependa de que alguien se acuerde de exportar un archivo.',
      },
      {
        type: 'h2',
        text: 'Los errores que arruinan la previsión',
      },
      {
        type: 'p',
        text: 'La mayoría de los problemas no están en el modelo, sino en los datos de entrada: referencias que cambian de código, devoluciones contabilizadas como ventas, periodos de rotura que aparecen como demanda cero o duplicados por integraciones mal cerradas. Detectarlos al conectar los sistemas ahorra muchos disgustos después.',
      },
      {
        type: 'p',
        text: 'Star4cast está pensado para arrancar con lo que ya tienes: empieza importando un CSV de tu histórico para validar los resultados con tus propios datos y, cuando el flujo te convenza, automatiza la sincronización. Así la integración crece al ritmo de tu confianza, no al revés.',
      },
    ],
  },
  {
    slug: 'prevision-colaborativa-cpfr',
    title: 'Previsión colaborativa (CPFR): planificar la demanda con tus proveedores',
    excerpt:
      'Cuando proveedor y distribuidor comparten previsiones, las roturas y los excesos bajan a la vez. Te explicamos qué es el CPFR y cómo empezar.',
    description:
      'Qué es la previsión colaborativa o CPFR, cómo compartir planes de demanda con proveedores y clientes y por qué reduce roturas y stock en toda la cadena.',
    keywords:
      'previsión colaborativa, CPFR, planificación colaborativa, cadena de suministro, compartir previsiones',
    category: 'Estrategia',
    tags: ['CPFR', 'Colaboración', 'Cadena de suministro'],
    date: '2026-12-25',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Cada eslabón de una cadena de suministro suele prever por su cuenta: el fabricante estima sus ventas, el distribuidor las suyas y el minorista las del punto de venta. El resultado son tres previsiones distintas para el mismo producto y, con ellas, decisiones que se contradicen. La previsión colaborativa, conocida como CPFR, nace para alinear esas miradas.',
      },
      {
        type: 'h2',
        text: 'Qué es el CPFR',
      },
      {
        type: 'p',
        text: 'CPFR son las siglas de planificación, previsión y reabastecimiento colaborativos. La idea es simple: en lugar de que cada parte adivine lo que hará la otra, proveedor y cliente comparten una única previsión consensuada y, a partir de ella, planifican producción y pedidos. La información sustituye al colchón de inventario.',
      },
      {
        type: 'h2',
        text: 'Por qué reduce roturas y stock a la vez',
      },
      {
        type: 'p',
        text: 'Cuando un proveedor conoce de antemano la campaña que prepara su cliente, puede producir con tiempo en lugar de reaccionar tarde. Y cuando el cliente confía en los plazos del proveedor, no necesita inflar su stock de seguridad por si acaso. Compartir el plan ataca el origen de muchos problemas: la incertidumbre sobre lo que hará el otro.',
      },
      {
        type: 'quote',
        text: 'En una cadena de suministro, la falta de información se paga siempre con inventario. El CPFR cambia stock por confianza.',
      },
      {
        type: 'h2',
        text: 'Cómo empezar sin un gran proyecto',
      },
      {
        type: 'ol',
        items: [
          'Elige a un proveedor o cliente clave con el que ya tengas buena relación.',
          'Selecciona un grupo reducido de referencias de alto impacto para el piloto.',
          'Acordad un calendario para compartir previsiones y revisar desviaciones.',
          'Mide el resultado: roturas evitadas, stock liberado y precisión conjunta.',
        ],
      },
      {
        type: 'p',
        text: 'No hace falta un sistema corporativo para arrancar: una previsión fiable, exportable y fácil de compartir es suficiente para empezar a colaborar. Star4cast genera esa previsión por producto con su banda de confianza, de modo que puedas sentarte con tu proveedor a planificar sobre números, no sobre intuiciones.',
      },
    ],
  },
  {
    slug: 'sop-sales-and-operations-planning',
    title: 'S&OP: qué es la planificación de ventas y operaciones y por dónde empezar',
    excerpt:
      'El S&OP conecta lo que ventas espera vender con lo que operaciones puede entregar. Te contamos en qué consiste y cómo dar los primeros pasos.',
    description:
      'Qué es el S&OP (Sales and Operations Planning), cómo alinea demanda y suministro mes a mes y qué pasos seguir para implantarlo en una pyme sin complicarte.',
    keywords:
      'S&OP, sales and operations planning, planificación de ventas y operaciones, planificación de la demanda, proceso S&OP',
    category: 'Estrategia',
    tags: ['S&OP', 'Planificación', 'Procesos'],
    date: '2026-12-18',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'En muchas empresas, ventas promete y operaciones improvisa. Comercial cierra una campaña agresiva, compras se entera tarde y el almacén acaba pagando la diferencia con roturas o con stock que sobra. El S&OP, o planificación de ventas y operaciones, existe precisamente para que esa conversación ocurra antes y no después.',
      },
      {
        type: 'h2',
        text: 'Qué es el S&OP',
      },
      {
        type: 'p',
        text: 'El S&OP es un proceso periódico, normalmente mensual, en el que las áreas de ventas, operaciones y finanzas se sientan a contrastar un único plan: cuánto se espera vender, cuánto se puede producir o comprar y qué implica todo ello para la caja. El objetivo no es un número perfecto, sino una decisión compartida.',
      },
      {
        type: 'h2',
        text: 'El ciclo en cuatro pasos',
      },
      {
        type: 'ol',
        items: [
          'Previsión de demanda: se parte de una estimación objetiva basada en el histórico.',
          'Plan de suministro: operaciones valora si puede cubrir esa demanda y con qué recursos.',
          'Conciliación: se resuelven los desajustes entre lo deseable y lo posible.',
          'Decisión y seguimiento: dirección aprueba el plan y se mide su cumplimiento.',
        ],
      },
      {
        type: 'quote',
        text: 'El S&OP no busca la previsión perfecta, sino que todos planifiquen sobre el mismo número en lugar de defender el suyo.',
      },
      {
        type: 'h2',
        text: 'Por dónde empezar en una pyme',
      },
      {
        type: 'p',
        text: 'No necesitas un departamento de planificación para implantar un S&OP ligero. Basta con una reunión mensual corta, una previsión de demanda fiable como punto de partida común y un par de indicadores que todos acepten. Lo importante es la disciplina del ritmo, no la complejidad de las herramientas.',
      },
      {
        type: 'p',
        text: 'La pieza que más fricción suele generar es la previsión de partida: si cada área llega con su propia hoja, la reunión se convierte en una discusión de cifras. Star4cast aporta esa base objetiva por producto, de modo que el S&OP se dedique a decidir y no a pelear sobre qué número es el bueno.',
      },
    ],
  },
  {
    slug: 'just-in-time-vs-stock-de-seguridad',
    title: 'Just in Time vs. stock de seguridad: cuándo conviene cada enfoque',
    excerpt:
      'Reducir inventario al mínimo es tentador, pero no siempre sale a cuenta. Comparamos el Just in Time con el stock de seguridad y cuándo usar cada uno.',
    description:
      'Just in Time frente a stock de seguridad: ventajas, riesgos y cuándo conviene cada estrategia de inventario según tu sector, tus proveedores y tu demanda.',
    keywords:
      'just in time, stock de seguridad, JIT inventario, lean manufacturing, estrategia de inventario',
    category: 'Estrategia',
    tags: ['Just in Time', 'Stock de seguridad', 'Estrategia'],
    date: '2026-12-11',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'El Just in Time promete un almacén casi vacío: recibir la mercancía justo cuando se necesita, sin inmovilizar capital ni ocupar espacio. Suena ideal, pero los últimos años nos han recordado que un sistema sin colchón es también un sistema sin margen de error. La pregunta no es cuál es mejor, sino cuál encaja con tu realidad.',
      },
      {
        type: 'h2',
        text: 'La promesa del Just in Time',
      },
      {
        type: 'p',
        text: 'El JIT minimiza el inventario sincronizando la llegada de materiales con su uso o venta. Cuando funciona, libera caja, reduce costes de almacenamiento y elimina obsolescencia. Pero exige proveedores muy fiables, plazos de entrega cortos y predecibles, y una demanda relativamente estable.',
      },
      {
        type: 'h2',
        text: 'El papel del stock de seguridad',
      },
      {
        type: 'p',
        text: 'El stock de seguridad es justo lo contrario: un colchón deliberado para absorber lo inesperado. Cuesta capital, pero compra tranquilidad ante un pico de demanda o un proveedor que falla. No es ineficiencia: es un seguro cuyo precio debe ajustarse al riesgo real de cada referencia.',
      },
      {
        type: 'quote',
        text: 'El Just in Time optimiza para el día normal; el stock de seguridad protege del día malo. Casi ningún negocio vive solo en uno de los dos.',
      },
      {
        type: 'h2',
        text: 'Cuándo se inclina la balanza',
      },
      {
        type: 'ul',
        items: [
          'Hacia el JIT: proveedores cercanos y fiables, demanda estable y productos perecederos o caros de almacenar.',
          'Hacia el stock de seguridad: plazos largos o variables, demanda volátil y roturas que cuestan ventas o clientes.',
          'En la práctica: la mayoría combina ambos, aplicando más colchón a las referencias críticas y menos a las predecibles.',
        ],
      },
      {
        type: 'p',
        text: 'La clave para acertar es conocer la incertidumbre de cada producto: cuanto más predecible es su demanda y su suministro, más te puedes acercar al JIT sin riesgo. Star4cast mide esa incertidumbre referencia a referencia, para que dimensiones el colchón justo donde hace falta y aprietes donde puedes permitírtelo.',
      },
    ],
  },
  {
    slug: 'inventario-de-productos-perecederos',
    title: 'Gestión de inventario de productos perecederos: vender antes de que caduque',
    excerpt:
      'Con fecha de caducidad, el exceso no solo inmoviliza capital: lo destruye. Te contamos cómo prever y reponer productos perecederos sin tirar mercancía.',
    description:
      'Cómo gestionar el inventario de productos perecederos: previsión de demanda ajustada, rotación FEFO y reposición frecuente para reducir mermas y caducidades.',
    keywords:
      'inventario perecederos, productos perecederos, mermas, caducidad, FEFO, previsión de demanda alimentación',
    category: 'Estrategia',
    tags: ['Perecederos', 'Mermas', 'Alimentación'],
    date: '2026-12-04',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'En la mayoría de los negocios, el exceso de stock es capital dormido que tarde o temprano se vende. En los productos perecederos no: lo que sobra acaba en la basura. Alimentación, cosmética, farmacia o flores comparten la misma tensión diaria entre quedarse corto y tirar mercancía.',
      },
      {
        type: 'h2',
        text: 'Por qué es un problema distinto',
      },
      {
        type: 'p',
        text: 'En el inventario perecedero el error de previsión tiene un coste doble y asimétrico. Pasarte provoca mermas, una pérdida directa que ningún descuento posterior recupera del todo. Quedarte corto provoca roturas, con la venta perdida de siempre. Y el margen de maniobra es estrecho: no puedes acumular para la semana que viene.',
      },
      {
        type: 'quote',
        text: 'En perecederos no existe el inventario neutro: lo que no vendes a tiempo no es capital parado, es pérdida directa.',
      },
      {
        type: 'h2',
        text: 'Las palancas que funcionan',
      },
      {
        type: 'ol',
        items: [
          'Previsión ajustada y frecuente: predecir a nivel diario y por referencia para pedir lo justo.',
          'Rotación FEFO (primero en caducar, primero en salir) para minimizar lo que se pasa de fecha.',
          'Reposición en lotes pequeños y frecuentes en lugar de grandes pedidos espaciados.',
          'Vigilancia de la demanda real, descontando los días de rotura para no infravalorar las ventas.',
        ],
      },
      {
        type: 'h2',
        text: 'La previsión como red de seguridad',
      },
      {
        type: 'p',
        text: 'Cuanto más afinada es la previsión diaria, menos colchón necesitas y menos producto se echa a perder. Aquí la estacionalidad fina importa mucho: el pan del sábado no se vende como el del martes, y un modelo que lo capta evita tanto la rotura como la merma.',
      },
      {
        type: 'p',
        text: 'Star4cast proyecta la demanda de cada referencia día a día y la entrega con su margen de error, justo lo que un negocio de perecederos necesita para pedir con precisión y reducir lo que termina en el contenedor.',
      },
    ],
  },
  {
    slug: 'prevision-de-demanda-en-distribucion-mayorista',
    title: 'Previsión de demanda en distribución mayorista: pedidos grandes, márgenes finos',
    excerpt:
      'En el mayorista, un error de previsión se multiplica por el volumen. Te explicamos cómo prever la demanda cuando vendes a otros negocios, no al consumidor final.',
    description:
      'Claves de la previsión de demanda en distribución mayorista: pedidos voluminosos, demanda B2B irregular, efecto látigo y cómo ajustar el stock con márgenes ajustados.',
    keywords:
      'previsión de demanda distribución, mayorista, demanda B2B, distribución, gestión de inventario mayorista',
    category: 'Estrategia',
    tags: ['Distribución', 'Mayorista', 'B2B'],
    date: '2026-11-27',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'El distribuidor mayorista vive en un punto delicado de la cadena: compra grande para vender grande, con márgenes ajustados y clientes que son negocios, no consumidores. En ese contexto, un error de previsión no se mide en unidades sueltas, sino en palés enteros que faltan o que sobran.',
      },
      {
        type: 'h2',
        text: 'Qué hace especial al mayorista',
      },
      {
        type: 'ul',
        items: [
          'Pedidos grandes y espaciados: pocos clientes pueden mover la demanda de golpe.',
          'Demanda derivada: vendes en función de lo que tus clientes esperan vender, no del consumidor final.',
          'Márgenes finos: cada euro inmovilizado o cada rotura pesa más que en el comercio minorista.',
          'Efecto látigo: pequeñas variaciones aguas abajo llegan amplificadas a tu almacén.',
        ],
      },
      {
        type: 'h2',
        text: 'El reto de la demanda concentrada',
      },
      {
        type: 'p',
        text: 'Cuando unos pocos clientes concentran gran parte de las ventas, la demanda se vuelve irregular y difícil de prever solo con el histórico agregado. Un único cliente que adelanta o retrasa un pedido distorsiona la serie. Conviene combinar la previsión estadística con la información comercial de esas cuentas clave.',
      },
      {
        type: 'quote',
        text: 'En el mayorista no compites en el lineal, compites en estar disponible cuando tu cliente te necesita, sin ahogar tu caja en stock.',
      },
      {
        type: 'h2',
        text: 'Cómo afinar la previsión',
      },
      {
        type: 'p',
        text: 'La clave es trabajar a nivel de referencia y, cuando tenga sentido, también por cliente importante. Separar la demanda regular de la puntual evita que un pedido excepcional infle la previsión futura. Y mantener actualizado el plazo de entrega de cada proveedor permite ajustar el punto de pedido al volumen real que manejas.',
      },
      {
        type: 'p',
        text: 'Star4cast genera una previsión por referencia con su banda de confianza, de forma que el distribuidor pueda dimensionar pedidos grandes con criterio: ni quedarse sin servir a un cliente clave, ni llenar el almacén de stock que tardará meses en salir.',
      },
    ],
  },
  {
    slug: 'prevision-de-demanda-en-retail',
    title: 'Previsión de demanda en retail: cada tienda es un mundo',
    excerpt:
      'Lo que se vende en una tienda no se vende igual en otra. Te contamos cómo prever la demanda en retail teniendo en cuenta la tienda, la referencia y el calendario.',
    description:
      'Cómo hacer previsión de demanda en retail: forecasting por tienda y referencia, estacionalidad, festivos locales y reposición para evitar roturas en el lineal.',
    keywords:
      'previsión de demanda retail, forecasting tiendas, reposición de tienda, demanda por punto de venta, gestión de inventario retail',
    category: 'Estrategia',
    tags: ['Retail', 'Tiendas', 'Reposición'],
    date: '2026-11-20',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'En el retail físico, el inventario se reparte entre muchos puntos de venta, y cada uno tiene su propia personalidad: un barrio de oficinas no vende como uno residencial, ni una tienda de costa como una de montaña. Prever la demanda global y repartirla a partes iguales es la receta perfecta para tener roturas en una tienda y exceso en la de al lado.',
      },
      {
        type: 'h2',
        text: 'El nivel correcto de detalle',
      },
      {
        type: 'p',
        text: 'La previsión útil en retail se hace al cruce de tienda y referencia. Es más trabajo que un único número agregado, pero es lo que permite reponer cada lineal con lo que de verdad se va a vender allí. La buena noticia es que ese trabajo se puede automatizar por completo.',
      },
      {
        type: 'h2',
        text: 'Factores que no puedes ignorar',
      },
      {
        type: 'ul',
        items: [
          'Estacionalidad propia de cada tienda y de cada categoría de producto.',
          'Festivos locales y eventos de la zona que disparan o hunden las ventas.',
          'Espacio limitado en el lineal: no todo cabe, hay que priorizar.',
          'Roturas pasadas que esconden la demanda real de un punto de venta.',
        ],
      },
      {
        type: 'quote',
        text: 'En retail, la media miente: lo que se vende de media no se vende en ninguna tienda concreta. La previsión tiene que bajar al lineal.',
      },
      {
        type: 'h2',
        text: 'De la previsión a la reposición',
      },
      {
        type: 'p',
        text: 'Una vez tienes la demanda esperada por tienda y referencia, la reposición casi se escribe sola: sabes cuánto enviar a cada punto y cuándo, ajustando al espacio disponible y al plazo de reposición. El objetivo es que el cliente encuentre el producto en su tienda habitual, sin que la cadena se llene de stock disperso.',
      },
      {
        type: 'p',
        text: 'Star4cast trabaja a nivel de referencia y se adapta a la granularidad que necesites, detectando la estacionalidad de cada serie para que cada tienda reciba su previsión y no la media de todas.',
      },
    ],
  },
  {
    slug: 'efecto-latigo-bullwhip-en-la-cadena-de-suministro',
    title: 'El efecto látigo: por qué un pequeño cambio en ventas revienta tu almacén',
    excerpt:
      'Una variación mínima en la demanda del cliente final llega multiplicada a fábrica. Te explicamos el efecto látigo y cómo amortiguarlo.',
    description:
      'Qué es el efecto látigo (bullwhip) en la cadena de suministro, por qué amplifica la demanda aguas arriba y cómo reducirlo con mejor información y previsión.',
    keywords:
      'efecto látigo, bullwhip effect, cadena de suministro, amplificación de la demanda, gestión de inventario',
    category: 'Estrategia',
    tags: ['Efecto látigo', 'Cadena de suministro', 'Demanda'],
    date: '2026-11-13',
    readingTime: '5 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Imagina que el cliente final compra un 5 % más de un producto. El minorista, por si acaso, pide un 10 % más a su distribuidor. El distribuidor, para cubrirse, pide un 20 % más al fabricante. Y el fabricante programa producción para un 30 % más. Ese fenómeno, en el que una pequeña variación se amplifica a medida que sube por la cadena, es el efecto látigo.',
      },
      {
        type: 'h2',
        text: 'De dónde sale el latigazo',
      },
      {
        type: 'p',
        text: 'El efecto látigo no es mala suerte: tiene causas concretas y conocidas. Cada eslabón reacciona a la información distorsionada que recibe del anterior, añade su propio margen de seguridad y transmite el ruido amplificado al siguiente.',
      },
      {
        type: 'ul',
        items: [
          'Cada eslabón prevé sobre los pedidos del de abajo, no sobre la demanda real del cliente.',
          'Los pedidos en grandes lotes concentran la demanda en picos artificiales.',
          'Las promociones y los descuentos por volumen distorsionan el patrón de compra.',
          'El miedo a la rotura lleva a inflar pedidos cuando se intuye escasez.',
        ],
      },
      {
        type: 'quote',
        text: 'El efecto látigo no se combate con más stock, sino con mejor información. Cada colchón añadido por miedo amplifica el problema para el de arriba.',
      },
      {
        type: 'h2',
        text: 'Cómo amortiguarlo',
      },
      {
        type: 'p',
        text: 'Las soluciones apuntan todas en la misma dirección: reducir la distorsión de la información y la frecuencia de las reacciones bruscas. Compartir la demanda real del cliente final con toda la cadena, pedir en lotes más pequeños y frecuentes, y estabilizar las políticas de promoción ayudan a que el látigo no chasquee.',
      },
      {
        type: 'p',
        text: 'En tu propio tramo, lo mejor que puedes hacer es prever sobre la demanda real y no sobre la sensación del momento. Star4cast parte de tu histórico para darte una previsión objetiva por producto, de modo que tus pedidos respondan a lo que de verdad se vende y no contribuyan al latigazo que luego te golpea a ti.',
      },
    ],
  },
  {
    slug: 'gestion-de-inventario-multialmacen',
    title: 'Gestión de inventario multialmacén: el stock correcto en el sitio correcto',
    excerpt:
      'Tener stock total suficiente no sirve de nada si está en el almacén equivocado. Claves para gestionar inventario repartido en varias ubicaciones.',
    description:
      'Cómo gestionar inventario multialmacén: previsión por ubicación, reparto del stock, transferencias entre almacenes y visibilidad para evitar roturas locales.',
    keywords:
      'inventario multialmacén, gestión multiubicación, reparto de stock, transferencias entre almacenes, distribución de inventario',
    category: 'Operaciones',
    tags: ['Multialmacén', 'Distribución', 'Inventario'],
    date: '2026-11-06',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Cuando creces, el inventario deja de estar en un solo sitio. Abres un segundo almacén, sumas la tienda física al ecommerce o repartes existencias por regiones. Y aparece una paradoja incómoda: puedes tener stock total de sobra y, aun así, no poder servir un pedido porque las unidades están donde no toca.',
      },
      {
        type: 'h2',
        text: 'El problema no es la cantidad, es la ubicación',
      },
      {
        type: 'p',
        text: 'En un escenario multialmacén, el reto deja de ser cuánto stock tienes y pasa a ser dónde lo tienes. Una rotura local con exceso en otra ubicación es lo peor de los dos mundos: pierdes la venta y, además, tienes capital inmovilizado a unos kilómetros de distancia.',
      },
      {
        type: 'h2',
        text: 'Las decisiones clave',
      },
      {
        type: 'ol',
        items: [
          'Prever la demanda por ubicación, no solo el total de la empresa.',
          'Repartir el stock entrante según la demanda esperada de cada almacén.',
          'Definir cuándo compensa una transferencia entre almacenes y cuándo no.',
          'Mantener visibilidad en tiempo casi real del stock de cada ubicación.',
        ],
      },
      {
        type: 'quote',
        text: 'Un almacén con exceso y otro con rotura no se compensan en la cuenta de resultados: se suman como dos problemas distintos.',
      },
      {
        type: 'h2',
        text: 'Centralizar o descentralizar',
      },
      {
        type: 'p',
        text: 'No hay una respuesta única. Centralizar el stock reduce el inventario total necesario pero alarga los plazos de entrega; descentralizarlo acerca el producto al cliente a costa de más inventario repartido. La decisión depende del coste de transporte, de la urgencia que espera tu cliente y de lo predecible que sea la demanda en cada zona.',
      },
      {
        type: 'p',
        text: 'La base para acertar es siempre la misma: una previsión por referencia y por ubicación. Star4cast genera la previsión a la granularidad que manejes, para que repartas el stock entrante con criterio y las transferencias dejen de ser una reacción de última hora.',
      },
    ],
  },
  {
    slug: 'prevision-de-demanda-de-productos-nuevos',
    title: 'Cómo prever la demanda de un producto nuevo (sin histórico)',
    excerpt:
      'Un lanzamiento no tiene pasado del que aprender. Te contamos cómo estimar la demanda de un producto nuevo y reducir el riesgo del primer pedido.',
    description:
      'Cómo prever la demanda de productos nuevos sin histórico: productos análogos, fase de lanzamiento, datos tempranos y cómo ajustar el primer pedido sin pasarte.',
    keywords:
      'previsión productos nuevos, lanzamiento de producto, demanda sin histórico, cold start, previsión de demanda',
    category: 'Producto',
    tags: ['Lanzamientos', 'Productos nuevos', 'Demanda'],
    date: '2026-10-30',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Prever la demanda de un producto con años de ventas a sus espaldas es relativamente cómodo: el pasado guía el futuro. El problema llega con los lanzamientos, donde no hay histórico del que tirar y, sin embargo, hay que decidir cuántas unidades pedir para el primer lote. Equivocarse es caro en ambas direcciones.',
      },
      {
        type: 'h2',
        text: 'Apóyate en lo que sí conoces',
      },
      {
        type: 'p',
        text: 'Que un producto sea nuevo no significa que partas de cero. Casi siempre tienes referencias parecidas cuyo comportamiento puede orientarte: misma categoría, rango de precio similar o un público objetivo equivalente. La previsión por analogía consiste precisamente en usar la curva de esos productos como plantilla.',
      },
      {
        type: 'ul',
        items: [
          'Identifica productos análogos ya en catálogo y observa su arranque.',
          'Ten en cuenta el efecto novedad: muchos lanzamientos venden más al principio y luego se estabilizan.',
          'Diferencia un reemplazo de un producto realmente nuevo: el reemplazo hereda parte de la demanda del anterior.',
        ],
      },
      {
        type: 'quote',
        text: 'Un producto nuevo no tiene historia, pero rara vez está solo: casi siempre se parece a algo que ya has vendido.',
      },
      {
        type: 'h2',
        text: 'Aprende rápido con los primeros datos',
      },
      {
        type: 'p',
        text: 'La previsión inicial de un lanzamiento es, por fuerza, incierta. Por eso conviene tratarla como una hipótesis y corregirla en cuanto lleguen las primeras semanas de ventas reales. Cuanto antes incorpores esos datos, antes converge la previsión hacia la realidad y antes ajustas el segundo pedido.',
      },
      {
        type: 'h2',
        text: 'Gestiona el riesgo del primer pedido',
      },
      {
        type: 'p',
        text: 'Ante la incertidumbre, la prudencia suele ser pedir algo menos y reponer rápido si el producto arranca bien, siempre que el plazo de entrega lo permita. Así limitas el riesgo de quedarte con stock de un producto que no funciona. Star4cast incorpora las ventas reales en cuanto existen para que la previsión de un lanzamiento se afine semana a semana y el riesgo baje con cada dato nuevo.',
      },
    ],
  },
  {
    slug: 'automatizar-la-reposicion-de-stock',
    title: 'Automatizar la reposición de stock: del pedido de pánico al proceso',
    excerpt:
      'Reponer a mano, referencia por referencia, no escala y se llena de errores. Te explicamos cómo automatizar la reposición sin perder el control.',
    description:
      'Cómo automatizar la reposición de stock: punto de pedido dinámico, alertas, propuestas de pedido y reglas para reponer a tiempo sin revisar referencia a referencia.',
    keywords:
      'automatizar reposición de stock, reposición automática, punto de pedido, propuesta de pedido, gestión de inventario',
    category: 'Producto',
    tags: ['Reposición', 'Automatización', 'Inventario'],
    date: '2026-10-23',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'En muchos negocios, la reposición funciona a base de memoria y sustos. Alguien revisa el almacén, detecta que falta algo y lanza un pedido urgente. Funciona con pocas referencias, pero con un catálogo amplio se convierte en una fuente constante de roturas por descuido y de pedidos de pánico que llegan tarde y caros.',
      },
      {
        type: 'h2',
        text: 'Qué significa automatizar la reposición',
      },
      {
        type: 'p',
        text: 'Automatizar no es perder el control: es dejar que el sistema vigile cada referencia y avise cuando toca actuar, en lugar de depender de que una persona se acuerde. La decisión final puede seguir siendo humana; lo que cambia es que deja de ser reactiva y pasa a ser informada.',
      },
      {
        type: 'h2',
        text: 'Las piezas del engranaje',
      },
      {
        type: 'ol',
        items: [
          'Una previsión de demanda por producto que anticipe cuándo bajará el stock.',
          'Un punto de pedido dinámico que se ajuste a la estacionalidad y al plazo de entrega.',
          'Alertas que avisen antes de entrar en zona de riesgo, no cuando ya es tarde.',
          'Propuestas de pedido con la cantidad sugerida, listas para revisar y confirmar.',
        ],
      },
      {
        type: 'quote',
        text: 'La reposición automática no quita decisiones, quita despistes: convierte el pedido de pánico en un proceso que se ve venir.',
      },
      {
        type: 'h2',
        text: 'Empieza por lo que más duele',
      },
      {
        type: 'p',
        text: 'No hace falta automatizar todo de golpe. Lo razonable es empezar por las referencias de clase A, las que pagan las facturas y cuyas roturas más cuestan, y extender el proceso al resto a medida que ganas confianza. Cada referencia que pasa de la memoria al sistema es una rotura menos esperando a ocurrir.',
      },
      {
        type: 'p',
        text: 'Star4cast proyecta el stock de cada producto día a día, calcula la fecha estimada de rotura y avisa con el margen justo según el plazo de entrega de cada proveedor, de modo que la reposición deje de ser una carrera contrarreloj y se convierta en un proceso tranquilo.',
      },
    ],
  },
  {
    slug: 'plan-de-aprovisionamiento-y-compras',
    title: 'Plan de aprovisionamiento: comprar con cabeza y no a golpe de urgencia',
    excerpt:
      'Comprar bien no es comprar barato: es comprar lo necesario en el momento justo. Te explicamos cómo construir un plan de aprovisionamiento con datos.',
    description:
      'Qué es un plan de aprovisionamiento y cómo construirlo: previsión de demanda, plazos de entrega, lotes de compra y calendario para evitar roturas y excesos.',
    keywords:
      'plan de aprovisionamiento, planificación de compras, gestión de compras, aprovisionamiento, previsión de demanda',
    category: 'Operaciones',
    tags: ['Aprovisionamiento', 'Compras', 'Planificación'],
    date: '2026-10-16',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Comprar es una de las decisiones que más capital mueve en un negocio de producto y, a la vez, una de las que más se toman por inercia. Un buen plan de aprovisionamiento convierte esas decisiones dispersas en un proceso ordenado: qué comprar, cuánto, a quién y cuándo, con un horizonte que va más allá del pedido de esta semana.',
      },
      {
        type: 'h2',
        text: 'Qué es y para qué sirve',
      },
      {
        type: 'p',
        text: 'El plan de aprovisionamiento traduce la demanda esperada en un calendario de compras. Su objetivo es asegurar la disponibilidad de cada referencia minimizando el inventario inmovilizado, anticipando los pedidos con la antelación que exige cada proveedor y aprovechando las condiciones de compra cuando convienen.',
      },
      {
        type: 'h2',
        text: 'De la previsión al pedido',
      },
      {
        type: 'ol',
        items: [
          'Parte de una previsión de demanda por producto para el horizonte que cubra tus plazos.',
          'Resta el stock disponible y el que ya tienes pedido para conocer la necesidad neta.',
          'Aplica el plazo de entrega de cada proveedor para fijar cuándo lanzar cada pedido.',
          'Agrupa por proveedor y ajusta a los lotes o mínimos de compra cuando los haya.',
        ],
      },
      {
        type: 'quote',
        text: 'Un buen plan de compras no busca el precio más bajo, sino el coste total más bajo: incluye lo que cuesta el dinero parado y lo que cuesta la rotura.',
      },
      {
        type: 'h2',
        text: 'El error de mirar solo el precio',
      },
      {
        type: 'p',
        text: 'Comprar de más para conseguir un descuento parece un ahorro, pero a menudo es lo contrario: el dinero inmovilizado, el espacio ocupado y el riesgo de obsolescencia se comen el margen ganado. Un plan con datos pone esos costes ocultos sobre la mesa para decidir con la foto completa.',
      },
      {
        type: 'p',
        text: 'Star4cast aporta la base del plan: una previsión por producto con su incertidumbre y la fecha estimada de rotura según el plazo de cada proveedor. A partir de ahí, el plan de aprovisionamiento deja de ser una lista improvisada y pasa a ser una herramienta de gestión.',
      },
    ],
  },
  {
    slug: 'promociones-y-descuentos-en-la-prevision-de-demanda',
    title: 'Promociones y descuentos: el reto que rompe cualquier previsión',
    excerpt:
      'Una promoción dispara las ventas y, con ellas, distorsiona el histórico. Te contamos cómo prever la demanda cuando hay descuentos de por medio.',
    description:
      'Cómo afectan las promociones y los descuentos a la previsión de demanda y cómo gestionarlas: separar venta base de venta promocional y limpiar el histórico.',
    keywords:
      'promociones previsión de demanda, efecto de las promociones, descuentos inventario, demanda promocional, forecasting promociones',
    category: 'Producto',
    tags: ['Promociones', 'Descuentos', 'Demanda'],
    date: '2026-10-09',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Una promoción bien ejecutada multiplica las ventas durante unos días. El problema llega después: ese pico queda grabado en el histórico y, si no se trata con cuidado, contamina la previsión de los meses siguientes. La herramienta empieza a esperar una demanda que solo existía gracias al descuento.',
      },
      {
        type: 'h2',
        text: 'Dos efectos que confundir es caro',
      },
      {
        type: 'p',
        text: 'Una promoción no solo sube la venta: a menudo la adelanta. Parte de lo que vendes con descuento son compras que el cliente habría hecho más tarde a precio normal. Distinguir el aumento real de demanda del simple adelanto es clave para no sobrestimar lo que vendrá después.',
      },
      {
        type: 'ul',
        items: [
          'Incremento: ventas nuevas que la promoción genera de verdad.',
          'Canibalización: ventas que se llevan de otros productos del catálogo.',
          'Adelanto: compras futuras que se concentran en el periodo de descuento.',
          'Resaca: la caída posterior, cuando la demanda adelantada ya se ha consumido.',
        ],
      },
      {
        type: 'quote',
        text: 'Una promoción no analizada no es una venta extra: es una distorsión que pagarás en la previsión del trimestre siguiente.',
      },
      {
        type: 'h2',
        text: 'Cómo tratarlas en la previsión',
      },
      {
        type: 'p',
        text: 'La clave es separar la venta base de la venta promocional. Si marcas en tu histórico cuándo hubo promoción, el modelo puede aprender el comportamiento normal del producto y tratar los picos como lo que son: eventos especiales, no la nueva normalidad. Y de cara al futuro, puedes planificar el siguiente descuento sabiendo qué efecto tuvo el anterior.',
      },
      {
        type: 'p',
        text: 'Star4cast trabaja sobre tu histórico real y permite tener en cuenta estos eventos para que las promociones pasadas no inflen las previsiones futuras. Así el descuento sigue siendo una palanca de ventas y deja de ser una trampa para la planificación.',
      },
    ],
  },
  {
    slug: 'como-mejorar-la-precision-del-forecast',
    title: 'Cómo mejorar la precisión de tu previsión, paso a paso',
    excerpt:
      'Ganar unos puntos de precisión en el forecast se nota en menos roturas y menos stock. Te damos una hoja de ruta concreta para conseguirlo.',
    description:
      'Cómo mejorar la precisión del forecast paso a paso: datos limpios, modelo por producto, comparación con una referencia y revisión continua del error.',
    keywords:
      'mejorar precisión forecast, precisión de la previsión, forecast accuracy, reducir error de previsión, calidad del forecast',
    category: 'Guías',
    tags: ['Precisión', 'Forecasting', 'Mejora continua'],
    date: '2026-10-02',
    readingTime: '7 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'La precisión del forecast no es un capricho de analistas: cada punto que ganas se traduce en menos roturas, menos stock de seguridad o ambas cosas a la vez. La buena noticia es que mejorarla no suele depender de un modelo mágico, sino de una serie de pasos poco glamurosos pero muy rentables.',
      },
      {
        type: 'h2',
        text: '1. Empieza por los datos, no por el modelo',
      },
      {
        type: 'p',
        text: 'La mayor parte de las ganancias de precisión vienen de limpiar la entrada: corregir periodos de rotura que esconden la demanda real, eliminar duplicados, tratar devoluciones y depurar valores atípicos. Un modelo sencillo con datos limpios casi siempre supera a un modelo sofisticado con datos sucios.',
      },
      {
        type: 'h2',
        text: '2. Un modelo por producto, no uno para todos',
      },
      {
        type: 'p',
        text: 'Aplicar la misma fórmula a todo el catálogo es cómodo y mediocre. Un producto estable, uno estacional y uno de venta intermitente piden enfoques distintos. Elegir el método adecuado para cada referencia es una de las palancas que más mueve la aguja.',
      },
      {
        type: 'h2',
        text: '3. Compara siempre con una referencia simple',
      },
      {
        type: 'p',
        text: 'No sabrás si tu previsión es buena hasta que la enfrentes a una alternativa tonta: repetir el dato del año pasado o una media móvil. Si tu modelo no supera a esa referencia, no está aportando valor, por elegante que sea.',
      },
      {
        type: 'quote',
        text: 'Mejorar la previsión es menos cuestión de modelos exóticos y más de datos limpios, el método adecuado por producto y medir con honestidad.',
      },
      {
        type: 'h2',
        text: '4. Vigila el sesgo, no solo el error',
      },
      {
        type: 'p',
        text: 'Un forecast puede tener poco error medio y, aun así, equivocarse siempre en la misma dirección. Ese sesgo sistemático, predecir de más o de menos de forma constante, es especialmente dañino porque se acumula. Medirlo aparte del error total te dice si tu previsión está descentrada.',
      },
      {
        type: 'h2',
        text: '5. Conviértelo en un hábito',
      },
      {
        type: 'p',
        text: 'La precisión no se gana una vez, se mantiene. Revisar periódicamente qué referencias fallan más y por qué crea un ciclo de mejora continua. Star4cast automatiza buena parte de este recorrido: prueba varios modelos por producto, elige el que minimiza el error frente a una referencia y mide su precisión de forma continua, para que tú te centres en decidir.',
      },
    ],
  },
  {
    slug: 'demanda-vs-ventas-no-son-lo-mismo',
    title: 'Demanda y ventas no son lo mismo (y confundirlas te cuesta dinero)',
    excerpt:
      'Tus ventas solo registran lo que pudiste servir, no lo que el cliente quería. Te explicamos por qué prever sobre ventas en rotura subestima la demanda.',
    description:
      'Por qué demanda y ventas no son lo mismo: las roturas censuran la demanda real y prever sobre ventas perpetúa las roturas. Cómo reconstruir la demanda perdida.',
    keywords:
      'demanda vs ventas, demanda censurada, ventas perdidas, demanda real, previsión de demanda',
    category: 'Producto',
    tags: ['Demanda', 'Datos', 'Roturas'],
    date: '2026-09-25',
    readingTime: '5 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Parece una distinción de matiz, pero es una de las trampas más caras de la previsión: las ventas no son la demanda. Tus ventas registran lo que conseguiste servir; la demanda es lo que el cliente quería comprar. Y cuando ha habido roturas, esos dos números no coinciden.',
      },
      {
        type: 'h2',
        text: 'El problema de la demanda censurada',
      },
      {
        type: 'p',
        text: 'Cuando un producto se agota, las ventas de esos días caen a cero o se quedan planas, no porque nadie lo quisiera, sino porque no había nada que vender. A ese fenómeno se le llama demanda censurada: el dato real queda oculto bajo el límite del stock disponible.',
      },
      {
        type: 'quote',
        text: 'Prever sobre ventas en lugar de demanda es enseñar al modelo a repetir tus roturas: aprende que ese producto vende poco justo cuando más se buscaba.',
      },
      {
        type: 'h2',
        text: 'El círculo vicioso',
      },
      {
        type: 'p',
        text: 'Si alimentas la previsión con ventas que incluyen periodos de rotura, el modelo concluye que ese producto vende menos de lo que realmente vendería. Predice a la baja, compras menos, y la próxima rotura llega antes. Cada ciclo refuerza el error y convierte un problema puntual en uno crónico.',
      },
      {
        type: 'h2',
        text: 'Cómo recuperar la demanda perdida',
      },
      {
        type: 'ul',
        items: [
          'Marca en tu histórico los periodos en los que hubo rotura de stock.',
          'Estima qué se habría vendido esos días a partir de los periodos con disponibilidad.',
          'Usa esa demanda reconstruida, y no las ventas censuradas, para entrenar la previsión.',
        ],
      },
      {
        type: 'p',
        text: 'Distinguir demanda de ventas es uno de esos detalles que separan una previsión que mejora de una que perpetúa los errores. Star4cast tiene en cuenta los periodos de rotura para no infravalorar la demanda real, de modo que tus decisiones de compra partan de lo que el cliente quería, no solo de lo que pudiste cobrar.',
      },
    ],
  },
  {
    slug: 'limpiar-datos-de-ventas-para-el-forecasting',
    title: 'Cómo limpiar tus datos de ventas antes de prever (y por qué importa tanto)',
    excerpt:
      'Una previsión nace de los datos que le das. Te explicamos cómo limpiar tu histórico de ventas para que el forecast no herede tus errores.',
    description:
      'Cómo limpiar datos de ventas para el forecasting: tratar roturas, devoluciones, valores atípicos y huecos para que la previsión parta de la demanda real.',
    keywords:
      'limpiar datos de ventas, calidad de datos forecasting, valores atípicos, preparación de datos, demanda histórica',
    category: 'Guías',
    tags: ['Datos', 'Calidad', 'Forecasting'],
    date: '2026-09-18',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Existe una regla incómoda en cualquier proyecto de previsión: basura entra, basura sale. Puedes tener el mejor modelo del mundo, pero si lo alimentas con un histórico lleno de ruido, sus predicciones heredarán ese ruido. Por eso, antes de prever, conviene dedicar tiempo a limpiar los datos.',
      },
      {
        type: 'h2',
        text: 'Los sospechosos habituales',
      },
      {
        type: 'p',
        text: 'La mayoría de los problemas de datos no son exóticos: se repiten en casi todos los catálogos y, una vez los conoces, son fáciles de detectar.',
      },
      {
        type: 'ul',
        items: [
          'Periodos de rotura: ventas a cero que no significan ausencia de demanda.',
          'Devoluciones contabilizadas como ventas negativas o no descontadas.',
          'Valores atípicos: un pedido excepcional que distorsiona toda la serie.',
          'Huecos en los datos: días o semanas sin registro por fallos del sistema.',
          'Cambios de código de un mismo producto que parten su histórico en dos.',
        ],
      },
      {
        type: 'h2',
        text: 'Limpiar no es maquillar',
      },
      {
        type: 'p',
        text: 'Limpiar datos no consiste en borrar lo que no nos gusta, sino en reflejar mejor la realidad. Un pico por una promoción es información valiosa si lo marcas como tal; el problema es dejarlo sin contexto para que el modelo lo trate como demanda normal. La meta es que la serie represente la demanda real del producto.',
      },
      {
        type: 'quote',
        text: 'Limpiar datos no es ocultar lo que pasó, es contarlo bien: distinguir lo excepcional de lo habitual para que el modelo aprenda lo correcto.',
      },
      {
        type: 'h2',
        text: 'El equilibrio justo',
      },
      {
        type: 'p',
        text: 'Tampoco hay que pasarse: alisar en exceso la serie elimina señales reales, como la estacionalidad o las tendencias. El objetivo es quitar el ruido sin borrar la música. Documentar qué se ha corregido y por qué ayuda a no repetir el trabajo cada vez.',
      },
      {
        type: 'p',
        text: 'Star4cast incorpora buena parte de esta limpieza en su flujo: trata los periodos de rotura para no infravalorar la demanda y maneja los valores atípicos al entrenar cada modelo, de modo que partas de una base sólida sin tener que pelearte a mano con la hoja de cálculo.',
      },
    ],
  },
  {
    slug: 'modelos-arima-y-sarima-explicados',
    title: 'ARIMA y SARIMA explicados sin matemáticas (casi)',
    excerpt:
      'Dos de los modelos clásicos de previsión, contados en lenguaje claro: qué hacen, cuándo brillan y cuándo conviene otra cosa.',
    description:
      'Qué son los modelos ARIMA y SARIMA en previsión de demanda, cómo capturan tendencia y estacionalidad, cuándo usarlos y cuáles son sus límites prácticos.',
    keywords:
      'modelos ARIMA, SARIMA, series temporales, previsión de demanda, modelos de forecasting',
    category: 'Guías',
    tags: ['ARIMA', 'SARIMA', 'Series temporales'],
    date: '2026-09-11',
    readingTime: '7 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Si te has acercado al mundo de la previsión de demanda, tarde o temprano aparecen dos siglas: ARIMA y SARIMA. Suenan intimidantes, pero la idea detrás es bastante intuitiva. Vamos a desmontarlas sin ecuaciones, porque entender qué hacen ayuda a saber cuándo confiar en ellas.',
      },
      {
        type: 'h2',
        text: 'Las tres letras de ARIMA',
      },
      {
        type: 'p',
        text: 'ARIMA combina tres ideas para explicar una serie temporal a partir de su propio pasado. Cada una aporta una pieza distinta del puzle.',
      },
      {
        type: 'ul',
        items: [
          'AR (autorregresivo): el valor de hoy depende de los valores recientes. Si vendiste mucho ayer, probablemente vendas bastante hoy.',
          'I (integrado): se trabaja con las diferencias entre periodos para eliminar tendencias y estabilizar la serie.',
          'MA (media móvil): el valor de hoy depende también de los errores recientes de previsión, corrigiendo el rumbo.',
        ],
      },
      {
        type: 'h2',
        text: 'La S de SARIMA: la estacionalidad',
      },
      {
        type: 'p',
        text: 'ARIMA por sí solo no captura patrones que se repiten cada semana, mes o temporada. SARIMA añade justo eso: una capa estacional que reconoce, por ejemplo, que cada diciembre se dispara la demanda o que los lunes venden distinto a los sábados. Para productos con estacionalidad marcada, esa S marca la diferencia.',
      },
      {
        type: 'quote',
        text: 'ARIMA aprende del pasado reciente; SARIMA, además, reconoce los ritmos que se repiten. La elección depende de si tu producto tiene estación o no.',
      },
      {
        type: 'h2',
        text: 'Cuándo brillan y cuándo no',
      },
      {
        type: 'p',
        text: 'Estos modelos funcionan muy bien con series largas, regulares y con patrones claros. Donde flaquean es con demanda intermitente, con muchos productos a la vez (ajustar cada uno a mano es inviable) o cuando influyen factores externos como promociones, que no viven dentro de la propia serie.',
      },
      {
        type: 'p',
        text: 'No tienes que elegir el modelo a mano referencia por referencia. Star4cast prueba distintos enfoques para cada producto, incluidos los de la familia ARIMA, y se queda con el que mejor predice según el error medido, de modo que cada serie reciba el tratamiento que le conviene.',
      },
    ],
  },
  {
    slug: 'suavizado-exponencial-y-holt-winters',
    title: 'Suavizado exponencial y Holt-Winters: los clásicos que siguen ganando',
    excerpt:
      'Son simples, rápidos y sorprendentemente buenos. Te explicamos cómo funcionan el suavizado exponencial y Holt-Winters y por qué siguen tan vigentes.',
    description:
      'Qué es el suavizado exponencial y el método Holt-Winters: cómo capturan nivel, tendencia y estacionalidad, cuándo usarlos y por qué siguen siendo tan eficaces.',
    keywords:
      'suavizado exponencial, Holt-Winters, métodos de previsión, series temporales, forecasting clásico',
    category: 'Guías',
    tags: ['Holt-Winters', 'Suavizado exponencial', 'Series temporales'],
    date: '2026-09-04',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'En un mundo obsesionado con lo último, sorprende que algunos de los métodos de previsión más usados tengan décadas de antigüedad. El suavizado exponencial y su evolución, Holt-Winters, siguen siendo la referencia en muchísimos casos por una razón sencilla: son rápidos, robustos y difíciles de batir.',
      },
      {
        type: 'h2',
        text: 'La idea del suavizado exponencial',
      },
      {
        type: 'p',
        text: 'El principio es muy intuitivo: para predecir lo que viene, da más peso a lo reciente que a lo lejano, pero sin ignorar el pasado del todo. Cada nuevo dato corrige suavemente la estimación anterior. Así la previsión reacciona a los cambios sin volverse loca con cada subida o bajada puntual.',
      },
      {
        type: 'h2',
        text: 'Holt-Winters: nivel, tendencia y estación',
      },
      {
        type: 'p',
        text: 'El suavizado exponencial simple solo captura el nivel medio. Holt-Winters lo amplía para manejar series más ricas, descomponiéndolas en tres componentes que actualiza por separado.',
      },
      {
        type: 'ul',
        items: [
          'Nivel: el valor medio actual de la serie.',
          'Tendencia: si la demanda sube o baja de forma sostenida.',
          'Estacionalidad: los patrones que se repiten cada semana, mes o temporada.',
        ],
      },
      {
        type: 'quote',
        text: 'Antes de buscar un modelo complejo, comprueba que superas a Holt-Winters. Muchas veces ese clásico ya es el techo razonable para tu serie.',
      },
      {
        type: 'h2',
        text: 'Por qué siguen siendo tan competitivos',
      },
      {
        type: 'p',
        text: 'Estos métodos necesitan pocos datos para arrancar, se calculan muy rápido y rara vez se equivocan de forma escandalosa. Para catálogos grandes, donde hay que prever miles de referencias a la vez, esa combinación de sencillez y solidez es oro. Su límite aparece con la demanda muy irregular o cuando pesan factores externos.',
      },
      {
        type: 'p',
        text: 'Star4cast incluye estos métodos entre los que prueba para cada producto y los enfrenta a otros enfoques, quedándose con el que minimiza el error. A menudo el ganador es uno de estos clásicos, y eso está perfectamente bien: lo que importa es acertar, no la moda.',
      },
    ],
  },
  {
    slug: 'inventario-muerto-y-obsolescencia',
    title: 'Inventario muerto: cómo detectar y liquidar el stock que no se mueve',
    excerpt:
      'Hay stock que lleva meses sin venderse y nadie ha decidido qué hacer con él. Te explicamos cómo identificar el inventario muerto y recuperar su valor.',
    description:
      'Qué es el inventario muerto, cómo detectar el stock obsoleto que no rota y qué hacer con él: liquidación, agrupación y prevención para que no vuelva a ocurrir.',
    keywords:
      'inventario muerto, dead stock, stock obsoleto, obsolescencia, liquidación de stock',
    category: 'Operaciones',
    tags: ['Inventario muerto', 'Obsolescencia', 'Liquidación'],
    date: '2026-08-28',
    readingTime: '5 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'En casi todos los almacenes hay un rincón que nadie mira: cajas de producto que llevan meses, a veces años, sin moverse. Es el inventario muerto, y representa una doble pérdida silenciosa: el capital que pagaste por él y el espacio que ocupa mientras se deprecia.',
      },
      {
        type: 'h2',
        text: 'Qué cuenta como inventario muerto',
      },
      {
        type: 'p',
        text: 'No hay una definición universal, pero suele considerarse inventario muerto el stock que no ha registrado ventas durante un periodo largo, por ejemplo seis meses o un año, y cuya demanda futura es prácticamente nula. La frontera la pones tú según la rotación normal de tu sector.',
      },
      {
        type: 'h2',
        text: 'Por qué se acumula',
      },
      {
        type: 'ul',
        items: [
          'Compras demasiado optimistas o por descuentos de volumen que nunca se vendieron.',
          'Productos descatalogados o sustituidos por una versión nueva.',
          'Cambios de moda, temporada o tecnología que dejaron la referencia obsoleta.',
          'Falta de visibilidad: nadie revisa qué lleva tiempo sin moverse.',
        ],
      },
      {
        type: 'quote',
        text: 'El inventario muerto rara vez mejora con el tiempo. Cuanto antes asumas la pérdida y recuperes el espacio, menos te costará.',
      },
      {
        type: 'h2',
        text: 'Qué hacer con él',
      },
      {
        type: 'p',
        text: 'Una vez identificado, el objetivo es recuperar el máximo valor posible: liquidarlo con descuento, agruparlo con productos que sí se venden, devolverlo al proveedor si hay acuerdo o, en último término, asumir la pérdida y liberar el espacio. Mantenerlo por no reconocer el error solo agranda el agujero.',
      },
      {
        type: 'p',
        text: 'Lo más rentable, sin embargo, es evitar que se forme. Una previsión por producto que detecta a tiempo cuándo una referencia pierde tracción permite frenar las compras antes de acumular. Star4cast vigila la demanda de cada producto, de modo que veas venir la caída en lugar de descubrirla cuando ya tienes el almacén lleno.',
      },
    ],
  },
  {
    slug: 'sobrestock-exceso-de-inventario-causas-y-soluciones',
    title: 'Sobrestock: por qué acumulas de más y cómo dejar de hacerlo',
    excerpt:
      'El exceso de inventario es más silencioso que la rotura, pero igual de caro. Te contamos sus causas reales y cómo reducirlo sin arriesgar el servicio.',
    description:
      'Qué es el sobrestock o exceso de inventario, qué lo provoca y cómo reducirlo: previsión ajustada, stock de seguridad dinámico y control de compras por volumen.',
    keywords:
      'sobrestock, exceso de inventario, reducir inventario, capital inmovilizado, gestión de inventario',
    category: 'Operaciones',
    tags: ['Sobrestock', 'Exceso', 'Inventario'],
    date: '2026-08-21',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'La rotura de stock hace ruido: un cliente que no encuentra el producto, una venta que se pierde. El sobrestock, en cambio, es silencioso. Nadie se queja porque hay de sobra, y precisamente por eso se tolera durante meses mientras inmoviliza una cantidad sorprendente de capital.',
      },
      {
        type: 'h2',
        text: 'El coste invisible del exceso',
      },
      {
        type: 'p',
        text: 'Tener de más no es gratis. El sobrestock inmoviliza dinero que podrías usar en otra cosa, ocupa espacio de almacén, genera costes de manipulación y seguro, y aumenta el riesgo de que el producto caduque o quede obsoleto antes de venderse. Es un coste continuo que no aparece en ninguna factura.',
      },
      {
        type: 'h2',
        text: 'De dónde viene',
      },
      {
        type: 'ul',
        items: [
          'Previsiones demasiado optimistas que nunca se cumplen.',
          'Compras grandes para conseguir descuentos por volumen.',
          'Stock de seguridad fijo y excesivo aplicado a todo el catálogo por igual.',
          'Miedo a la rotura, que lleva a comprar de más por sistema.',
          'Pedidos mínimos del proveedor que obligan a llevar más de lo necesario.',
        ],
      },
      {
        type: 'quote',
        text: 'Casi nadie audita el exceso porque no duele al instante. Pero el sobrestock es una rotura al revés: en vez de perder la venta, pierdes la caja.',
      },
      {
        type: 'h2',
        text: 'Cómo reducirlo sin generar roturas',
      },
      {
        type: 'p',
        text: 'La clave es no recortar a ciegas, sino con criterio. Ajustar el stock de seguridad a la incertidumbre real de cada referencia, en lugar de aplicar un porcentaje uniforme, libera capital justo donde sobra. Y una previsión más afinada permite comprar lo necesario sin el colchón del miedo.',
      },
      {
        type: 'p',
        text: 'Star4cast dimensiona la incertidumbre de cada producto con su banda de confianza, de modo que distingas las referencias predecibles, donde puedes apretar, de las volátiles, donde conviene proteger. Así reduces el exceso sin abrir la puerta a las roturas.',
      },
    ],
  },
  {
    slug: 'coste-de-almacenamiento-de-inventario',
    title: 'El coste real de almacenar inventario (es más de lo que crees)',
    excerpt:
      'Guardar producto cuesta mucho más que el alquiler del almacén. Te desglosamos el coste de mantenimiento del inventario y por qué conviene medirlo.',
    description:
      'Qué incluye el coste de almacenamiento de inventario: capital inmovilizado, espacio, manipulación, seguro y obsolescencia, y cómo usarlo para decidir cuánto pedir.',
    keywords:
      'coste de almacenamiento, coste de mantenimiento de inventario, holding cost, capital inmovilizado, gestión de inventario',
    category: 'Operaciones',
    tags: ['Costes', 'Almacenamiento', 'Inventario'],
    date: '2026-08-14',
    readingTime: '5 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Pregunta a cualquiera cuánto cuesta almacenar su inventario y la respuesta suele ser el alquiler del almacén. Pero esa es solo la punta del iceberg. El coste real de mantener stock incluye varias partidas que, sumadas, suelen rondar entre el 20 % y el 30 % anual del valor del inventario.',
      },
      {
        type: 'h2',
        text: 'Las partidas que lo componen',
      },
      {
        type: 'ul',
        items: [
          'Coste de capital: el dinero invertido en stock no está disponible para otra cosa.',
          'Espacio: alquiler, energía, climatización y mantenimiento del almacén.',
          'Manipulación: personal, equipos y sistemas para mover y controlar el producto.',
          'Seguro e impuestos asociados al valor almacenado.',
          'Riesgo: obsolescencia, caducidad, robos y deterioro.',
        ],
      },
      {
        type: 'h2',
        text: 'Por qué conviene ponerle número',
      },
      {
        type: 'p',
        text: 'Conocer tu coste de almacenamiento cambia muchas decisiones. Ese descuento por comprar el doble deja de ser atractivo si el dinero ahorrado se lo come el coste de tener esa mercancía parada medio año. Sin el número, esas compras parecen un chollo; con él, se ven como lo que a veces son: una trampa.',
      },
      {
        type: 'quote',
        text: 'Mientras no le pongas un porcentaje al coste de almacenar, cualquier descuento por volumen parecerá rentable. Casi nunca lo es tanto.',
      },
      {
        type: 'h2',
        text: 'El equilibrio con la rotura',
      },
      {
        type: 'p',
        text: 'El coste de almacenamiento empuja a tener menos stock; el coste de la rotura, a tener más. La gestión de inventario consiste en encontrar el punto donde la suma de ambos es mínima. Para eso necesitas las dos cifras y una previsión fiable que te diga cuánto inventario hace falta de verdad.',
      },
      {
        type: 'p',
        text: 'Star4cast aporta esa previsión por producto con su incertidumbre, la pieza que te permite calcular el inventario mínimo necesario para tu nivel de servicio y, con tu coste de almacenamiento en la mano, decidir cuánto y cuándo comprar.',
      },
    ],
  },
  {
    slug: 'dias-de-inventario-dio',
    title: 'Días de inventario (DIO): cuánto tiempo tienes el dinero en el almacén',
    excerpt:
      'Es uno de los indicadores que mejor conecta el stock con la caja. Te explicamos qué son los días de inventario, cómo se calculan y cómo mejorarlos.',
    description:
      'Qué son los días de inventario o DIO, cómo se calculan, qué valor es bueno según el sector y cómo reducirlos sin provocar roturas para liberar caja.',
    keywords:
      'días de inventario, DIO, días de existencias, rotación de inventario, capital circulante',
    category: 'Operaciones',
    tags: ['DIO', 'KPIs', 'Caja'],
    date: '2026-08-07',
    readingTime: '5 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Si tuvieras que elegir un solo número para entender cómo de eficiente es tu inventario en términos de caja, los días de inventario serían un firme candidato. Te dicen, en lenguaje llano, cuántos días tarda tu stock en convertirse en ventas, es decir, cuánto tiempo tienes el dinero atrapado en el almacén.',
      },
      {
        type: 'h2',
        text: 'Cómo se calcula',
      },
      {
        type: 'p',
        text: 'Los días de inventario, o DIO por sus siglas en inglés, relacionan el stock medio con el coste de las ventas de un periodo. De forma intuitiva: divides tu inventario medio entre lo que vendes al día (a coste) y obtienes cuántos días de venta tienes guardados. Cien días de inventario significan que, de media, cada producto pasa unos tres meses en el almacén antes de venderse.',
      },
      {
        type: 'quote',
        text: 'Cada día de inventario es un día que tu dinero pasa en una estantería en lugar de en tu cuenta. Reducirlos, sin romper el servicio, es liberar caja.',
      },
      {
        type: 'h2',
        text: 'Qué valor es bueno',
      },
      {
        type: 'p',
        text: 'No existe un número universal: un supermercado con perecederos opera con poquísimos días, mientras que un fabricante de maquinaria puede necesitar muchos. Lo importante no es compararte con otro sector, sino con tu propia evolución y con tus competidores directos. La tendencia dice más que el dato aislado.',
      },
      {
        type: 'h2',
        text: 'Cómo reducirlos con cabeza',
      },
      {
        type: 'ul',
        items: [
          'Ajusta el stock de seguridad a la incertidumbre real de cada referencia.',
          'Identifica y liquida el inventario muerto que infla la media.',
          'Mejora la previsión para comprar lo necesario sin colchón de más.',
          'Vigila las referencias de baja rotación, que son las que más días acumulan.',
        ],
      },
      {
        type: 'p',
        text: 'Reducir los días de inventario sin provocar roturas exige saber cuánto stock necesita de verdad cada producto. Star4cast te da esa previsión por referencia, de modo que recortes los días sobrantes justo donde están y no a base de tijeretazos generales que acaban en rotura.',
      },
    ],
  },
  {
    slug: 'stock-minimo-y-stock-maximo',
    title: 'Stock mínimo y stock máximo: las dos rayas que ordenan tu almacén',
    excerpt:
      'Bien fijados, evitan tanto la rotura como el exceso casi solos. Te explicamos qué son el stock mínimo y máximo y cómo calcularlos sin quedarte fijo en un número.',
    description:
      'Qué son el stock mínimo y el stock máximo, cómo calcularlos según demanda y plazo de entrega, y por qué deben ser dinámicos para evitar roturas y excesos.',
    keywords:
      'stock mínimo, stock máximo, nivel de reposición, punto de pedido, gestión de inventario',
    category: 'Operaciones',
    tags: ['Stock mínimo', 'Stock máximo', 'Reposición'],
    date: '2026-07-31',
    readingTime: '5 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Dos números sencillos pueden poner orden en buena parte de tu inventario: el stock mínimo y el stock máximo. Bien fijados, definen una banda dentro de la cual cada referencia debería moverse, y convierten la reposición en algo casi automático. Mal fijados, se vuelven la causa silenciosa de roturas y excesos.',
      },
      {
        type: 'h2',
        text: 'Qué es cada uno',
      },
      {
        type: 'p',
        text: 'El stock mínimo es el nivel por debajo del cual no quieres bajar, porque a partir de ahí el riesgo de rotura se dispara antes de que llegue la reposición. El stock máximo es el techo que no quieres superar, porque por encima estarías inmovilizando capital sin necesidad. Entre ambos vive la zona sana.',
      },
      {
        type: 'h2',
        text: 'Cómo se calculan',
      },
      {
        type: 'ol',
        items: [
          'El stock mínimo cubre la demanda esperada durante el plazo de entrega más un colchón de seguridad.',
          'El stock máximo suma a ese mínimo el lote de pedido habitual o lo que dicte tu política de compra.',
          'Ambos dependen de la demanda prevista, así que cambian con la estacionalidad.',
        ],
      },
      {
        type: 'quote',
        text: 'Un stock mínimo fijo es cómodo en febrero y peligroso en diciembre. El umbral correcto se mueve con la demanda.',
      },
      {
        type: 'h2',
        text: 'El error de dejarlos quietos',
      },
      {
        type: 'p',
        text: 'El fallo más común es fijar estos niveles una vez y olvidarse. La demanda no es constante, y un mínimo que sobra en temporada baja se queda corto en plena campaña. Para que cumplan su función, el mínimo y el máximo deben recalcularse a medida que cambia la previsión de cada producto.',
      },
      {
        type: 'p',
        text: 'Star4cast proyecta la demanda de cada referencia y su plazo de entrega, de modo que esos umbrales dejen de ser una raya fija en la pared y se conviertan en una banda que respira con tu negocio, anticipándose a las campañas y relajándose cuando la demanda baja.',
      },
    ],
  },
  {
    slug: 'nivel-de-servicio-como-fijarlo',
    title: 'Nivel de servicio: cuánta disponibilidad necesitas de verdad',
    excerpt:
      'Aspirar al 100 % de disponibilidad suena bien y arruina la caja. Te explicamos qué es el nivel de servicio y cómo fijarlo producto a producto.',
    description:
      'Qué es el nivel de servicio en gestión de inventario, cómo se relaciona con el stock de seguridad y por qué conviene fijarlo distinto para cada referencia.',
    keywords:
      'nivel de servicio, disponibilidad de stock, stock de seguridad, fill rate, gestión de inventario',
    category: 'Operaciones',
    tags: ['Nivel de servicio', 'Disponibilidad', 'Inventario'],
    date: '2026-07-24',
    readingTime: '5 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'El nivel de servicio es la probabilidad de poder atender la demanda sin quedarte sin stock. Suena a algo que querrías al máximo, pero ahí está la trampa: perseguir el 100 % de disponibilidad para todo el catálogo es una de las formas más rápidas de inmovilizar capital sin sentido.',
      },
      {
        type: 'h2',
        text: 'Por qué el 100 % es un mal objetivo',
      },
      {
        type: 'p',
        text: 'La relación entre nivel de servicio y stock de seguridad no es lineal: es una curva que se dispara al final. Subir del 90 % al 95 % cuesta un poco más de stock; subir del 98 % al 99,9 % puede multiplicar el colchón necesario. Los últimos puntos de disponibilidad son carísimos, y rara vez compensan en todas las referencias.',
      },
      {
        type: 'quote',
        text: 'El último punto de disponibilidad es siempre el más caro. La pregunta no es si quieres estar disponible, sino cuánto estás dispuesto a pagar por ese extra.',
      },
      {
        type: 'h2',
        text: 'Un nivel para cada referencia',
      },
      {
        type: 'p',
        text: 'La solución no es elegir un número único, sino segmentar. Tus productos estrella, los que pagan las facturas y cuya rotura ahuyenta clientes, justifican un nivel de servicio alto. La cola larga, en cambio, puede operar con mucha menos disponibilidad sin que el negocio lo note.',
      },
      {
        type: 'ul',
        items: [
          'Productos clase A: nivel de servicio alto, porque cada rotura duele.',
          'Productos clase B: un nivel intermedio, equilibrando coste y disponibilidad.',
          'Productos clase C: niveles más bajos; no merece la pena sobreprotegerlos.',
        ],
      },
      {
        type: 'p',
        text: 'Una vez decides el nivel de servicio de cada grupo, el stock de seguridad se deduce de él y de la incertidumbre de la demanda. Star4cast mide esa incertidumbre por producto con su banda de confianza, de modo que traduzcas el nivel de servicio que quieres en el colchón exacto que necesitas, ni más ni menos.',
      },
    ],
  },
  {
    slug: 'cantidad-economica-de-pedido-eoq',
    title: 'Cantidad económica de pedido (EOQ): cuánto comprar en cada pedido',
    excerpt:
      'Pedir mucho de golpe ahorra en pedidos pero infla el almacén. El EOQ busca el punto medio. Te explicamos qué es y cuándo aplicarlo con cabeza.',
    description:
      'Qué es la cantidad económica de pedido (EOQ), cómo equilibra el coste de pedir y el de almacenar, cómo se calcula y cuáles son sus límites en la práctica.',
    keywords:
      'cantidad económica de pedido, EOQ, lote económico, coste de pedido, coste de almacenamiento',
    category: 'Operaciones',
    tags: ['EOQ', 'Lote de compra', 'Costes'],
    date: '2026-07-17',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Cada vez que repones un producto te enfrentas a la misma pregunta: cuánto pedir. Pedir mucho de una vez reduce el número de pedidos y suele dar mejores condiciones, pero llena el almacén. Pedir poco y a menudo mantiene el stock bajo, pero dispara los costes de gestionar tantos pedidos. La cantidad económica de pedido busca ese equilibrio.',
      },
      {
        type: 'h2',
        text: 'La intuición detrás del EOQ',
      },
      {
        type: 'p',
        text: 'El EOQ parte de dos costes que tiran en direcciones opuestas. Por un lado, el coste de hacer cada pedido (gestión, transporte, recepción), que baja cuanto más grande es el lote. Por otro, el coste de almacenar, que sube con el tamaño del pedido. El EOQ es el tamaño de lote en el que la suma de ambos es mínima.',
      },
      {
        type: 'quote',
        text: 'El lote óptimo no es el más grande ni el más pequeño, sino aquel en el que lo que ahorras pidiendo menos veces se iguala con lo que cuesta almacenar más.',
      },
      {
        type: 'h2',
        text: 'Qué necesitas para calcularlo',
      },
      {
        type: 'ul',
        items: [
          'La demanda anual estimada del producto.',
          'El coste de realizar un pedido, con todo lo que implica.',
          'El coste de mantener una unidad en almacén durante un año.',
        ],
      },
      {
        type: 'h2',
        text: 'Sus límites en el mundo real',
      },
      {
        type: 'p',
        text: 'El EOQ es una guía valiosa, pero parte de supuestos que no siempre se cumplen: demanda estable, costes constantes y sin descuentos por volumen ni mínimos de pedido. En la práctica conviene tomarlo como punto de partida y ajustarlo a las condiciones reales de cada proveedor y a la estacionalidad del producto.',
      },
      {
        type: 'p',
        text: 'Sobre todo, el EOQ es tan bueno como la demanda que le metas. Si tu estimación de ventas falla, el lote óptimo deja de serlo. Star4cast aporta esa previsión por producto, de modo que el cálculo del lote parta de una demanda fiable y no de una cifra anual sacada a ojo.',
      },
    ],
  },
  {
    slug: 'rotacion-de-inventario-como-mejorarla',
    title: 'Rotación de inventario: qué es, cómo se calcula y cómo mejorarla',
    excerpt:
      'Es el pulso de tu almacén: cuántas veces vendes y repones tu stock. Te explicamos cómo medir la rotación de inventario y las palancas para subirla.',
    description:
      'Qué es la rotación de inventario, cómo se calcula, qué valor es bueno según el sector y cómo mejorarla sin provocar roturas para liberar caja y ganar eficiencia.',
    keywords:
      'rotación de inventario, índice de rotación, rotación de stock, días de inventario, gestión de inventario',
    category: 'Operaciones',
    tags: ['Rotación', 'KPIs', 'Inventario'],
    date: '2026-07-10',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'La rotación de inventario es uno de esos indicadores que dicen mucho con un solo número. Mide cuántas veces, en un periodo, vendes y repones tu stock medio. Una rotación sana significa que el producto entra y sale con agilidad; una baja, que tienes dinero dormido en las estanterías.',
      },
      {
        type: 'h2',
        text: 'Cómo se calcula',
      },
      {
        type: 'p',
        text: 'La fórmula habitual divide el coste de las ventas de un periodo entre el inventario medio de ese mismo periodo. Si el resultado es seis, significa que has renovado tu stock seis veces; dicho de otro modo, cada producto pasa de media unos dos meses en el almacén antes de venderse. A más rotación, menos tiempo parado el capital.',
      },
      {
        type: 'h2',
        text: 'Ni muy baja ni demasiado alta',
      },
      {
        type: 'p',
        text: 'Una rotación baja avisa de exceso de stock, productos que no se mueven o compras mal dimensionadas. Pero una rotación demasiado alta tampoco es necesariamente buena: puede significar que vas justo de stock y rozas la rotura constantemente. El objetivo es una rotación alta sostenible, sin sacrificar la disponibilidad.',
      },
      {
        type: 'quote',
        text: 'La rotación no se mejora a base de quedarte sin stock, sino vendiendo el inventario correcto más rápido. La diferencia la marca la previsión.',
      },
      {
        type: 'h2',
        text: 'Palancas para mejorarla',
      },
      {
        type: 'ul',
        items: [
          'Reduce el inventario muerto y los productos de rotación nula.',
          'Ajusta el stock de seguridad a la incertidumbre real de cada referencia.',
          'Mejora la previsión para comprar lo necesario y evitar la acumulación.',
          'Segmenta con un análisis ABC y trata cada clase según su peso.',
        ],
      },
      {
        type: 'p',
        text: 'La mayoría de estas palancas tienen un denominador común: comprar mejor, y eso empieza por prever mejor. Star4cast te da una previsión por producto que permite ajustar las compras a la demanda real, subiendo la rotación sin que la mejora se pague con roturas.',
      },
    ],
  },
  {
    slug: 'como-calcular-el-punto-de-pedido',
    title: 'Cómo calcular el punto de pedido (y por qué no debería ser fijo)',
    excerpt:
      'El punto de pedido decide cuándo lanzar la reposición. Te explicamos la fórmula, los datos que necesitas y por qué un umbral fijo te juega malas pasadas.',
    description:
      'Cómo calcular el punto de pedido: demanda durante el plazo de entrega más stock de seguridad. Fórmula, ejemplo y por qué debe ser dinámico con la estacionalidad.',
    keywords:
      'punto de pedido, cómo calcular el punto de pedido, ROP, plazo de entrega, stock de seguridad',
    category: 'Operaciones',
    tags: ['Punto de pedido', 'Reposición', 'Inventario'],
    date: '2026-07-03',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'El punto de pedido responde a una de las preguntas más prácticas de la gestión de inventario: cuándo lanzar la reposición de un producto. Fijarlo bien evita tanto la rotura, por pedir tarde, como el exceso, por pedir demasiado pronto. Y, aunque suena técnico, la idea es muy intuitiva.',
      },
      {
        type: 'h2',
        text: 'La fórmula, en lenguaje claro',
      },
      {
        type: 'p',
        text: 'El punto de pedido es la cantidad de stock que necesitas para aguantar hasta que llegue la reposición, más un colchón por si algo se tuerce. Es decir: la demanda esperada durante el plazo de entrega, sumada al stock de seguridad. Cuando el stock disponible baja de ese nivel, toca pedir.',
      },
      {
        type: 'ul',
        items: [
          'Demanda durante el plazo de entrega: cuánto vendes mientras esperas el pedido.',
          'Stock de seguridad: el colchón que cubre la variabilidad de la demanda y del plazo.',
          'La suma de ambos es tu punto de pedido.',
        ],
      },
      {
        type: 'h2',
        text: 'Un ejemplo sencillo',
      },
      {
        type: 'p',
        text: 'Si vendes 10 unidades al día y tu proveedor tarda 7 días en servir, durante el plazo de entrega venderás unas 70 unidades. Si además mantienes un colchón de 30 por seguridad, tu punto de pedido es 100: cuando el stock baje de 100, lanzas el pedido para que llegue antes de quedarte sin nada.',
      },
      {
        type: 'quote',
        text: 'El punto de pedido no es un número que se fija una vez: es una consecuencia de la demanda y del plazo, y ambos cambian con el tiempo.',
      },
      {
        type: 'h2',
        text: 'Por qué no debería ser fijo',
      },
      {
        type: 'p',
        text: 'El error más extendido es calcular el punto de pedido una vez y dejarlo congelado. Pero si tu demanda es estacional, el mismo umbral que sobra en temporada baja se queda corto en campaña. Un punto de pedido que no se mueve con la demanda es una rotura esperando el momento de aparecer.',
      },
      {
        type: 'p',
        text: 'Star4cast recalcula la demanda esperada de cada producto y tiene en cuenta el plazo de entrega de cada proveedor, de modo que el punto de pedido deje de ser una raya fija y se ajuste solo, anticipándose a las campañas en lugar de ir siempre por detrás.',
      },
    ],
  },
  {
    slug: 'series-temporales-explicado-para-no-tecnicos',
    title: 'Series temporales explicadas para quien no es técnico',
    excerpt:
      'Tendencia, estacionalidad y ruido: detrás de cualquier previsión hay tres ideas sencillas. Te las contamos sin jerga para que entiendas qué hace un modelo.',
    description:
      'Qué es una serie temporal y cómo se descompone en tendencia, estacionalidad y ruido. Una introducción clara a la base de cualquier previsión de demanda.',
    keywords:
      'series temporales, qué es una serie temporal, tendencia y estacionalidad, previsión de demanda, forecasting',
    category: 'Guías',
    tags: ['Series temporales', 'Conceptos', 'Forecasting'],
    date: '2026-06-26',
    readingTime: '6 min',
    author: 'Equipo Star4cast',
    authorRole: 'Producto y datos',
    body: [
      {
        type: 'p',
        text: 'Detrás de toda previsión de demanda hay un concepto que suena más complicado de lo que es: la serie temporal. Si entiendes esta idea, entenderás de dónde salen las predicciones y, sobre todo, por qué a veces aciertan y a veces no. Y no necesitas saber matemáticas para captarla.',
      },
      {
        type: 'h2',
        text: 'Qué es una serie temporal',
      },
      {
        type: 'p',
        text: 'Una serie temporal no es más que una secuencia de datos ordenados en el tiempo: las ventas diarias de un producto, los pedidos semanales de una referencia, las visitas mensuales a una tienda. El orden importa, porque lo que pasó ayer ayuda a explicar lo que pasará mañana.',
      },
      {
        type: 'h2',
        text: 'Las tres piezas que la forman',
      },
      {
        type: 'p',
        text: 'Casi cualquier serie de demanda puede descomponerse en tres componentes. Separarlos es justo lo que hace un modelo de previsión para entender el pasado y proyectar el futuro.',
      },
      {
        type: 'ul',
        items: [
          'Tendencia: la dirección de fondo, si las ventas crecen, caen o se mantienen a lo largo del tiempo.',
          'Estacionalidad: los patrones que se repiten con regularidad, como el pico de cada diciembre o las ventas de los fines de semana.',
          'Ruido: las variaciones aleatorias que no responden a ningún patrón y que ningún modelo puede predecir.',
        ],
      },
      {
        type: 'quote',
        text: 'Prever bien consiste en separar la señal del ruido: aprender de la tendencia y la estacionalidad sin intentar adivinar lo que es puro azar.',
      },
      {
        type: 'h2',
        text: 'Por qué esta distinción importa',
      },
      {
        type: 'p',
        text: 'Entender estas tres piezas explica muchas cosas. Por ejemplo, por qué un buen modelo no intenta clavar cada día exacto (eso sería predecir el ruido), sino capturar la tendencia y la estación. O por qué un producto muy errático es más difícil de prever: en su serie pesa más el ruido que la señal.',
      },
      {
        type: 'p',
        text: 'Star4cast trabaja exactamente sobre esta lógica: analiza la serie de cada producto, identifica su tendencia y su estacionalidad y proyecta el futuro con una banda de confianza que reconoce, con honestidad, la parte que es ruido y no se puede predecir. Así sabes no solo qué esperar, sino con cuánta certeza.',
      },
    ],
  },
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

/** Fecha de referencia (hoy) en formato YYYY-MM-DD, para comparar con post.date. */
function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Un artículo se considera publicado cuando su fecha es hoy o anterior. Los posts
 * con fecha futura existen en el repo pero permanecen ocultos hasta que les toca:
 * un rebuild semanal del sitio (cron en la VPS) los va destapando uno a uno.
 * La comparación de cadenas YYYY-MM-DD es equivalente a la cronológica.
 */
export function isPublished(post: BlogPostMeta, ref: string = todayIso()): boolean {
  return post.date <= ref;
}

/** Artículos publicados (fecha <= hoy), del más reciente al más antiguo. */
export function publishedPosts(ref: string = todayIso()): readonly BlogPostMeta[] {
  return BLOG_POSTS.filter((p) => isPublished(p, ref))
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Devuelve un post solo si existe y ya está publicado; si no, undefined. */
export function findPost(slug: string): BlogPostMeta | undefined {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  return post && isPublished(post) ? post : undefined;
}

/** Categorías únicas presentes en los artículos publicados, para filtrar en el listado. */
export function blogCategories(): readonly string[] {
  return [...new Set(publishedPosts().map((p) => p.category))];
}
