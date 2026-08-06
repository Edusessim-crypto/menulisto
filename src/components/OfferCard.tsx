import type { Offer } from "../data/offer";
import { CtaButton } from "./CtaButton";
import { PriceDisplay } from "./PriceDisplay";
import { IconCheck } from "./Icons";
import { trackEvent } from "../hooks/useTracking";
import { trackingEvents } from "../data/offer";
import { useUpsellModal } from "../hooks/useUpsellModal";

export function OfferCard({ offer }: { offer: Offer }) {
  const isHighlighted = offer.id === "metodo";
  const { handleOffer5Click } = useUpsellModal();
  const isRecetas = offer.id === "recetas";

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isRecetas) {
      // Nunca navega directo al checkout desde acá: handleOffer5Click decide
      // entre abrir el popup o redirigir, según si ya fue descartado antes.
      trackEvent(trackingEvents.clickOffer5);
      handleOffer5Click(event);
      return;
    }
    trackEvent(trackingEvents.clickOffer17);
    trackEvent(trackingEvents.initiateCheckout17);
  };

  return (
    <div
      className={`relative flex flex-col rounded-[var(--radius-card)] bg-white p-6 sm:p-8 ${
        isHighlighted
          ? "border-2 border-sage shadow-[var(--shadow-lift)] lg:scale-[1.03]"
          : "border border-border shadow-[var(--shadow-soft)]"
      }`}
    >
      {offer.badge && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-yellow-text shadow-[var(--shadow-soft)]">
          {offer.badge}
        </span>
      )}

      <h3 className="mt-2 text-center text-xl font-bold sm:text-2xl">{offer.name}</h3>
      <p className="mt-2 text-center text-sm text-brown-soft sm:text-base">{offer.tagline}</p>

      <ul className="mt-6 flex-1 space-y-3">
        {offer.items.map((item) => (
          <li key={item.label} className="flex items-start gap-2.5 text-sm sm:text-base">
            <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-sage" />
            <span className="text-brown">{item.label}</span>
          </li>
        ))}
      </ul>

      {offer.highlight && (
        <p className="mt-6 rounded-[16px] bg-sage-light p-4 text-center text-sm font-medium leading-snug text-sage">
          {offer.highlight}
        </p>
      )}

      <div className="mt-8 text-center">
        <PriceDisplay
          usdValue={offer.priceUsd}
          mainClassName="text-4xl font-bold text-sage sm:text-5xl"
          subClassName="mt-1 block text-base font-medium text-brown-soft"
        />
        <p className="mt-1 text-sm font-medium text-brown-soft">{offer.priceNote}</p>
      </div>

      <CtaButton
        href={isRecetas ? "#" : offer.checkoutUrl}
        onClick={handleClick}
        variant={isHighlighted ? "primary" : "secondary"}
        className="mt-6 w-full"
      >
        {offer.ctaLabel}
      </CtaButton>
    </div>
  );
}
