import { useAccountProvider } from "@hooks";

export const useGetExpenseOutOfBudget = () => {
  const { getAllBudgets, getAllMovements } = useAccountProvider();
  const budgets = getAllBudgets();
  const movements = getAllMovements();

  const budgetCategories = budgets.map((budget) => Number(budget.category));

  const expensesOutOfBudget = movements.filter(
    (movement) =>
      !budgetCategories.includes(Number(movement.category)) &&
      movement.value < 0
  );

  const total = expensesOutOfBudget.reduce((acc, movement) => {
    return movement.value < 0 ? acc + movement.value : acc;
  }, 0);

  return {
    movements: expensesOutOfBudget,
    total,
  };
};
