import { Movement } from "@interfaces";
import { TransactionItemProps } from "./transaction.interface";

export const sortMovementsByDate = (a: Movement, b: Movement) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
};

export const filterMovementsBySelectedMonth = (
  movements: TransactionItemProps[],
  selectedMonth: number
) => {
  return movements?.filter((movement) => {
    const movementDate = new Date(movement.date);
    return movementDate.getMonth() + 1 === selectedMonth;
  });
};
