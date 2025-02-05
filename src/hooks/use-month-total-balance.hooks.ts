import {
  useAccountProvider,
  useCategoryProvider,
  useTotalIncomes,
} from "@hooks";

//TODO: Remove literal

export const useMonthTotalBalance = () => {
  const { getAllBudgets, getAllMovements } = useAccountProvider();
  const { getCategory } = useCategoryProvider();
  const totalIncomes = useTotalIncomes();
  const budgets = getAllBudgets();
  const movements = getAllMovements();

  const budgetCategories = budgets.map(
    (budget) => getCategory(budget.category)?.name
  );

  const totalExpensesByMovements = movements.reduce((acc, movement) => {
    const category = getCategory(Number(movement.category));

    if (category?.name && !budgetCategories.includes(category.name)) {
      return movement.value < 0 ? acc + movement.value : acc;
    }
    return acc;
  }, 0);

  const total = budgets.reduce((acc, budget) => {
    return acc + budget.amount;
  }, 0);

  return {
    totalExpenses: total + Math.abs(totalExpensesByMovements),
    incomes: totalIncomes,
    budgets,
  };
};
