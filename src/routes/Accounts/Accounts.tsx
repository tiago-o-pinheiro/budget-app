import { AddAccount } from "@components";
import { useAccountProvider, useModalProvider } from "@hooks";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

const AccountsDashboard = () => {
  const { accounts } = useAccountProvider();

  return (
    <div>
      Accounts
      {accounts.map((account) => (
        <div key={account.id}>
          <p>{account.name}</p>
          <p>{account.balance}</p>
        </div>
      ))}
      <AddAccount />
    </div>
  );
};

const AddNewAccountPage = () => {
  const { setModal } = useModalProvider();
  useEffect(() => {
    setModal("ADD_ACCOUNT");
  }, []);

  return null;
};

export const Accounts = () => {
  return (
    <Routes>
      <Route path="/" element={<AccountsDashboard />} />
      <Route path="/:accountId" element={<div>Account Id</div>} />
      <Route path="/new" element={<AddNewAccountPage />} />
    </Routes>
  );
};
