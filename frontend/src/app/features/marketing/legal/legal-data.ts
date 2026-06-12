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

// NOTA: estos textos son una base sólida y bien redactada, pero NO sustituyen el
// asesoramiento de un profesional. Completa los datos identificativos entre
// corchetes ([Razón social], [NIF], etc.) y revísalos con un abogado antes de publicar.

const COMPANY = '[Razón social]';
const NIF = '[NIF/CIF]';
const ADDRESS = '[Dirección completa], Madrid, España';
const EMAIL = 'hola@star4cast.app';

export const LEGAL_DOCS: Record<'privacy' | 'terms', LegalDoc> = {
  privacy: {
    title: 'Política de privacidad',
    description:
      'Política de privacidad de Star4cast: qué datos tratamos, con qué finalidad y base legal, durante cuánto tiempo, con quién los compartimos y cuáles son tus derechos.',
    path: '/privacy',
    updated: '2026-06-07',
    intro:
      'En Star4cast nos tomamos en serio la privacidad. Esta política explica, de forma clara, qué datos personales tratamos cuando usas nuestro sitio web y nuestra plataforma, con qué finalidad y base legal, con quién los compartimos y qué derechos tienes sobre ellos, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).',
    sections: [
      {
        heading: '1. Responsable del tratamiento',
        paragraphs: [
          `Responsable: ${COMPANY} (en adelante, «Star4cast»), con NIF ${NIF} y domicilio en ${ADDRESS}.`,
          `Para cualquier cuestión relacionada con tus datos personales puedes escribirnos a ${EMAIL}.`,
        ],
      },
      {
        heading: '2. Datos que tratamos',
        paragraphs: [
          'Datos de contacto que nos facilitas voluntariamente a través de formularios: nombre, correo electrónico, empresa y el contenido de tu mensaje.',
          'Datos de cuenta y de uso de la plataforma cuando te registras o usas el servicio: credenciales, configuración y registros técnicos de actividad.',
          'Datos de facturación necesarios para gestionar tu suscripción. El pago se procesa a través de una pasarela externa; Star4cast no almacena los datos completos de tu tarjeta.',
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
          'Utilizamos únicamente almacenamiento técnico esencial para el funcionamiento de la plataforma. No empleamos cookies de publicidad ni de seguimiento de terceros.',
          'Nuestro sitio carga tipografías web desde un proveedor externo; al servirlas, dicho proveedor puede recibir tu dirección IP. Puedes consultarnos esta cuestión si deseas más detalle.',
        ],
      },
      {
        heading: '8. Seguridad',
        paragraphs: [
          'Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos, incluyendo el cifrado en tránsito y en reposo, el control de accesos y copias de seguridad. Ningún sistema es invulnerable, pero trabajamos para minimizar los riesgos.',
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
      'Términos y condiciones de uso de Star4cast: identificación, objeto, suscripción y prueba, precios, propiedad intelectual, responsabilidad y ley aplicable.',
    path: '/terms',
    updated: '2026-06-07',
    intro:
      'Estos términos y condiciones regulan el acceso y uso del sitio web y la plataforma de Star4cast. Al utilizar nuestros servicios aceptas estas condiciones, por lo que te recomendamos leerlas con atención.',
    sections: [
      {
        heading: '1. Identificación (aviso legal)',
        paragraphs: [
          `Titular: ${COMPANY}. NIF: ${NIF}. Domicilio: ${ADDRESS}. Contacto: ${EMAIL}.`,
          'Esta información se facilita en cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).',
        ],
      },
      {
        heading: '2. Objeto del servicio',
        paragraphs: [
          'Star4cast es una plataforma de predicción de stock que estima niveles de inventario futuros a partir del histórico que proporciona el usuario, mediante modelos estadísticos y de series temporales.',
          'Las predicciones son estimaciones sujetas a un margen de incertidumbre y no constituyen una garantía de resultados ni una recomendación profesional de compra.',
        ],
      },
      {
        heading: '3. Registro y cuenta',
        paragraphs: [
          'Para usar la plataforma debes crear una cuenta y facilitar información veraz y actualizada. Eres responsable de mantener la confidencialidad de tus credenciales y de toda la actividad realizada bajo tu cuenta.',
          'Notifícanos de inmediato cualquier uso no autorizado o brecha de seguridad de la que tengas conocimiento.',
        ],
      },
      {
        heading: '4. Prueba, suscripción y pagos',
        paragraphs: [
          'Ofrecemos un periodo de prueba de 14 días. Si al finalizar la prueba no contratas un plan, el acceso se limita o suspende sin coste alguno.',
          'Los planes de pago se facturan de forma periódica y por adelantado según la modalidad contratada. Salvo cancelación, la suscripción se renueva automáticamente por periodos equivalentes.',
          'Los precios se muestran, salvo indicación en contrario, sin impuestos, que se añadirán cuando corresponda. Puedes cancelar la renovación en cualquier momento; la cancelación surte efecto al final del periodo de facturación en curso y no da derecho a reembolso de periodos ya iniciados, salvo que la ley disponga otra cosa.',
        ],
      },
      {
        heading: '5. Cambios de precio',
        paragraphs: [
          'Podemos modificar los precios de los planes. Te informaremos con antelación razonable y los cambios se aplicarán a partir del siguiente periodo de renovación.',
        ],
      },
      {
        heading: '6. Uso aceptable',
        paragraphs: [
          'Te comprometes a utilizar el servicio conforme a la ley y a no realizar un uso que pueda dañar, sobrecargar o deteriorar la plataforma, acceder a ella por medios no autorizados, ni vulnerar derechos de terceros.',
        ],
      },
      {
        heading: '7. Propiedad intelectual y datos del cliente',
        paragraphs: [
          'El software, la marca, el diseño y los contenidos de Star4cast son propiedad de Star4cast o de sus licenciantes y están protegidos por la normativa de propiedad intelectual e industrial.',
          'Los datos de inventario que cargas siguen siendo tuyos en todo momento. Nos concedes una licencia limitada para tratarlos con el único fin de prestarte el servicio.',
        ],
      },
      {
        heading: '8. Disponibilidad del servicio',
        paragraphs: [
          'Trabajamos para ofrecer una alta disponibilidad, pero el servicio puede sufrir interrupciones por mantenimiento, actualizaciones o causas ajenas a nuestro control. Los compromisos de nivel de servicio (SLA) aplican únicamente cuando se pacten expresamente, por ejemplo en el plan Empresa.',
        ],
      },
      {
        heading: '9. Limitación de responsabilidad',
        paragraphs: [
          'El servicio se presta «tal cual» y «según disponibilidad». En la medida en que lo permita la ley, Star4cast no será responsable de las decisiones de compra, producción o gestión que tomes basándote en las predicciones, que siempre conllevan un margen de incertidumbre, ni de daños indirectos o lucro cesante.',
        ],
      },
      {
        heading: '10. Suspensión y terminación',
        paragraphs: [
          'Podemos suspender o cancelar el acceso en caso de incumplimiento de estos términos o de impago. Puedes dar de baja tu cuenta en cualquier momento desde la plataforma o solicitándolo por correo.',
        ],
      },
      {
        heading: '11. Protección de datos',
        paragraphs: [
          'El tratamiento de datos personales se rige por nuestra Política de privacidad, que forma parte de estas condiciones.',
        ],
      },
      {
        heading: '12. Ley aplicable y jurisdicción',
        paragraphs: [
          'Estas condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los juzgados y tribunales que resulten competentes conforme a la normativa aplicable, respetando en todo caso los derechos que asisten a los consumidores.',
        ],
      },
      {
        heading: '13. Modificaciones',
        paragraphs: [
          'Podemos modificar estos términos en cualquier momento. La versión vigente estará siempre publicada en esta página. El uso continuado del servicio tras un cambio implica la aceptación de los nuevos términos.',
        ],
      },
    ],
  },
};
