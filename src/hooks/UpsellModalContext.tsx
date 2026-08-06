import { useCallback, useMemo, useState } from "react";
import { UpsellModalContext } from "./upsellModalCtx";
import { offers } from "../data/offer";

const DISMISSED_KEY = "upsell_dismissed_v1";

function wasDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    sessionStorage.setItem(DISMISSED_KEY, "1");
  } catch {
    // sessionStorage indisponível — o popup pode reaparecer, o que é um degrade aceitável.
  }
}

export function UpsellModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOffer5Click = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    // preventDefault primero, siempre — el botón de US$5 nunca debe seguir
    // un href real, sin importar la rama que tome después.
    event.preventDefault();

    if (wasDismissed()) {
      window.location.href = offers.find((o) => o.id === "recetas")!.checkoutUrl;
      return;
    }

    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    markDismissed();
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, handleOffer5Click, close }),
    [isOpen, handleOffer5Click, close]
  );

  return <UpsellModalContext.Provider value={value}>{children}</UpsellModalContext.Provider>;
}
