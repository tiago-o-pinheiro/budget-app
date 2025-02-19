import { Route, Routes } from "react-router-dom";

import { MovementDetails } from "./components/MovementDetails";
import { Exchange } from "./components/Exchange";

import { DashboardContent } from "./components/DashboardContent";

export const Dashboard = () => {
  return (
    <>
      <Routes>
        <Route path="/:accountId?" element={<DashboardContent />} />
        <Route path="/movement/*" element={<MovementDetails />} />
        <Route path="/exchange" element={<Exchange />} />
      </Routes>
    </>
  );
};
