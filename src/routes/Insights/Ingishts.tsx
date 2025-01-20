import {
  Container,
  PageHeader,
  PercentageBar,
  Separator,
  Text,
  Transaction,
} from "@components";
import {
  useAccountProvider,
  useCurrencyFormatter,
  useMovementReport,
  usePercentage,
  useMonthTotalBalance,
} from "@hooks";

const useGetExpenseOutOfBudget = () => {
  const { getAllBudgets, getAllMovements } = useAccountProvider();
  const budgets = getAllBudgets();
  const movements = getAllMovements();

  const expenses = budgets.filter((budget) => budget.type === "expense");

  const budgetCategories = expenses.map((budget) => budget.category);

  const expensesOutOfBudget = movements.filter(
    (movement) =>
      !budgetCategories.includes(movement.category) && movement.value < 0
  );

  const total = expensesOutOfBudget.reduce((acc, movement) => {
    return movement.value < 0 ? acc + movement.value : acc;
  }, 0);

  return {
    movements: expensesOutOfBudget,
    total,
  };
};

const TotalBudget = () => {
  const { totalExpenses, incomes } = useMonthTotalBalance();
  const percentage = usePercentage(incomes, totalExpenses);
  const formattedIncome = useCurrencyFormatter({ value: incomes });
  return (
    <Container>
      <Text value="Total budget" size="lg" styles="mb-1" />
      <Text
        value={`Available to spend: ${formattedIncome}`}
        size="md"
        styles="mb-4 font-thin"
        color="secondary"
      />
      <PercentageBar
        total={incomes}
        percentage={totalExpenses}
        color="bg-green-400"
      />
      <div className="flex justify-between items-center mt-4 px-1">
        <Text
          value={useCurrencyFormatter({ value: totalExpenses })}
          size="xs"
          color="secondary"
        />
        <Text
          value={`${percentage}%`}
          size="xs"
          color="secondary"
          styles="font-thin"
        />
      </div>
    </Container>
  );
};

export const Insights = () => {
  const { budgets } = useMonthTotalBalance();
  const { getAllMovements } = useAccountProvider();
  const { movements, total } = useGetExpenseOutOfBudget();
  const data = useMovementReport(getAllMovements(), "expenses", undefined);
  const totalExpensesOutOfBudget = useCurrencyFormatter({
    value: Math.abs(total),
  });

  return (
    <Container>
      <PageHeader title="Insights" />
      <TotalBudget />
      <Separator />
      <Container>
        <Text value="Budgets" size="lg" styles="pb-2" />
        {budgets.map((budget) => (
          <div key={budget.id} className="mb-4 rounded-3xl">
            <PercentageBar
              total={budget.amount}
              percentage={Math.abs(data[budget.category] ?? 0)}
              label={budget.name}
            />
          </div>
        ))}
      </Container>
      <Separator />
      <Container>
        <div className="py-2 mb-4 flex justify-between items-center w-full">
          <Text value="Expenses out of budget" size="lg" />
          <Text
            value={totalExpensesOutOfBudget}
            styles="font-bold text-rose-500"
          />
        </div>
        {movements.map((movement, index) => (
          <Transaction {...movement} key={`movement-${movement.id}-${index}`} />
        ))}
      </Container>
    </Container>
  );
};
