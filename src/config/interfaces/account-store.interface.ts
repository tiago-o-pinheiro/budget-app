import { Account } from "./account.interface";
import { Movement } from "./movement.interface";

export interface AccountsStore {
  accounts: Account[];
  createAccount: (account: Omit<Account, "id">) => void;
  removeAccount: (id: number) => void;
  getAllMovements: () => Movement[];
  getTotalBalance: () => number;
  editAccount: (id: number, updatedAccount: Partial<Account>) => void;
  addMovement: (accountId: number, movement: Omit<Movement, "id">) => void;
  removeMovement: (accountId: number, movementId: number) => void;
}
