export interface LegalSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

export interface LegalDoc {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly updated: string;
  readonly intro: string;
  readonly sections: readonly LegalSection[];
}

// NOTA: estos textos NO sustituyen el asesoramiento de un profesional.
// Datos identificativos del titular, los mismos que publica invoicedata.es.

const COMPANY = 'Anuar Iz.';
const TRADE_NAME = 'ZaralTech - Star4cast';
const NIF = '54311627W';
const ADDRESS = '50002, Aragón, España';
const EMAIL = 'hola@star4cast.es';

export const LEGAL_DOCS: Record<'privacy' | 'terms' | 'cookies', LegalDoc> = {
  privacy: {
    title: 'Política de privacidad',
    description:
      'Política de privacidad de Star4cast: qué datos tratamos, con qué finalidad y base legal, cuánto tiempo los conservamos y cuáles son tus derechos.',
    path: '/privacy',
    updated: '2026-10-25',
    intro:
      'En Star4cast nos tomamos en serio la privacidad. Esta política explica, de forma clara, qué datos personales tratamos cuando usas nuestro sitio web y nuestra plataforma, con qué finalidad y base legal, con quién los compartimos y qué derechos tienes sobre ellos, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).',
    sections: [
      {
        heading: '1. Responsable del tratamiento',
        paragraphs: [
          `Responsable: ${COMPANY}, con nombre comercial ${TRADE_NAME} (en adelante, «Star4cast»), NIF ${NIF} y domicilio en ${ADDRESS}.`,
          `Para cualquier cuestión relacionada con tus datos personales puedes escribirnos a ${EMAIL}.`,
        ],
      },
      {
        heading: '2. Datos que tratamos',
        paragraphs: [
          'Datos de contacto que nos facilitas voluntariamente a través de formularios: nombre, correo electrónico, empresa y el contenido de tu mensaje.',
          'Datos de cuenta y de uso de la plataforma cuando te registras o usas el servicio: credenciales, configuración y registros técnicos de actividad.',
          'Datos de facturación, cuando contratas un plan de pago: los necesarios para emitir las facturas y gestionar tu suscripción. Star4cast no almacena los datos de tu tarjeta.',
          'Datos de inventario que cargas para generar predicciones. Los tratamos exclusivamente para prestarte el servicio; no los vendemos ni los usamos con fines ajenos.',
        ],
      },
      {
        heading: '3. Finalidades y base legal',
        paragraphs: [
          'Atender tus solicitudes y consultas (base legal: tu consentimiento y/o medidas precontractuales).',
          'Prestar, mantener y mejorar el servicio, así como gestionar tu cuenta y la facturación (base legal: ejecución del contrato).',
          'Cumplir con nuestras obligaciones legales, por ejemplo en materia fiscal y contable (base legal: obligación legal).',
          'Garantizar la seguridad de la plataforma y prevenir usos fraudulentos (base legal: interés legítimo).',
        ],
      },
      {
        heading: '4. Destinatarios y encargados del tratamiento',
        paragraphs: [
          'No vendemos tus datos ni los cedemos a terceros con fines comerciales.',
          'Para prestar el servicio nos apoyamos en proveedores que actúan como encargados del tratamiento bajo contrato (por ejemplo: alojamiento e infraestructura, pasarela de pago, envío de correo y soporte). Solo acceden a los datos necesarios y conforme a nuestras instrucciones.',
          'Podremos comunicar datos a autoridades competentes cuando exista una obligación legal de hacerlo.',
        ],
      },
      {
        heading: '5. Transferencias internacionales',
        paragraphs: [
          'Si alguno de nuestros proveedores trata datos fuera del Espacio Económico Europeo, nos aseguramos de que existan garantías adecuadas (decisión de adecuación o cláusulas contractuales tipo de la Comisión Europea). Puedes solicitarnos más información en cualquier momento.',
        ],
      },
      {
        heading: '6. Conservación',
        paragraphs: [
          'Conservamos tus datos mientras mantengas una relación con nosotros y, una vez finalizada, durante los plazos legalmente exigidos (por ejemplo, los fiscales y mercantiles). Cuando dejan de ser necesarios, los suprimimos o anonimizamos de forma segura.',
        ],
      },
      {
        heading: '7. Cookies y tecnologías similares',
        paragraphs: [
          'Utilizamos únicamente almacenamiento técnico esencial para el funcionamiento de la plataforma. No empleamos cookies de publicidad ni de seguimiento de terceros. Encontrarás el detalle en nuestra Política de cookies (/cookies) y puedes revisar tu elección en cualquier momento desde «Configurar cookies», en el pie de página.',
          'Las tipografías, imágenes y demás recursos del sitio se sirven desde nuestro propio servidor: al navegar por Star4cast no se envían datos a terceros.',
        ],
      },
      {
        heading: '8. Seguridad',
        paragraphs: [
          'Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos: las comunicaciones viajan cifradas (HTTPS), las contraseñas se guardan cifradas mediante hash y nunca en claro, el acceso a los datos está limitado por roles dentro de cada organización y realizamos copias de seguridad periódicas de la base de datos. Ningún sistema es invulnerable, pero trabajamos para minimizar los riesgos.',
        ],
      },
      {
        heading: '9. Tus derechos',
        paragraphs: [
          `Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiéndonos a ${EMAIL}, indicando el derecho que deseas ejercer.`,
          'Si consideras que no hemos atendido correctamente tu solicitud, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).',
        ],
      },
      {
        heading: '10. Menores de edad',
        paragraphs: [
          'El servicio está dirigido a empresas y profesionales. No está destinado a menores de edad y no recogemos conscientemente sus datos.',
        ],
      },
      {
        heading: '11. Cambios en esta política',
        paragraphs: [
          'Podemos actualizar esta política para reflejar cambios legales o de producto. Publicaremos siempre la versión vigente en esta página, indicando la fecha de la última actualización.',
        ],
      },
    ],
  },
  terms: {
    title: 'Términos y condiciones',
    description:
      'Términos y condiciones de uso de Star4cast: identificación, objeto, naturaleza de las predicciones, suscripción, disponibilidad, limitación de responsabilidad y ley aplicable.',
    path: '/terms',
    updated: '2026-10-25',
    intro:
      'Estos términos y condiciones regulan el acceso y uso del sitio web y la plataforma de Star4cast. Al utilizar nuestros servicios aceptas estas condiciones, por lo que te recomendamos leerlas con atención.',
    sections: [
      {
        heading: '1. Identificación (aviso legal)',
        paragraphs: [
          `Titular: ${COMPANY}; nombre comercial: ${TRADE_NAME}; NIF: ${NIF}; domicilio: ${ADDRESS}; contacto: ${EMAIL}.`,
          'Esta información se facilita en cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).',
        ],
      },
      {
        heading: '2. Objeto del servicio',
        paragraphs: [
          'Star4cast es una plataforma de predicción de stock que estima niveles de inventario futuros a partir del histórico que proporciona el usuario, mediante modelos estadísticos y de series temporales.',
          'El servicio está dirigido exclusivamente a empresas y profesionales que lo contratan en el marco de su actividad empresarial o profesional, y no a consumidores.',
        ],
      },
      {
        heading: '3. Naturaleza de las predicciones',
        paragraphs: [
          'Las predicciones, bandas de confianza, fechas estimadas de rotura, coberturas y sugerencias de reposición son estimaciones probabilísticas: pueden no ser exactas y la demanda real puede diferir de ellas, incluso de forma significativa.',
          'Su fiabilidad depende de la calidad, integridad y actualización de los datos que cargas, así como de factores externos imprevisibles (cambios de mercado, promociones, roturas de proveedor, estacionalidades atípicas, etc.). Star4cast no garantiza ningún nivel concreto de precisión ni de resultados económicos.',
          'Las predicciones son una herramienta de apoyo y no sustituyen tu propio criterio profesional. Las decisiones de compra, producción, precios o gestión de inventario son siempre tuyas, y te corresponde revisar y validar la información antes de actuar.',
        ],
      },
      {
        heading: '4. Registro y cuenta',
        paragraphs: [
          'Para usar la plataforma debes crear una cuenta y facilitar información veraz y actualizada. Eres responsable de mantener la confidencialidad de tus credenciales y de toda la actividad realizada bajo tu cuenta.',
          'Notifícanos de inmediato cualquier uso no autorizado o brecha de seguridad de la que tengas conocimiento.',
        ],
      },
      {
        heading: '5. Prueba, suscripción y pagos',
        paragraphs: [
          'Ofrecemos un periodo de prueba de 14 días. Si al finalizar la prueba no contratas un plan, el acceso se limita o suspende sin coste alguno.',
          'Los planes de pago se facturan de forma periódica y por adelantado según la modalidad contratada. Salvo cancelación, la suscripción se renueva automáticamente por periodos equivalentes.',
          'Los precios se muestran, salvo indicación en contrario, sin impuestos, que se añadirán cuando corresponda. Puedes cancelar la renovación en cualquier momento; la cancelación surte efecto al final del periodo de facturación en curso y no da derecho a reembolso de periodos ya iniciados, salvo que la ley disponga otra cosa.',
        ],
      },
      {
        heading: '6. Cambios de precio',
        paragraphs: [
          'Podemos modificar los precios de los planes. Te informaremos con antelación razonable y los cambios se aplicarán a partir del siguiente periodo de renovación.',
        ],
      },
      {
        heading: '7. Uso aceptable',
        paragraphs: [
          'Te comprometes a utilizar el servicio conforme a la ley y a no realizar un uso que pueda dañar, sobrecargar o deteriorar la plataforma, acceder a ella por medios no autorizados, ni vulnerar derechos de terceros.',
        ],
      },
      {
        heading: '8. Propiedad intelectual y datos del cliente',
        paragraphs: [
          'El software, la marca, el diseño y los contenidos de Star4cast son propiedad de Star4cast o de sus licenciantes y están protegidos por la normativa de propiedad intelectual e industrial.',
          'Los datos de inventario que cargas siguen siendo tuyos en todo momento. Nos concedes una licencia limitada para tratarlos con el único fin de prestarte el servicio.',
          'Eres responsable de la exactitud, legalidad y calidad de los datos que cargas y de conservar tus propias copias de ellos. Star4cast realiza copias de seguridad periódicas, pero no actúa como sistema de archivo ni de respaldo de tu información.',
        ],
      },
      {
        heading: '9. Disponibilidad y fallos del servicio',
        paragraphs: [
          'Trabajamos para ofrecer una alta disponibilidad, pero no garantizamos que el servicio funcione de forma ininterrumpida ni libre de errores. Puede sufrir interrupciones, retrasos, errores de cálculo, fallos en la importación de datos o pérdidas de información por mantenimiento, actualizaciones, incidencias técnicas o causas ajenas a nuestro control, incluidos los fallos de proveedores de alojamiento, comunicaciones o pago.',
          'Ante una incidencia, nos comprometemos a actuar con diligencia razonable para restablecer el servicio. Los compromisos de nivel de servicio (SLA) aplican únicamente cuando se pacten expresamente por escrito, por ejemplo en el plan Empresa, y en ese caso las compensaciones previstas en el SLA serán el único remedio por indisponibilidad.',
        ],
      },
      {
        heading: '10. Limitación de responsabilidad',
        paragraphs: [
          'El servicio se presta «tal cual» y «según disponibilidad», sin garantías de ningún tipo más allá de las expresamente recogidas en estas condiciones o exigidas por la ley.',
          'En la medida máxima permitida por la ley, Star4cast no será responsable de: (a) las decisiones de compra, producción, precios o gestión que tomes basándote en las predicciones o en cualquier otra información del servicio; (b) roturas de stock, excesos de inventario, mermas, ventas perdidas o pedidos incorrectos; (c) daños derivados de interrupciones, errores o fallos del servicio, o de la pérdida o corrupción de datos; (d) daños indirectos, lucro cesante, pérdida de negocio, de clientes o de reputación.',
          'En cualquier caso, la responsabilidad total de Star4cast frente a ti por cualquier causa relacionada con el servicio quedará limitada al importe efectivamente pagado por ti en los doce (12) meses anteriores al hecho que origine la reclamación. Durante el periodo de prueba gratuito, el servicio se ofrece sin responsabilidad alguna en la medida permitida por la ley.',
          'Nada de lo dispuesto en estas condiciones excluye ni limita la responsabilidad que no pueda excluirse o limitarse legalmente, como la derivada de dolo o culpa grave.',
        ],
      },
      {
        heading: '11. Fuerza mayor',
        paragraphs: [
          'Star4cast no será responsable de ningún incumplimiento o retraso causado por circunstancias fuera de su control razonable, como desastres naturales, cortes de suministro eléctrico o de telecomunicaciones, fallos de proveedores de infraestructura, ciberataques, conflictos laborales o actos de autoridades.',
        ],
      },
      {
        heading: '12. Suspensión y terminación',
        paragraphs: [
          'Podemos suspender o cancelar el acceso en caso de incumplimiento de estos términos o de impago. Puedes dar de baja tu cuenta en cualquier momento desde la plataforma o solicitándolo por correo.',
        ],
      },
      {
        heading: '13. Protección de datos',
        paragraphs: [
          'El tratamiento de datos personales se rige por nuestra Política de privacidad, que forma parte de estas condiciones.',
        ],
      },
      {
        heading: '14. Ley aplicable y jurisdicción',
        paragraphs: [
          'Estas condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten, con renuncia expresa a cualquier otro fuero, a los juzgados y tribunales de Zaragoza (España).',
        ],
      },
      {
        heading: '15. Modificaciones',
        paragraphs: [
          'Podemos modificar estos términos en cualquier momento. La versión vigente estará siempre publicada en esta página. El uso continuado del servicio tras un cambio implica la aceptación de los nuevos términos.',
        ],
      },
    ],
  },
  cookies: {
    title: 'Política de cookies',
    description:
      'Política de cookies de Star4cast: qué cookies y tecnologías de almacenamiento usamos, para qué, cuánto duran y cómo gestionar tus preferencias.',
    path: '/cookies',
    updated: '2026-10-25',
    intro:
      'En esta política te explicamos qué son las cookies, cuáles utiliza Star4cast, con qué finalidad y cómo puedes gestionarlas. La redactamos conforme al artículo 22.2 de la LSSI-CE y a la Guía sobre el uso de las cookies de la Agencia Española de Protección de Datos.',
    sections: [
      {
        heading: '1. ¿Qué son las cookies?',
        paragraphs: [
          'Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar información sobre tu visita. Tecnologías similares, como el almacenamiento local del navegador (localStorage), cumplen la misma función y se rigen por las mismas normas, por lo que en esta política nos referimos a todas ellas como «cookies».',
        ],
      },
      {
        heading: '2. Responsable',
        paragraphs: [
          `El responsable de las cookies propias de este sitio es ${COMPANY} (${TRADE_NAME}), con NIF ${NIF} y domicilio en ${ADDRESS}. Puedes contactarnos en ${EMAIL}.`,
        ],
      },
      {
        heading: '3. Cookies técnicas (siempre activas)',
        paragraphs: [
          'Son imprescindibles para que el sitio funcione y para prestarte el servicio que solicitas, por lo que están exentas de consentimiento. Todas son propias: ningún tercero accede a ellas.',
          's4c.consent — Guarda tu elección sobre cookies para no volver a preguntarte. Duración: 12 meses.',
          's4c.token — Mantiene tu sesión iniciada en el área de clientes. Duración: hasta que cierras sesión.',
          's4c.user — Recuerda los datos básicos de tu perfil (nombre, correo, empresa y rol) para mostrarlos en el área de clientes. Duración: hasta que cierras sesión.',
        ],
      },
      {
        heading: '4. Cookies analíticas (opcionales)',
        paragraphs: [
          'Servirían para medir de forma agregada cómo se usa el sitio y así mejorarlo. Actualmente no utilizamos ninguna herramienta analítica ni cookies de este tipo.',
          'Si en el futuro las incorporamos, solo se activarán con tu consentimiento previo, las detallaremos en esta política y te volveremos a pedir tu elección.',
        ],
      },
      {
        heading: '5. Cookies de terceros, publicidad y redes sociales',
        paragraphs: [
          'No utilizamos cookies publicitarias, de seguimiento ni de redes sociales. Las tipografías, imágenes y demás recursos del sitio se sirven desde nuestro propio servidor, de modo que al navegar por Star4cast no se instalan cookies de terceros.',
        ],
      },
      {
        heading: '6. Cómo gestionar tus preferencias',
        paragraphs: [
          'La primera vez que visitas el sitio te mostramos un aviso para que aceptes, rechaces o configures las cookies opcionales. Puedes cambiar tu elección en cualquier momento desde el enlace «Configurar cookies» del pie de página; retirar el consentimiento es tan sencillo como darlo.',
          'También puedes bloquear o eliminar las cookies desde la configuración de tu navegador (Chrome, Firefox, Safari, Edge…). Ten en cuenta que, si bloqueas las técnicas, es posible que no puedas iniciar sesión en el área de clientes.',
        ],
      },
      {
        heading: '7. Más información',
        paragraphs: [
          'Para saber cómo tratamos tus datos personales y cómo ejercer tus derechos, consulta nuestra Política de privacidad (/privacy).',
        ],
      },
      {
        heading: '8. Cambios en esta política',
        paragraphs: [
          'Podemos actualizar esta política si cambian las cookies que utilizamos o la normativa aplicable. Publicaremos siempre la versión vigente en esta página, con la fecha de la última actualización, y si los cambios afectan a cookies opcionales te pediremos de nuevo tu consentimiento.',
        ],
      },
    ],
  },
};
