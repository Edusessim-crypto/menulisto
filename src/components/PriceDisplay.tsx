import { useCurrency, formatLocalPrice } from "../hooks/useCurrency";

interface PriceDisplayProps {
  usdValue: number;
  mainClassName?: string;
  subClassName?: string;
  inline?: boolean;
}

// Muestra el precio en la moneda local del visitante (con "~" y redondeo)
// y el valor en USD entre paréntesis debajo. Si la moneda es USD, muestra
// solo "US$ X" sin duplicar la información.
export function PriceDisplay({
  usdValue,
  mainClassName = "",
  subClassName = "",
  inline = false,
}: PriceDisplayProps) {
  const { currency, rate } = useCurrency();
  const usdLabel = `US$ ${usdValue}`;

  if (currency === "USD") {
    return <span className={mainClassName}>{usdLabel}</span>;
  }

  const localLabel = `~$${formatLocalPrice(usdValue, currency, rate)}`;

  if (inline) {
    return (
      <span className={mainClassName}>
        {localLabel} <span className={subClassName}>({usdLabel})</span>
      </span>
    );
  }

  return (
    <span className="inline-flex flex-col items-center">
      <span className={mainClassName}>{localLabel}</span>
      <span className={subClassName}>({usdLabel})</span>
    </span>
  );
}
