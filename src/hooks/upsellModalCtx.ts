import { createContext } from "react";

export interface UpsellModalContextValue {
  isOpen: boolean;
  // Maneja el clic en CUALQUIER CTA de US$5 de la LP. Los botones de US$5
  // nunca llevan href de checkout — este handler decide: si la visitante
  // ya descartó el popup en esta sesión, navega directo al checkout de $5
  // vía window.location; si no, abre el popup. En ningún caso deja que un
  // <a href> apunte al checkout fuera del popup.
  handleOffer5Click: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  close: () => void;
}

export const UpsellModalContext = createContext<UpsellModalContextValue | null>(null);
