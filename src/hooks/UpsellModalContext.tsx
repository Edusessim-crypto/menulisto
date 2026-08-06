import { useCallback, useMemo, useState } from "react";
import { UpsellModalContext } from "./upsellModalCtx";

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

  const requestOpen = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (wasDismissed()) return;
    event.preventDefault();
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    markDismissed();
    setIsOpen(false);
  }, []);

  const value = useMemo(() => ({ isOpen, requestOpen, close }), [isOpen, requestOpen, close]);

  return <UpsellModalContext.Provider value={value}>{children}</UpsellModalContext.Provider>;
}
