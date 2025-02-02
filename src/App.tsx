import { Route, Routes } from "react-router-dom";
import { BottomNav, Container, ModalProvider } from "@components";
import { Accounts, Categories, Dashboard, Reports, Settings } from "@routes";
import { useThemeEffect } from "./hooks/use-theme.hooks";
import { Insights } from "./routes/Insights/Ingishts";

export const App = () => {
  useThemeEffect();
  return (
    <div className="h-full">
      <ModalProvider />
      <Container clean styles="md:max-w-2xl lg:max-w-2xl xl:max-w-2xl mx-auto">
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/accounts/*" element={<Accounts />} />
          <Route path="/reports/*" element={<Reports />} />
          <Route path="/insights/*" element={<Insights />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/settings/categories" element={<Categories />} />
        </Routes>
      </Container>
      <BottomNav />
    </div>
  );
};
