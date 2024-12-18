interface PriceProps {
  value: number;
  currency?: string;
  locale?: string;
}

export const useCurrencyFormatter = ({
  value,
  currency = "€",
  locale = "es-ES",
}: PriceProps) => {
  const formattedPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency === "€" ? "EUR" : currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(value);

  return formattedPrice;
};
