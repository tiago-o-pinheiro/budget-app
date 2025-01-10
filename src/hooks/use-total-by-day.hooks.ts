import { Movement } from "@interfaces";
import { useMemo } from "react";
import { useGetYearAndMonth } from "@hooks";

export const useTotalByDayReport = (
  movements: Omit<Movement, "account" | "accountId">[],
  month?: number
) => {
  const { year, month: currentMonth } = useGetYearAndMonth();
  const targetMonth = month ?? currentMonth;

  const spendingReport = useMemo(() => {
    const filteredMovements = movements.filter((movement) => {
      const movementDate = new Date(movement.date);
      return (
        movementDate.getFullYear() === year &&
        movementDate.getMonth() + 1 === targetMonth
      );
    });

    const groupedByDay: { day: number; total: number }[] = [];
    let currentTotal = 0;

    filteredMovements.forEach((movement) => {
      const movementDate = new Date(movement.date);
      const day = movementDate.getDate();
      const amount = movement.value < 0 ? Math.abs(movement.value) : 0;

      currentTotal += amount;

      const existingDay = groupedByDay.find((entry) => entry.day === day);
      if (existingDay) {
        existingDay.total += amount;
      } else {
        groupedByDay.push({ day, total: amount });
      }
    });

    // Filter out days with zero total and sort by day in ascending order
    const totalByDay = groupedByDay
      .filter((entry) => entry.total > 0)
      .sort((a, b) => a.day - b.day);

    return {
      currentTotal: parseFloat(currentTotal.toFixed(2)),
      totalByDay,
    };
  }, [movements, targetMonth, year]);

  return spendingReport;
};
