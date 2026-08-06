import { useContext } from "react";
import { UpsellModalContext } from "./upsellModalCtx";

export function useUpsellModal() {
  const ctx = useContext(UpsellModalContext);
  if (!ctx) throw new Error("useUpsellModal debe usarse dentro de UpsellModalProvider");
  return ctx;
}
