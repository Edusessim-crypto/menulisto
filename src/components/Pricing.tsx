import { offers, guarantee, trackingEvents } from "../data/offer";
import { OfferCard } from "./OfferCard";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { useIntersectionTracking } from "../hooks/useIntersectionTracking";
import { IconShield } from "./Icons";

export function Pricing() {
  const ref = useIntersectionTracking<HTMLDivElement>(trackingEvents.viewOfferSection);

  return (
    <section id="ofertas" className="scroll-mt-16 bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Elige cuánto quieres organizar</h2>
          <p className="mt-3 text-base leading-relaxed text-brown-soft sm:text-lg">
            Puedes comenzar con nuevas recetas o recibir todo el mes
            organizado.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-6">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        <p className="mx-auto mt-10 flex max-w-md items-center justify-center gap-2 text-center text-sm font-semibold text-sage">
          <IconShield className="h-5 w-5 shrink-0" />
          {guarantee.text}
        </p>

        <ImagePlaceholder
          src="/images/oferta-modulos.webp"
          alt="Tarjetas de los módulos del Método Menú Listo junto a un celular con una receta"
          label="Módulos del método"
          className="mx-auto mt-12 w-full max-w-lg"
          aspect="aspect-[4/3]"
        />
      </div>
    </section>
  );
}
