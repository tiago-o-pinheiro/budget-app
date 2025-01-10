import { Movement } from "@interfaces";
import { useMemo } from "react";

const DEFAULT_EXCLUDED_CATEGORIES = ["Transfer", "Income: Salary"];

export const useMovementReport = (
  movements: Omit<Movement, "account" | "accountId">[],
  type?: "expenses" | "incomes",
  month?: number
): Record<string, number> => {
  const excludedCategories =
    type === "expenses"
      ? [...DEFAULT_EXCLUDED_CATEGORIES, "Transfer"]
      : DEFAULT_EXCLUDED_CATEGORIES;
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    const currentMonth = month ?? new Date().getMonth() + 1; // Default to the current month

    movements.forEach((movement) => {
      const { category, value, date } = movement;

      if (excludedCategories.includes(category)) {
        return;
      }

      const movementDate = new Date(date);
      if (movementDate.getMonth() + 1 !== currentMonth) {
        return;
      }

      if (!totals[category]) {
        totals[category] = 0;
      }

      totals[category] += value;
    });

    return totals;
  }, [movements, excludedCategories, month]);

  return categoryTotals;
};
