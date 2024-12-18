import { AddMovement, Balance, Transactions } from "@components";
import { useAccountProvider } from "@hooks";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

const DashboardContent = () => {
  const { totalBalance, accounts } = useAccountProvider();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (accounts.length === 0) {
      navigate("/accounts/new", { state: { from: location } });
    }
  }, [accounts, navigate, location]);

  if (accounts.length === 0) {
    return null;
  }

  return (
    <div>
      <Balance balance={totalBalance} />
      <Transactions />
      <AddMovement />
    </div>
  );
};

export const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardContent />} />
      <Route path="/:accountId" element={<div>Account Id</div>} />
    </Routes>
  );
};
