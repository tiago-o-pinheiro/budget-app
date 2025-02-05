import { Container, Title } from "@components";
import { useAccountProvider, useMovementReport } from "@hooks";
import { CategoryItem } from "./CategoryItem";

export const MonthOverview = ({
  month,
  type,
}: {
  month: number;
  type: "expenses" | "incomes";
}) => {
  const { getAllMovements } = useAccountProvider();
  const movements = getAllMovements();
  const selectedMovements = movements.filter((movement) => {
    return type === "expenses" ? movement.value < 0 : movement.value > 0;
  });

  const data = useMovementReport(selectedMovements, month, "all");

  const hasData = Object.keys(data).length > 0;
  return (
    <Container
      styles="mt-2 py-8 px-4 rounded-3xl bg-gray-100 flex flex-col m-h-3.5"
      clean
    >
      {!hasData ? (
        <Title
          value="No data available for selected month"
          size="md"
          styles="text-center"
        />
      ) : (
        data.map((item) => (
          <CategoryItem
            key={item.categoryId}
            category={item.categoryName}
            value={item.total}
          />
        ))
      )}
    </Container>
  );
};
