import { CtaButton } from "./CtaButton";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { trackEvent } from "../hooks/useTracking";

export function Solution() {
  return (
    <section className="bg-sage-light/40 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          No necesitas más recetas. Necesitas un plan.
        </h2>

        <div className="mt-6 space-y-4 text-left text-base leading-relaxed text-brown-soft sm:text-lg">
          <p>
            Los demás te dan 400 recetas sueltas y te dejan sola para
            resolver el resto. Nosotros te damos 30 días organizados: qué
            preparar, cuándo prepararlo y qué comprar para lograrlo.
          </p>
          <p>
            No es una colección de ideas para revisar cada vez que no sabés
            qué cocinar. Es un sistema que ya decidió por vos, para que solo
            tengas que consultar y preparar.
          </p>
        </div>

        <ImagePlaceholder
          src="/images/solucion-tablet.webp"
          alt="Tablet mostrando el Método Menú Listo y una tarjeta con el plan de 30 días"
          label="Método Menú Listo"
          className="mx-auto mt-8 w-full max-w-sm"
          aspect="aspect-[4/3]"
        />

        <CtaButton
          href="#ofertas"
          variant="secondary"
          onClick={() => trackEvent("ClickSolutionCta")}
          className="mx-auto mt-8 max-w-xs"
        >
          Ver las opciones
        </CtaButton>
      </div>
    </section>
  );
}
