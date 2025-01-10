import { Route, Routes } from "react-router-dom";
import { BottomNav, ModalProvider } from "@components";
import { Accounts, Dashboard, Reports } from "@routes";
import { useThemeEffect } from "./hooks/use-theme.hooks";

import clsx from "clsx";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className={clsx("overflow-y-auto px-4")}>{children}</div>;
};

export const App = () => {
  useThemeEffect();
  return (
    <div className="h-full">
      <ModalProvider />
      <Container>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/accounts/*" element={<Accounts />} />
          <Route path="/reports/*" element={<Reports />} />
        </Routes>
      </Container>
      <BottomNav />
    </div>
  );
};
