import { useEffect, useRef } from "react";
import { offers, upsell, guarantee } from "../data/offer";
import { useUpsellModal } from "../hooks/useUpsellModal";
import { useCurrency, formatLocalPrice } from "../hooks/useCurrency";
import { trackEvent } from "../hooks/useTracking";
import { trackingEvents } from "../data/offer";

function DiffPrice() {
  const { currency, rate } = useCurrency();
  const diffUsd = upsell.priceUsd - offers.find((o) => o.id === "recetas")!.priceUsd;

  if (currency === "USD") {
    return <>US$ {diffUsd}</>;
  }
  return <>~${formatLocalPrice(diffUsd, currency, rate)} (US$ {diffUsd})</>;
}

function UpsellPrice({ usdValue }: { usdValue: number }) {
  const { currency, rate } = useCurrency();
  if (currency === "USD") {
    return <>US$ {usdValue}</>;
  }
  return <>~${formatLocalPrice(usdValue, currency, rate)} (US$ {usdValue})</>;
}

export function UpsellModal() {
  const { isOpen, close } = useUpsellModal();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    trackEvent("ViewUpsellModal");

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const recetas = offers.find((o) => o.id === "recetas")!;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 motion-safe:animate-[fadeIn_200ms_ease-out]"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upsell-title"
    >
      <div
        ref={cardRef}
        className="relative w-[85%] max-w-[480px] rounded-xl bg-white p-6 shadow-[var(--shadow-lift)] sm:p-8"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar"
          className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full text-brown-soft hover:bg-cream"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <h2 id="upsell-title" className="pr-8 text-xl font-bold text-brown sm:text-2xl">
          ¡Espera! Tenemos algo mejor para ti
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-brown-soft sm:text-base">
          Estás a punto de llevar 30 recetas. Pero por solo{" "}
          <strong className="font-bold text-brown">
            <DiffPrice />
          </strong>{" "}
          más, puedes tener el plan completo:
        </p>

        <ul className="mt-4 space-y-2">
          {upsell.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-brown sm:text-base">
              <span className="mt-0.5 text-sage">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 text-center">
          <span className="text-base text-brown-soft line-through">
            <UpsellPrice usdValue={upsell.regularPriceUsd} />
          </span>
          <p className="mt-1 text-2xl font-bold text-sage sm:text-3xl">
            <UpsellPrice usdValue={upsell.priceUsd} />
          </p>
        </div>

        <a
          href={upsell.checkoutUrl}
          onClick={() => {
            trackEvent("ClickUpsellAccept");
            trackEvent(trackingEvents.initiateCheckout17);
          }}
          className="mt-6 flex w-full items-center justify-center rounded-[var(--radius-btn)] bg-sage px-6 py-4 text-center text-base font-bold tracking-wide text-white shadow-[var(--shadow-lift)] transition-transform duration-150 hover:bg-sage-hover active:scale-[0.98] sm:text-lg"
        >
          Quiero el plan completo
        </a>

        <a
          href={recetas.checkoutUrl}
          onClick={() => {
            trackEvent("ClickUpsellDecline");
            trackEvent(trackingEvents.initiateCheckout5);
            close();
          }}
          className="mt-4 block text-center text-sm text-brown-soft underline-offset-2 hover:underline"
        >
          No gracias, solo quiero las 30 recetas
        </a>

        <p className="mt-5 text-center text-xs font-semibold text-sage">{guarantee.text}</p>
      </div>
    </div>
  );
}
