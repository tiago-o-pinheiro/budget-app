import { useRemainingBalance } from "@hooks";

interface RemainingBalancePerDayProps {
  balance: number;
}

export const RemainingBalancePerDay = ({
  balance,
}: RemainingBalancePerDayProps) => {
  const { remainingDays, balancePerDay, formattedBalancePerDay } =
    useRemainingBalance(balance);

  const textColor = balancePerDay < 15 ? "text-red-500" : "text-gray-500";

  return (
    <p className={`font-sans text-sm text-center ${textColor}`}>
      {`≈ ${formattedBalancePerDay} per day for the remaining ${remainingDays} day${
        remainingDays > 1 ? "s" : ""
      }`}
    </p>
  );
};
