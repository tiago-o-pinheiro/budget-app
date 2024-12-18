import { Route, Routes } from "react-router-dom";
import { Header, ModalProvider } from "@components";
import { Accounts, Dashboard } from "@routes";

export const App = () => {
  return (
    <div>
      <Header />
      <ModalProvider />
      <Routes>
        <Route path="/*" element={<Dashboard />} />
        <Route path="/accounts/*" element={<Accounts />} />
      </Routes>
    </div>
  );
};
