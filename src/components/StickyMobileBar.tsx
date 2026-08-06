import { trackEvent } from "../hooks/useTracking";
import { PriceDisplay } from "./PriceDisplay";

export function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-border bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(43,45,66,0.12)] backdrop-blur-sm sm:hidden">
      <span className="text-sm font-bold text-brown">
        Desde <PriceDisplay usdValue={5} inline mainClassName="" subClassName="font-normal opacity-70" />
      </span>
      <a
        href="#ofertas"
        onClick={() => trackEvent("ClickStickyBar")}
        className="rounded-[var(--radius-btn)] bg-coral px-5 py-3 text-sm font-bold text-white shadow-[var(--shadow-soft)] active:scale-[0.98]"
      >
        VER OPCIONES
      </a>
    </div>
  );
}
