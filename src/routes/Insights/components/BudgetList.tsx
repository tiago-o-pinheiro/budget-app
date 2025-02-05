import { PercentageBar } from "@components";

interface Budget {
  id: number;
  name: string;
  amount: number;
  category: number;
}

interface CategoryTotal {
  categoryName: string;
  categoryId: number;
  total: number;
}

interface BudgetListProps {
  budgets: Budget[];
  expensesPerCategory: CategoryTotal[];
}

export const BudgetList = ({
  budgets,
  expensesPerCategory,
}: BudgetListProps) => {
  if (!budgets.length) {
    return null;
  }

  return (
    <div className="mb-4 rounded-3xl">
      {budgets.map((budget) => {
        const categoryExpense = expensesPerCategory.find(
          (el) => el.categoryId === budget.category
        );

        return (
          <PercentageBar
            key={budget.id}
            total={budget.amount}
            percentage={categoryExpense?.total || 0}
            label={budget.name}
          />
        );
      })}
    </div>
  );
};
