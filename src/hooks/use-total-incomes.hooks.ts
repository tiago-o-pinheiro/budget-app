import { filterMovementByMonth } from "@config";
import { useAccountProvider } from "@hooks";

export const useTotalIncomes = (date?: string) => {
  const { getAllMovements } = useAccountProvider();
  const movements = getAllMovements();
  const filteredMovements = filterMovementByMonth(movements, date);

  return filteredMovements.reduce((acc, movement) => {
    return movement.value > 0 ? acc + movement.value : acc;
  }, 0);
};
