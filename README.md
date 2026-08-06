# Método Menú Listo — Página de Ventas

Landing page de alta conversión para un producto digital de alimentación
complementaria para bebés. Construida con **React 19 + TypeScript + Tailwind
CSS v4 + Vite**. Todo el contenido visible es en español neutro; los
comentarios internos del código están en portugués.

Estructura de 9 secciones, corta y emocional, pensada para tráfico frío de
anuncios (decide en segundos si sigue el scroll).

---

## 1. Cómo ejecutar el proyecto

Requisitos: Node.js 20+ y npm.

```bash
npm install       # instala las dependencias
npm run dev       # inicia el servidor de desarrollo (http://localhost:5173)
npm run lint      # corre oxlint
npm run build     # type-check (tsc) + build de producción en /dist
npm run preview   # sirve el build de /dist localmente para verificarlo
```

---

## 2. Estructura de la página (9 secciones)

```
1. Hero              — headline + subheadline con precio + imagen real + 1 CTA
2. Dor (PainPoints)   — texto emocional, sin cards
3. Solution           — mecanismo único + imagen del tablet
4. ProductMockup      — mockup del producto, sin título de sección
5. Persona            — Mariana Torres, mamá de Valentina + mini-historia
6. Pricing            — US$5 vs US$17 lado a lado + garantía + imagen de módulos
7. ObjectionBreaker   — 4 objeciones en formato pregunta-respuesta
8. Faq                — 5 preguntas frecuentes
9. FinalCta           — frase emocional + 2 botones + imagen + disclaimer
```

```
src/
  data/offer.ts         # ⭐ archivo central de configuración (ver sección 3)
  components/           # un componente por sección de la página
    PriceDisplay.tsx           # precio con conversión de moneda local
    UpsellModal.tsx             # popup de upsell US$5 → US$12
  hooks/
    useTracking.ts              # envío de eventos a dataLayer / fbq
    useIntersectionTracking.ts  # dispara un evento cuando una sección entra en pantalla
    useCurrency.ts              # detección de país + tasa de cambio + cache
    useUpsellModal.ts           # hook para abrir/cerrar el popup de upsell
    UpsellModalContext.tsx      # provider del estado global del popup
  App.tsx                # ensambla las 9 secciones en orden
  index.css              # paleta de colores, tipografías, estilos base
index.html                # metadatos SEO, Open Graph, Twitter Card, Schema.org, pixel UTMify
public/images/            # fotos y mockups del producto (ver sección 5)
```

---

## 3. Cómo editar textos, precios y checkouts

**Todo** el contenido comercial vive en un único archivo:
`src/data/offer.ts`. No hay precios ni URLs repetidos en otros componentes
— todos los componentes leen de aquí.

Ese archivo controla:

| Qué | Variable en `offer.ts` |
|---|---|
| Nombre, precio, ítems y link de checkout de cada oferta | `offers` |
| Popup de upsell (precio, ítems, link de checkout) | `upsell` |
| Persona (nombre, foto, biografía) | `persona` |
| Testimonios — sin usar por ahora, ver sección 4B | `testimonials`, `hasRealTestimonials` |
| Quiebre de objeciones | `objections` |
| Preguntas frecuentes (máx. 5) | `faqItems` |
| Texto de la garantía | `guarantee` |
| Enlaces legales y correo de contacto | `legal` |
| IDs de rastreo | `tracking` |
| Título/descripción SEO | `seo` |

Para cambiar un precio, un ítem de la oferta o el texto de una pregunta
frecuente, edita únicamente ese archivo — el cambio se refleja en todas las
secciones que lo usan.

### Links de checkout actuales

```ts
offers[recetas].checkoutUrl = "https://pay.hotmart.com/U107042966C?off=dn7n41es"  // US$ 5
offers[metodo].checkoutUrl  = "https://pay.hotmart.com/U107042966C?off=8a5ez5v0"  // US$ 17
upsell.checkoutUrl          = "https://pay.hotmart.com/U107042966C?off=6ncmlala"  // US$ 12
```

---

## 4A. Conversión de moneda y popup de upsell

