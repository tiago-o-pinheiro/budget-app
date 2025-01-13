import { Route, Routes } from "react-router-dom";
import { BottomNav, Container, ModalProvider } from "@components";
import { Accounts, Dashboard, Insights, Reports } from "@routes";
import { useThemeEffect } from "./hooks/use-theme.hooks";

export const App = () => {
  useThemeEffect();
  return (
    <div className="h-full">
      <ModalProvider />
      <Container clean>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/accounts/*" element={<Accounts />} />
          <Route path="/reports/*" element={<Reports />} />
          <Route path="/insights/*" element={<Insights />} />
        </Routes>
      </Container>
      <BottomNav />
    </div>
  );
};
