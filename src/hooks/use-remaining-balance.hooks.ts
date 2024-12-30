import { useCurrencyFormatter } from "@hooks";

export const useRemainingBalance = (balance: number) => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const remainingDays = lastDayOfMonth.getDate() - today.getDate() + 1;

  const balancePerDay = balance / remainingDays;
  const formattedBalancePerDay = useCurrencyFormatter({ value: balancePerDay });

  return {
    remainingDays,
    balancePerDay,
    formattedBalancePerDay,
  };
};
