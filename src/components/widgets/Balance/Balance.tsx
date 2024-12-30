import { useCurrencyFormatter } from "@hooks";
import { RemainingBalancePerDay, Text } from "@components";

interface BalanceProps {
  balance: number;
}

export const Balance = ({ balance }: BalanceProps) => {
  const formattedBalance = useCurrencyFormatter({ value: balance });

  return (
    <div className="w-full p-4">
      <Text
        value={formattedBalance}
        size="xl"
        styles="text-center my-2 mb-4 text-5xl font-thin"
      />
      <RemainingBalancePerDay balance={balance} />
    </div>
  );
};
