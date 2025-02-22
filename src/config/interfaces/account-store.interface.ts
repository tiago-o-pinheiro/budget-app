import { Account } from "./account.interface";
import { Budget } from "./budget.interface";
import { Movement } from "./movement.interface";

export interface AccountsStore {
  accounts: Account[];
  createAccount: (account: Omit<Account, "id">) => void;
  removeAccount: (id: number) => void;
  getAllMovements: () => Movement[];
  getTotalBalance: () => number;
  editAccount: (id: number, updatedAccount: Partial<Account>) => void;
  addMovement: (accountId: number, movement: Omit<Movement, "id">) => void;
  removeMovement: (accountName: string, movementId: number) => void;
  addBudget: (accountId: number, budget: Omit<Budget, "id">) => void;
  removeBudget: (accountId: number, budgetId: number) => void;
  editBudget: (
    accountId: number,
    budgetId: number,
    updatedBudget: Partial<Budget>
  ) => void;
}
