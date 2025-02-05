import { Container, Image, Text, Transaction } from "@components";
import { useCurrencyFormatter } from "@hooks";
import { Movement } from "@interfaces";

export const MovementsOutOfTheBudget = ({
  movements,
  total,
}: {
  movements: Movement[];
  total: number;
}) => {
  const totalExpensesOutOfBudget = useCurrencyFormatter({
    value: Math.abs(total),
  });
  if (!total) {
    return (
      <Container styles="flex flex-col justify-center items-center w-full h-full gap-4 my-8">
        <Text
          value="Good Job! No expenses out of the budget"
          styles="font-thin text-gray-500 text-xl"
        />
        <Image id={"saving_pig"} size="medium" alt="Good Job" />
      </Container>
    );
  }
  return (
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
  );
};
