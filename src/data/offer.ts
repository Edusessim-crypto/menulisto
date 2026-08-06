// Arquivo central de configuração da página de vendas.
// Todos os textos de preço, links de checkout, itens de oferta,
// depoimentos, FAQ e links legais devem ser editados APENAS aqui.

export interface OfferItem {
  label: string;
}

export interface Offer {
  id: "recetas" | "metodo";
  badge?: string;
  name: string;
  tagline: string;
  items: OfferItem[];
  highlight?: string;
  price: string;
  priceUsd: number;
  priceNote: string;
  ctaLabel: string;
  checkoutUrl: string;
  footnote?: string;
}

export const offers: Offer[] = [
  {
    id: "recetas",
    name: "30 Recetas para Bebés",
    tagline:
      "Ideal si solo necesitas nuevas ideas y prefieres organizar las comidas por tu cuenta.",
    items: [
      { label: "30 recetas prácticas" },
      { label: "Ingredientes y cantidades" },
      { label: "Preparación paso a paso" },
      { label: "Texturas sugeridas" },
      { label: "Indicaciones para servir" },
      { label: "Posibles sustituciones" },
      { label: "Acceso digital inmediato" },
    ],
    highlight: "Tú eliges qué receta preparar y cómo organizarla durante el mes.",
    price: "US$ 5",
    priceUsd: 5,
    priceNote: "Pago único",
    ctaLabel: "QUIERO LAS 30 RECETAS",
    checkoutUrl: "https://pay.hotmart.com/U107042966C?off=dn7n41es",
  },
  {
    id: "metodo",
    badge: "MÁS COMPLETO",
    name: "Método Menú Listo",
    tagline:
      "Ideal si quieres dejar de planificar todo sola y recibir los próximos 30 días organizados.",
    items: [
      { label: "Plan completo de 30 días" },
      { label: "4 menús semanales" },
      { label: "Comidas distribuidas por día" },
      { label: "Listas de compras semanales" },
      { label: "Sustituciones de ingredientes" },
      { label: "Guía de preparación y congelación" },
      { label: "Guía de cortes y texturas" },
      { label: "Planificador imprimible" },
      { label: "Recetas rápidas para días ocupados" },
      { label: "Biblioteca con cerca de 400 recetas" },
      { label: "Acceso digital inmediato" },
    ],
    highlight: "Todo organizado para que solo tengas que consultar y preparar.",
    price: "US$ 17",
    priceUsd: 17,
    priceNote: "Pago único",
    ctaLabel: "QUIERO EL MÉTODO COMPLETO",
    checkoutUrl: "https://pay.hotmart.com/U107042966C?off=8a5ez5v0",
  },
];

export const getOffer = (id: Offer["id"]) =>
  offers.find((offer) => offer.id === id)!;

// Popup de upsell — se muestra al hacer clic en cualquier CTA de la oferta
// de US$ 5, ofreciendo pasar al Método Menú Listo con un descuento puntual.
export const upsell = {
  priceUsd: 12,
  regularPriceUsd: 17,
  checkoutUrl: "https://pay.hotmart.com/U107042966C?off=6ncmlala",
  items: [
    "30 días de menús organizados",
    "Listas de compras semanales",
    "Guías de preparación y conservación",
    "Biblioteca de ~400 recetas",
  ],
};

// Persona — quien creó el material (Sección 4)
export const persona = {
  name: "Mariana Torres",
  photoUrl: "/images/persona-foto.webp",
  bioParagraphs: [
    "Soy Mariana Torres, mamá de Valentina.",
    "Cuando empecé con la alimentación complementaria, cada comida era una improvisación. Pasé meses investigando, probando y organizando hasta crear el sistema que uso hoy.",
    "Este plan es exactamente lo que me hubiera gustado tener desde el primer día.",
  ],
  // Dejar vacío ("") si no existe revisión profesional. Solo completar si es verdadero.
  reviewedBy: "",
};

// Depoimentos — conteúdo provisório claramente marcado para substituição.
// NÃO substituir por depoimentos inventados. Preencher apenas com relatos reais.
export interface Testimonial {
  name: string;
  country: string;
  quote: string;
  photoUrl?: string;
  verified?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    name: "{{TESTIMONIAL_1_NAME}}",
    country: "{{TESTIMONIAL_1_COUNTRY}}",
    quote: "{{TESTIMONIAL_1}}",
    verified: false,
  },
  {
    name: "{{TESTIMONIAL_2_NAME}}",
    country: "{{TESTIMONIAL_2_COUNTRY}}",
    quote: "{{TESTIMONIAL_2}}",
    verified: false,
  },
  {
    name: "{{TESTIMONIAL_3_NAME}}",
    country: "{{TESTIMONIAL_3_COUNTRY}}",
    quote: "{{TESTIMONIAL_3}}",
    verified: false,
  },
];