**Conversión de moneda por país.** Al cargar la página se detecta el país
del visitante (`ipapi.co`) y, si su moneda local no es USD, se busca la
tasa de cambio (`exchangerate-api.com`) y se muestra el precio como
`~$100 MXN (US$ 5)`. El resultado se cachea 24 horas en `localStorage`
(`currency_cache_v1`). Si cualquiera de las dos APIs falla, la página
recae en `US$ X` sin bloquear ni mostrar error — ver `src/hooks/useCurrency.ts`.

Países cuya moneda oficial ya es USD (EC, PA, SV, VE, AR) muestran el
precio en USD sin conversión, igual que si la moneda no estuviera en el
mapa de `currencyMap`. La conversión aplica a los tres precios (US$5,
US$12 y US$17), incluidos los del popup de upsell.

Para mostrar un precio con conversión en un componente nuevo, usa:

```tsx
<PriceDisplay usdValue={5} />           {/* apilado: local arriba, USD abajo */}
<PriceDisplay usdValue={5} inline />    {/* en una sola línea, para texto corrido */}
```

**Popup de upsell.** Cualquier CTA que lleve al checkout de US$ 5 (tarjeta
de oferta y CTA final) abre un popup ofreciendo el Método Menú Listo a
US$ 12 en lugar de navegar directamente. El CTA de US$ 17 nunca dispara el
popup. Si la visitante cierra el popup (X, overlay, Escape o "No gracias"),
se marca en `sessionStorage` (`upsell_dismissed_v1`) y los siguientes clics
en esa misma sesión van directo al checkout de US$ 5 sin volver a mostrarlo.

---

## 4B. Sección de testimonios (pendiente)

La sección de prueba social fue retirada de la página hasta contar con
testimonios reales. El componente `SocialProof` fue eliminado, pero los
tipos y datos (`testimonials`, `hasRealTestimonials`, `Testimonial`) siguen
en `src/data/offer.ts` para reutilizarlos cuando se vuelva a agregar la
sección.

---

## 5. Cómo sustituir las imágenes

El componente `ImagePlaceholder` (`src/components/ImagePlaceholder.tsx`)
intenta cargar la imagen real desde `/public/images/`. Si el archivo no
existe (404) o no fue informado, muestra automáticamente un placeholder
elegante con ícono y etiqueta — el layout nunca se rompe por falta de
imágenes.

Imágenes actualmente en uso (WebP, optimizadas):

| Archivo | Dónde se usa |
|---|---|
| `hero-mama-bebe.webp` | Hero — mamá preparando comida junto a su bebé |
| `solucion-tablet.webp` | Solution — tablet con el Método Menú Listo |
| `mockup-menu-listo.webp` | ProductMockup — mockup completo (tablet, celular, tarjetas) |
| `oferta-modulos.webp` | Pricing — tarjetas de módulos + celular con receta |
| `final-bebe-sonriendo.webp` | FinalCta — bebé sonriendo mientras come |
| `persona-foto.webp` | Persona — foto de Mariana Torres (placeholder, aún sin sustituir) |

Recomendaciones:

- Formato **WebP**, comprimido (las 5 imágenes de producto ya se
  convirtieron y comprimen a ~60–150 KB cada una).
- El alt text ya está escrito en español en cada componente — revísalo si
  cambias el contenido de la imagen.
- Las imágenes usan `loading="lazy"` de forma nativa.

---

## 6. Cómo configurar el rastreo (Meta Pixel, GA, GTM, UTMify)

En `src/data/offer.ts`, objeto `tracking`, reemplaza:

```ts
metaPixelId: "{{META_PIXEL_ID}}",
gaId: "{{GA_ID}}",
gtmId: "{{GTM_ID}}",
```

Luego instala los scripts oficiales de cada plataforma en `index.html`
(hay comentarios marcando dónde insertarlos) usando esos IDs.

El **pixel de UTMify** ya está instalado y activo en `index.html`, justo
antes de `</head>`.

Los eventos ya están disparados en los puntos correctos del código a través
de `trackEvent()` (`src/hooks/useTracking.ts`):

