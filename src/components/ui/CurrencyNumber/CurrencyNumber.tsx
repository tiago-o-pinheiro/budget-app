const formatNumber = (value: string) => {
  const normalizedValue = value.replace(".", ",");

  const [integer, decimal] = normalizedValue.split(",");

  const formattedInteger = parseInt(integer || "0", 10).toLocaleString("de-DE");
  return decimal !== undefined
    ? `${formattedInteger},${decimal}`
    : formattedInteger;
};

export const CurrencyNumber = ({ value }: { value: string }) => {
  return (
    <div className="w-full p-2 mb-4 bg-white text-center text-6xl font-thin">
      {formatNumber(value)}€
    </div>
  );
};
