import { useAccountProvider, useTotalIncomes } from "@hooks";

//TODO: Remove literal

export const useMonthTotalBalance = () => {
  const { getAllBudgets, getAllMovements } = useAccountProvider();
  const totalIncomes = useTotalIncomes();
  const budgets = getAllBudgets();
  const movements = getAllMovements();
  const expenses = budgets.filter((budget) => budget.type === "expense");

  const budgetCategories = expenses.map((budget) => budget.category);

  const totalExpensesByMovements = movements.reduce((acc, movement) => {
    if (!budgetCategories.includes(movement.category)) {
      return movement.value < 0 ? acc + movement.value : acc;
    }
    return acc;
  }, 0);

  const total = expenses.reduce((acc, budget) => {
    return acc + budget.amount;
  }, 0);

  return {
    totalExpenses: total + Math.abs(totalExpensesByMovements),
    incomes: totalIncomes,
    budgets: expenses,
  };
};
