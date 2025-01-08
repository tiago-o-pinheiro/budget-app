import { Movement } from "@interfaces";

export interface TransactionItemProps extends Movement {
  account: string;
  date: string;
  accountId: number;
}
