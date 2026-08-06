import { offers, guarantee, legal } from "../data/offer";
import { CtaButton } from "./CtaButton";
import { PriceDisplay } from "./PriceDisplay";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { useCurrency } from "../hooks/useCurrency";
import { trackEvent } from "../hooks/useTracking";
import { trackingEvents } from "../data/offer";
import { useUpsellModal } from "../hooks/useUpsellModal";

export function FinalCta() {
  const recetas = offers.find((o) => o.id === "recetas")!;
  const metodo = offers.find((o) => o.id === "metodo")!;
  const { handleOffer5Click } = useUpsellModal();
  const { currency } = useCurrency();

  const handleRecetasClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Nunca navega directo al checkout desde acá: handleOffer5Click decide
    // entre abrir el popup o redirigir, según si ya fue descartado antes.
    trackEvent(trackingEvents.clickOffer5);
    handleOffer5Click(event);
  };

  return (
    <section className="bg-brown px-4 py-16 text-center sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-bold text-cream sm:text-3xl">
          Tu próxima comida no necesita comenzar con otra búsqueda en
          internet
        </h2>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <CtaButton
            href="#"
            variant="secondary"
            onClick={handleRecetasClick}
            className="sm:w-auto"
          >
            QUIERO LAS 30 RECETAS — US$ {recetas.priceUsd}
          </CtaButton>
          <CtaButton
            href={metodo.checkoutUrl}
            variant="primary"
            onClick={() => trackEvent(trackingEvents.clickOffer17)}
            className="sm:w-auto"
          >
            QUIERO EL MÉTODO COMPLETO — US$ {metodo.priceUsd}
          </CtaButton>
        </div>

        {currency !== "USD" && (
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-cream/70">
            <PriceDisplay usdValue={recetas.priceUsd} inline mainClassName="" subClassName="opacity-80" />
            <PriceDisplay usdValue={metodo.priceUsd} inline mainClassName="" subClassName="opacity-80" />
          </p>
        )}

        <p className="mt-6 text-sm font-semibold text-cream/90">
          {guarantee.text}
        </p>

        <ImagePlaceholder
          src="/images/final-bebe-sonriendo.webp"
          alt="Bebé sonriendo mientras come, sostenido por su mamá"
          label="Bebé sonriendo"
          className="mx-auto mt-8 w-full max-w-[280px]"
          aspect="aspect-square"
        />

        <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-cream/60">
          {legal.educationalNotice}
        </p>
      </div>
    </section>
  );
}
