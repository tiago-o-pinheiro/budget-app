import { Budget } from "./budget.interface";
import { Movement } from "./movement.interface";

export type AccountType = "checking" | "savings" | "credit" | "investment";

export interface Account {
  id: number;
  name: string;
  owner?: string;
  balance: number;
  description?: string;
  iban?: string;
  swift?: string;
  movements?: Movement[];
  budgets?: Budget[];
  type?: AccountType;
  isMain?: boolean;
}
