import { parseFloatNumber } from "@config";
import { AccountsStore, Budget } from "@interfaces";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const generateId = (items: { id: number }[]) =>
  items.length > 0 ? items[items.length - 1].id + 1 : 0;

const initialState: AccountsStore = {
  accounts: [],
  createAccount: () => {},
  removeAccount: () => {},
  getAllMovements: () => [],
  getTotalBalance: () => 0,
  editAccount: () => {},
  addMovement: () => {},
  removeMovement: () => {},
  addBudget: () => {},
  removeBudget: () => {},
  editBudget: () => {},
};

export const useAccountStore = create<AccountsStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      createAccount: (account) =>
        set((state) => {
          const lastId = state.accounts.length
            ? state.accounts[state.accounts.length - 1].id
            : 0;

          const newAccount = { ...account, id: lastId + 1 };

          return { accounts: [...state.accounts, newAccount] };
        }),

      removeAccount: (id: number) =>
        set((state) => ({
          accounts: state.accounts.filter((account) => account.id !== id),
        })),

      addMovement: (accountId, movement) =>
        set((state) => ({
          accounts: state.accounts.map((account) => {
            if (account.id !== accountId) return account;

            const movements = account.movements || [];
            const newId = generateId(movements);

            const updatedMovements = [...movements, { ...movement, id: newId }];
            const updatedBalance = account.balance + movement.value;

            return {
              ...account,
              movements: updatedMovements,
              balance: parseFloatNumber(updatedBalance),
            };
          }),
        })),

      removeMovement: (accountName, movementId) =>
        set((state) => ({
          accounts: state.accounts.map((account) => {
            if (account.name !== accountName) return account;

            const movements = account.movements || [];
            const movementToRemove = movements.find((m) => m.id === movementId);

            const updatedMovements = movements.filter(
              (m) => m.id !== movementId
            );

            const updatedBalance =
              account.balance - (movementToRemove?.value || 0);

            return {
              ...account,
              movements: updatedMovements,
              balance: parseFloatNumber(updatedBalance),
            };
          }),
        })),

      editAccount: (id, updatedAccount) =>
        set((state) => ({
          accounts: state.accounts.map((account) =>
            account.id === id ? { ...account, ...updatedAccount } : account
          ),
        })),

      getAllMovements: () => {
        const { accounts } = get();
        return accounts.flatMap((account) =>
          (account.movements || []).map((movement) => ({
            ...movement,
            account: account.name,
            accountId: account.id,
          }))
        );
      },

      getTotalBalance: () => {
        const { accounts } = get();
        return accounts.reduce((total, account) => total + account.balance, 0);
      },

      addBudget: (accountId: number, budget: Omit<Budget, "id">) => {
        set((state) => ({
          accounts: state.accounts.map((account) => {
            console.log({ accountId });
            if (account.id !== accountId) return account;

            const budgets = account.budgets || [];
            const newId = generateId(budgets);

            const updatedBudgets = [...budgets, { ...budget, id: newId }];

            return {
              ...account,
              budgets: updatedBudgets,
            };
          }),
        }));
      },

      removeBudget: (accountId: number, budgetId: number) => {
        set((state) => ({
          accounts: state.accounts.map((account) => {
            if (account.id !== accountId) return account;

            const budgets = account.budgets || [];
            const updatedBudgets = budgets.filter((b) => b.id !== budgetId);

            return {
              ...account,
              budgets: updatedBudgets,
            };
          }),
        }));
      },

      editBudget: (
        accountId: number,
        budgetId: number,
        updatedBudget: Partial<Budget>
      ) => {
        set((state) => ({
          accounts: state.accounts.map((account) => {
            if (account.id !== accountId) return account;

            const budgets = account.budgets || [];
            const updatedBudgets = budgets.map((b) =>
              b.id === budgetId ? { ...b, ...updatedBudget } : b
            );

            return {
              ...account,
              budgets: updatedBudgets,
            };
          }),
        }));
      },
    }),
    { name: "accounts" }
  )
);
