import { useCurrencyFormatter } from "@hooks";

export const CurrentBalance = ({
  balance,
  isValid,
}: {
  balance: number;
  isValid: boolean;
}) => {
  const formattedBalance = useCurrencyFormatter({ value: +balance });

  if (!balance) return null;

  if (!isValid) return <span>The amount exceeds the available balance</span>;

  return <span>Current account balance:{formattedBalance}</span>;
};
