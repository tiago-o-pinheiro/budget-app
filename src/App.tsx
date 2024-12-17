import { Header } from "@components";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
      </Routes>
    </div>
  );
};
