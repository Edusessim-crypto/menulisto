import { useEffect, useRef } from "react";
import { trackEvent } from "./useTracking";

// Dispara um evento de rastreamento uma única vez quando o elemento entra na viewport.
export function useIntersectionTracking<T extends HTMLElement>(eventName: string) {
  const ref = useRef<T | null>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || firedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            trackEvent(eventName);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [eventName]);

  return ref;
}