| Evento | Se dispara cuando |
|---|---|
| `ViewOfferSection` | la sección de las dos ofertas entra en la pantalla |
| `ClickOffer5` | se hace clic en cualquier botón de la oferta de US$ 5 |
| `ClickOffer17` | se hace clic en cualquier botón de la oferta de US$ 17 |
| `InitiateCheckout5` | se inicia el checkout de la oferta de US$ 5 |
| `InitiateCheckout17` | se inicia el checkout de la oferta de US$ 17 |
| `ViewUpsellModal` | el popup de upsell se muestra |
| `ClickUpsellAccept` | se acepta la oferta de US$ 12 en el popup |
| `ClickUpsellDecline` | se rechaza el popup ("No gracias") |

`trackEvent()` empuja a `window.dataLayer` (GTM) y llama a `window.fbq`
(Meta Pixel) si están presentes; si no lo están, no hace nada (no genera
errores).

---

## 7. Cómo publicar

```bash
npm run build
```

Esto genera la carpeta `dist/` lista para publicar en cualquier hosting
estático (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront, etc.). No
requiere servidor Node en producción.

Antes de publicar:

1. Completa las variables `{{...}}` pendientes (sección 10).
2. Sustituye `persona-foto.webp` por la foto real de Mariana Torres.
3. Revisa `hasRealTestimonials` en `offer.ts` — actívalo solo cuando
   vuelvas a agregar la sección de testimonios con contenido real.

---

## 8. Paleta de colores — "Jardín Tropical"

Definida en `src/index.css` (bloque `@theme`):

| Token | Hex | Uso |
|---|---|---|
| `sage` | `#35A57A` | **Todos los CTAs de compra/checkout** (hero, oferta, CTA final, popup), precios, badges de borde |
| `coral` | `#E84855` | Reservado para badges de urgencia/destaque puntuales — **nunca en botones de compra** |
| `yellow` | `#FFBA49` | Destaques puntuales (badge "Más completo") — máx. 3 usos en toda la página |
| `cream` | `#FFF8EE` | Fondo de página |
| `white` | `#FFFFFF` | Fondo de secciones alternadas |
| `brown` | `#2B2D42` | Texto principal (nunca negro puro) |
| `brown-soft` | `#555B6E` | Texto secundario |

---

## 9. Decisiones de diseño relevantes

- **Botones de compra siempre en verde** (`sage`) — el coral quedó
  reservado para elementos de urgencia/destaque, nunca para CTAs de
  checkout (el rojo/coral comunica "alto/peligro", contraproducente en
  un producto de maternidad).
- **Máximo 2 grids de tarjetas en toda la página**: comparación de precios
  y quiebre de objeciones. El resto es texto corrido o listas simples.
- **Un solo CTA en el hero**, precio visible desde el primer scroll.
- **Tailwind CSS v4** vía el plugin oficial `@tailwindcss/vite` — sin
  `tailwind.config.js` ni `postcss.config.js`.
- **Sin librerías de animación o carrusel** — el FAQ usa `<details>/<summary>`
  nativos (accesibles por defecto, sin JS extra).
- **`prefers-reduced-motion`** respetado globalmente.
- **Sin scroll horizontal**, verificado en 320px, 375px, 768px, 1024px y
  1440px.
- **Barra fija mobile**: el `<footer>` tiene padding inferior para que la
  barra nunca cubra contenido.

---

## 10. Campos que aún deben completarse antes de publicar

Buscar `{{` en el proyecto para encontrarlos todos:

- `{{CONTACT_EMAIL}}`, `{{PRIVACY_URL}}`, `{{TERMS_URL}}`, `{{REFUND_URL}}`.
- `{{META_PIXEL_ID}}`, `{{GA_ID}}`, `{{GTM_ID}}`.
- `{{CANONICAL_URL}}` (en `index.html`, dos ocurrencias).
- `{{TESTIMONIAL_1..3}}` y sus nombres/países — solo si se reintroduce la
  sección de testimonios con contenido real verificado.

Los links de checkout (US$5, US$12, US$17) y la persona (Mariana Torres)
ya están completos — ver secciones 3 y 5.

---

## 11. Aviso de contenido

Este material tiene fines educativos y prácticos. No sustituye la
orientación de un pediatra o nutricionista infantil. Este aviso ya está
incluido en el CTA final y en el pie de página de la landing page.
