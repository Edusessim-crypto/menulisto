// Hook central de rastreamento. Envia eventos para dataLayer (GTM) e fbq (Meta Pixel)
// quando estiverem disponíveis. Não faz nada se os scripts não estiverem carregados.

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...payload });
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, payload);
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info(`[tracking] ${eventName}`, payload ?? {});
  }
}

export function useTracking() {
  return { trackEvent };
}
