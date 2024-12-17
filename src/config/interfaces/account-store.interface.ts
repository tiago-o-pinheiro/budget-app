import { Account } from "./account.interface";
import { Movement } from "./movement.interface";

export interface AccountsStore {
  accounts: Account[];
  createAccount: (account: Omit<Account, "id">) => void;
  removeAccount: (id: string) => void;
  getAllMovements: () => Movement[];
  getTotalBalance: () => number;
  editAccount: (id: string, updatedAccount: Partial<Account>) => void;
  addMovement: (accountId: string, movement: Omit<Movement, "id">) => void;
  removeMovement: (accountId: string, movementId: number) => void;
}
