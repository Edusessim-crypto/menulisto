import { createContext } from "react";

export interface UpsellModalContextValue {
  isOpen: boolean;
  // Intercepta el clic en un CTA de US$5: si la visitante ya descartó el
  // popup en esta sesión, deja pasar el clic (va directo al checkout de $5).
  // Si no, abre el popup y bloquea la navegación original.
  requestOpen: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  close: () => void;
}

export const UpsellModalContext = createContext<UpsellModalContextValue | null>(null);
