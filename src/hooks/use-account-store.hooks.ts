import { AccountsStore } from "@interfaces";
import { useAccountStore } from "@stores";

export const useAccountProvider = () => {
  const accounts = useAccountStore((state: AccountsStore) => state.accounts);

  const createAccount = useAccountStore(
    (state: AccountsStore) => state.createAccount
  );
  const removeAccount = useAccountStore(
    (state: AccountsStore) => state.removeAccount
  );
  const getAllMovements = useAccountStore(
    (state: AccountsStore) => state.getAllMovements
  );
  const editAccount = useAccountStore(
    (state: AccountsStore) => state.editAccount
  );

  const getTotalBalance = useAccountStore(
    (state: AccountsStore) => state.getTotalBalance
  );

  const totalBalance = getTotalBalance();

  const getAccount = (accountId: number) => {
    return accounts.find((account) => account.id === accountId);
  };

  const addMovement = useAccountStore(
    (state: AccountsStore) => state.addMovement
  );
  const removeMovement = useAccountStore(
    (state: AccountsStore) => state.removeMovement
  );

  const getAccountMovement = (accountId: number) => {
    const account = getAccount(accountId);
    return account?.movements?.map((movement) => ({
      ...movement,
      account: account.name,
      accountId: account.id,
    }));
  };

  const getAccountArray = (id?: number) => {
    if (!id) return accounts;
    const account = getAccount(id);
    return [account];
  };

  const transferMoney = (from: number, to: number, value: number) => {
    const fromAccount = getAccount(from);
    const toAccount = getAccount(to);
    const today = new Date().toISOString();

    if (fromAccount && toAccount) {
      addMovement(from, {
        value: -value,
        name: `Transfer between accounts`,
        date: today,
        description: `Transfer to ${toAccount.name}`,
        category: "Transfer",
      });

      addMovement(to, {
        value,
        name: `Transfer between accounts`,
        date: today,
        description: `Transfer from ${fromAccount.name}`,
        category: "Transfer",
      });
    }
  };

  return {
    accounts,
    totalBalance,
    transferMoney,
    createAccount,
    removeAccount,
    getAllMovements,
    removeMovement,
    addMovement,
    editAccount,
    getAccount,
    getAccountArray,
    getAccountMovement,
  };
};
