import { useCurrencyFormatter } from "@hooks";

interface BalanceProps {
  balance: number;
}

export const Balance = ({ balance }: BalanceProps) => {
  const formattedBalance = useCurrencyFormatter({ value: balance });
  return (
    <div className="w-full p-4">
      <p className="font-sans text-4xl text-center font-light py-4">
        {formattedBalance}
      </p>
    </div>
  );
};
