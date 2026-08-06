import { useEffect, useState } from "react";

// Mapa de país → moeda local. Países cuja moeda oficial já é USD
// (o valor "USD" aqui) usam o preço em dólar sem conversão.
const currencyMap: Record<string, string> = {
  MX: "MXN",
  CO: "COP",
  CL: "CLP",
  PE: "PEN",
  UY: "UYU",
  PY: "PYG",
  BO: "BOB",
  CR: "CRC",
  GT: "GTQ",
  HN: "HNL",
  DO: "DOP",
  NI: "NIO",
  EC: "USD",
  PA: "USD",
  SV: "USD",
  VE: "USD",
  AR: "USD",
};

const GEO_ENDPOINT = "https://ipapi.co/json/";
const RATES_ENDPOINT = "https://api.exchangerate-api.com/v4/latest/USD";
const CACHE_KEY = "currency_cache_v1";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 horas

interface CurrencyCache {
  currency: string;
  rate: number;
  timestamp: number;
}

interface CurrencyState {
  currency: string;
  rate: number;
  loading: boolean;
}

function readCache(): CurrencyCache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CurrencyCache;
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(data: CurrencyCache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // localStorage indisponível (modo privado, quota excedida, etc.) — ignora silenciosamente.
  }
}

async function resolveCurrency(): Promise<CurrencyCache> {
  const cached = readCache();
  if (cached) return cached;

  const geoRes = await fetch(GEO_ENDPOINT);
  if (!geoRes.ok) throw new Error("geo lookup failed");
  const geoData = await geoRes.json();
  const countryCode = geoData?.country_code as string | undefined;
  const currency = (countryCode && currencyMap[countryCode]) || "USD";

  if (currency === "USD") {
    const result: CurrencyCache = { currency: "USD", rate: 1, timestamp: Date.now() };
    writeCache(result);
    return result;
  }

  const ratesRes = await fetch(RATES_ENDPOINT);
  if (!ratesRes.ok) throw new Error("exchange rate lookup failed");
  const ratesData = await ratesRes.json();
  const rate = ratesData?.rates?.[currency];
  if (typeof rate !== "number") throw new Error("rate not found for currency");

  const result: CurrencyCache = { currency, rate, timestamp: Date.now() };
  writeCache(result);
  return result;
}

// Detecta el país del visitante y devuelve la moneda local + tasa de cambio
// respecto al USD. Ante cualquier falla (geolocalización o tasa de cambio),
// recae silenciosamente en USD sin bloquear la página.
export function useCurrency(): CurrencyState {
  const [state, setState] = useState<CurrencyState>({
    currency: "USD",
    rate: 1,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    resolveCurrency()
      .then((result) => {
        if (!cancelled) {
          setState({ currency: result.currency, rate: result.rate, loading: false });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ currency: "USD", rate: 1, loading: false });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

// Convierte un valor en USD a la moneda local y lo formatea según las
// reglas de la LP: entero redondeado, o 2 decimales si el resultado es < 10.
export function formatLocalPrice(usdValue: number, currency: string, rate: number): string {
  const converted = usdValue * rate;
  const formatted =
    converted < 10
      ? converted.toLocaleString("es", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : Math.round(converted).toLocaleString("es");
  return `${formatted} ${currency}`;
}
