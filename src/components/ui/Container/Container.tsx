import { useThemeEffect } from "@hooks";
import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  styles?: string;
  clean?: boolean;
}

const containerStyles = (isDark: boolean, styles?: string, clean?: boolean) => {
  const bgColor = isDark ? "bg-gray-900" : "bg-white";
  return clsx(!clean ? "py-1 px-2" : "", `${styles}`, bgColor);
};

export const Container = ({ children, styles, clean }: ContainerProps) => {
  const { theme } = useThemeEffect();
  const isDark = theme === "dark";

  return (
    <div className={containerStyles(isDark, styles, clean)}>{children}</div>
  );
};
