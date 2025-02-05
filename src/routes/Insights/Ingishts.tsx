import { Container, PageHeader, Separator, Text } from "@components";
import {
  useAccountProvider,
  useMovementReport,
  useMonthTotalBalance,
} from "@hooks";
import { BudgetList } from "./components/BudgetList";
import { MovementsOutOfTheBudget } from "./components/MovementsOutOfTheBudget";
import { TotalBudget } from "./components/TotalBudget";
import { useGetExpenseOutOfBudget } from "./use-get-out-of-the-budget.hook";

export const Insights = () => {
  const { budgets } = useMonthTotalBalance();
  const { getAllMovements } = useAccountProvider();
  const { movements, total } = useGetExpenseOutOfBudget();
  const expensesPerCategory = useMovementReport(getAllMovements());

  return (
    <Container>
      <PageHeader title="Insights" />
      <TotalBudget />
      <Separator />
      <Container>
        <Text value="Budgets" size="lg" styles="pb-2" />
        <BudgetList
          budgets={budgets}
          expensesPerCategory={expensesPerCategory}
        />
      </Container>
      <Separator />
      <MovementsOutOfTheBudget total={total} movements={movements} />
    </Container>
  );
};
