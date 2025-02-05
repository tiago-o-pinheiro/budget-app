import { Movement } from "@interfaces";
import { useMemo } from "react";
import { useCategoryProvider } from "./use-category-store.hook";

interface CategoryTotal {
  categoryName: string;
  categoryId: number;
  total: number;
}

export const useMovementReport = (
  movements: Omit<Movement, "account" | "accountId">[],
  month?: number,
  type: "all" | "expenses" | "incomes" = "expenses"
): CategoryTotal[] => {
  const { getCategory } = useCategoryProvider();

  const categoryTotals = useMemo(() => {
    const totals: Record<number, CategoryTotal> = {};
    const currentMonth = month ?? new Date().getMonth() + 1;

    movements.forEach((movement) => {
      const { category, value, date } = movement;
      const categoryDetails = getCategory(Number(category));
      const movementDate = new Date(date);

      if (movementDate.getMonth() + 1 !== currentMonth || !categoryDetails) {
        return;
      }

      const { id: categoryId, name: categoryName } = categoryDetails;

      if (!totals[categoryId]) {
        totals[categoryId] = {
          categoryName,
          categoryId,
          total: 0,
        };
      }

      if (type === "expenses") {
        totals[categoryId].total += value < 0 ? value : 0;
      } else if (type === "incomes") {
        totals[categoryId].total += value > 0 ? value : 0;
      } else {
        totals[categoryId].total += value;
      }
    });

    return Object.values(totals);
  }, [movements, month, type, getCategory]);

  return categoryTotals;
};
