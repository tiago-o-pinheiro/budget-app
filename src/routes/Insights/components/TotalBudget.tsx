import { Container, PercentageBar, Text } from "@components";
import {
  useMonthTotalBalance,
  usePercentage,
  useCurrencyFormatter,
} from "@hooks";

export const TotalBudget = () => {
  const { totalExpenses, incomes } = useMonthTotalBalance();
  const percentage = usePercentage(incomes, totalExpenses);
  const formattedIncome = useCurrencyFormatter({
    value: incomes - totalExpenses,
  });

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