// Definir como true apenas quando os depoimentos reais forem inseridos.
export const hasRealTestimonials = false;

// Quebra de objeções (Seção 7)
export interface Objection {
  question: string;
  answer: string;
}

export const objections: Objection[] = [
  {
    question: "Pero encuentro recetas gratis en internet…",
    answer:
      "Recetas sueltas hay miles. Lo que no vas a encontrar gratis es un mes completo organizado con lista de compras y menús diarios.",
  },
  {
    question: "¿Y si mi bebé tiene alergias?",
    answer:
      "Cada receta indica alérgenos y ofrece sustituciones. Pero si tu bebé tiene una condición específica, siempre consultá primero con su pediatra.",
  },
  {
    question: "¿Esto reemplaza al pediatra?",
    answer:
      "No. Este es un material práctico y educativo. Siempre seguí las indicaciones del profesional de salud de tu bebé.",
  },
  {
    question: "¿Funciona si mi bebé recién está empezando?",
    answer:
      "Sí. Las recetas indican la fase y la textura sugerida, para que puedas adaptar cada comida al momento de tu bebé.",
  },
];

// FAQ (Seção 8) — máximo 5 preguntas, sin repetir lo ya cubierto en objeciones.
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "¿Para qué edades sirve?",
    answer:
      "El material está pensado para bebés que están comenzando o ya están en pleno proceso de alimentación complementaria. Cada receta indica la fase sugerida.",
  },
  {
    question: "¿Cómo recibo el material?",
    answer:
      "Después de confirmar tu pago recibirás acceso digital inmediato en el correo electrónico indicado en el checkout.",
  },
  {
    question: "¿Cuál es la diferencia entre las dos opciones?",
    answer:
      "Con las 30 Recetas recibes ideas prácticas y tú decides cómo distribuirlas durante el mes. Con el Método Menú Listo recibes el plan completo de 30 días, con menús semanales, listas de compras y todo el sistema organizado para seguir.",
  },
  {
    question: "¿Puedo usarlo si hago BLW?",
    answer:
      "Sí. Las texturas y sugerencias de cada receta pueden adaptarse tanto a alimentación guiada por el bebé (BLW) como a purés y papillas.",
  },
  {
    question: "¿Qué pasa si no me gusta?",
    answer:
      "Tienes 7 días para conocer el contenido. Si dentro de ese período consideras que no es para ti, puedes solicitar el reembolso de acuerdo con las condiciones informadas en el checkout.",
  },
];

// Garantia (fundida en la sección de oferta)
export const guarantee = {
  days: 7,
  text: "Garantía de 7 días — si no es para ti, te devolvemos tu dinero.",
};

// Links legais e contato (Rodapé)
export const legal = {
  productName: "Método Menú Listo",
  contactEmail: "{{CONTACT_EMAIL}}",
  privacyUrl: "{{PRIVACY_URL}}",
  termsUrl: "{{TERMS_URL}}",
  refundUrl: "{{REFUND_URL}}",
  educationalNotice:
    "Este material tiene fines educativos y prácticos. No sustituye la orientación de un pediatra o nutricionista infantil.",
  copyrightHolder: "Método Menú Listo",
};

// Rastreamento — IDs configuráveis, sem valores falsos.
export const tracking = {
  metaPixelId: "{{META_PIXEL_ID}}",
  gaId: "{{GA_ID}}",
  gtmId: "{{GTM_ID}}",
};

// Nomes de eventos de rastreamento usados em toda a página
export const trackingEvents = {
  viewOfferSection: "ViewOfferSection",
  clickOffer5: "ClickOffer5",
  clickOffer17: "ClickOffer17",
  initiateCheckout5: "InitiateCheckout5",
  initiateCheckout17: "InitiateCheckout17",
} as const;

// SEO
export const seo = {
  title: "Menús y Recetas para Bebés | Organiza 30 Días de Comidas",
  description:
    "Descubre recetas prácticas para tu bebé o recibe un plan completo de 30 días con menús, listas de compras y más.",
  canonicalUrl: "{{CANONICAL_URL}}",
  ogImage: "/images/mockup-menu-listo.webp",
  locale: "es",
};
