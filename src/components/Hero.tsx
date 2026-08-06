import { CtaButton } from "./CtaButton";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { PriceDisplay } from "./PriceDisplay";
import { IconChevronDown } from "./Icons";
import { trackEvent } from "../hooks/useTracking";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sage-light/70 via-cream to-cream px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="text-center lg:text-left">
          <span className="inline-block rounded-full bg-sage-light px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-sage">
            Alimentación complementaria más simple
          </span>

          <h1 className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-brown sm:text-4xl lg:text-[2.75rem]">
            Deja de preguntarte todos los días qué preparar para tu bebé
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brown-soft sm:text-lg lg:mx-0">
            Un plan de 30 días con recetas, menús diarios y lista de compras.
            Desde{" "}
            <PriceDisplay
              usdValue={5}
              inline
              mainClassName="font-bold text-brown"
              subClassName="font-normal text-brown-soft"
            />
            .
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
            <CtaButton
              href="#ofertas"
              onClick={() => trackEvent("ClickHeroCta")}
              className="max-w-md"
            >
              VER EL PLAN COMPLETO
            </CtaButton>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md sm:max-w-lg">
          <ImagePlaceholder
            src="/images/hero-mama-bebe.webp"
            alt="Mamá preparando comida para su bebé en la cocina, con el bebé sentado a su lado"
            label="Mamá y bebé"
            className="w-full"
            aspect="aspect-[4/5]"
          />
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <IconChevronDown className="h-7 w-7 animate-bounce text-sage motion-reduce:animate-none" />
      </div>
    </section>
  );
}
