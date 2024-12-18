import { useCurrencyFormatter } from "@hooks";

interface BalanceProps {
  balance: number;
}

export const Balance = ({ balance }: BalanceProps) => {
  const formattedBalance = useCurrencyFormatter({ value: balance });
  return (
    <div>
      <h6>Balance: {formattedBalance}</h6>
    </div>
  );
};
