import { useMemo } from "react";
import { Movement } from "@interfaces";
import { useGetYearAndMonth } from "./use-get-year-and-month.hooks";

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const useMonthlySpending = (
  movements: Omit<Movement, "account" | "accountId">[],
  month?: number
) => {
  const { year, month: currentMonth } = useGetYearAndMonth();
  const targetMonth = month ?? currentMonth;

  const totals = useMemo(() => {
    const filteredMovements = movements.filter((movement) => {
      const movementDate = new Date(movement.date);
      return (
        movementDate.getFullYear() === year &&
        movementDate.getMonth() + 1 === targetMonth
      );
    });

    const totalSpent = filteredMovements.reduce((sum, movement) => {
      return (
        sum + (movement.value < 0 ? Math.abs(movement.value) : movement.value)
      );
    }, 0);

    const daysInMonth = getDaysInMonth(year, targetMonth);
    const currentDate = new Date();
    const today = currentDate.getDate();
    const weeksInMonth = Math.ceil(daysInMonth / 7);

    const isCurrentMonth = targetMonth === currentMonth;
    const daysPassed = isCurrentMonth ? today : daysInMonth;
    const weeksPassed = isCurrentMonth
      ? Math.ceil(daysPassed / 7)
      : weeksInMonth;

    const dailyAmount = totalSpent / daysPassed;
    const weeklyAmount = totalSpent / weeksPassed;

    return [
      { label: "day", amount: parseFloat(dailyAmount.toFixed(2)) },
      { label: "week", amount: parseFloat(weeklyAmount.toFixed(2)) },
      { label: "month", amount: parseFloat(totalSpent.toFixed(2)) },
    ];
  }, [movements, targetMonth, year, currentMonth]);

  return totals;
};
