import { useThemeStore } from "@stores";
import { useEffect } from "react";

export const useThemeEffect = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      document.documentElement.classList.add("dark");
    } else {
      html.classList.remove("dark");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return { toggleTheme, theme };
};
