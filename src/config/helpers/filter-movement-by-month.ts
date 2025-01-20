import { Movement } from "@interfaces";

const getDate = (date?: string) => {
  if (!date) return new Date();
  return new Date(date);
};

export const filterMovementByMonth = (movements: Movement[], date?: string) => {
  const currentMonth = getDate(date).getMonth() + 1;
  return movements.filter((movement) => {
    const movementDate = new Date(movement.date);
    return movementDate.getMonth() + 1 === currentMonth;
  });
};
