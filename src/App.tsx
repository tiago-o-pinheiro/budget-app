import { Route, Routes } from "react-router-dom";
import { BottomNav, Container, ModalProvider } from "@components";
import { Accounts, Dashboard, Reports } from "@routes";
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
        </Routes>
      </Container>
      <BottomNav />
    </div>
  );
};
