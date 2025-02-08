import clsx from "clsx";
import { Text } from "@components";
import { useThemeEffect } from "@hooks";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  family?: "primary" | "secondary" | "ghost" | "nav" | "danger";
  title?: string;
  size?: "sm" | "md" | "lg";
}

const buttonSizes = (size: string) => {
  return clsx(
    `${size === "sm" ? "text-xs " : ""}`,
    `${size === "md" ? "text-sm " : ""}`,
    `${size === "lg" ? "text-lg" : ""}`
  );
};

const buttonStyles = (family: string, size: string, isDark: boolean) => {
  if (isDark) {
    return clsx(
      "p-2 rounded-2xl font-thin text-white m-1 border flex items-center justify-center",
      `${family === "primary" ? "bg-gray-800 " : ""}`,
      `${family === "secondary" ? "bg-gray-800 " : ""}`,
      `${family === "ghost" ? "bg-transparent border-gray-800 " : ""}`,
      `${family === "nav" ? "bg-transparent border-transparent " : ""}`,
      `${family === "danger" ? "bg-transparent border-rose-200" : ""}`,
      buttonSizes(size)
    );
  }

  return clsx(
    "p-2 rounded-2xl font-thin text-white m-1 border flex items-center justify-center",
    `${family === "primary" ? "bg-gray-200 " : ""}`,
    `${family === "secondary" ? "bg-gray-50 " : ""}`,
    `${family === "ghost" ? "bg-transparent border-gray-200 " : ""}`,
    `${family === "nav" ? "bg-transparent border-transparent " : ""}`,
    `${family === "danger" ? "bg-transparent border-rose-200" : ""}`,
    buttonSizes(size)
  );
};

const textStyles = (family: string, size: string, isDark: boolean) => {
  if (isDark) {
    return clsx(
      `${family === "primary" ? "text-white " : ""}`,
      `${family === "secondary" ? "text-gray-300 " : ""}`,
      `${family === "ghost" ? "text-gray-300 " : ""}`,
      `${family === "nav" ? "text-gray-300 " : ""}`,
      `${family === "danger" ? "text-rose-500 " : ""}`,
      buttonSizes(size)
    );
  }

  return clsx(
    `${family === "primary" ? "text-black " : ""}`,
    `${family === "secondary" ? "text-gray-500" : ""}`,
    `${family === "ghost" ? "text-gray-500" : ""}`,
    `${family === "nav" ? "text-gray-500" : ""}`,
    `${family === "danger" ? "text-rose-500 " : ""}`,
    buttonSizes(size)
  );
};

export const Button = ({
  children,
  onClick = () => {},
  type = "button",
  family = "primary",
  title,
  size = "md",
}: ButtonProps) => {
  const { theme } = useThemeEffect();
  const isDark = theme === "dark";
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonStyles(family, size, isDark)}
    >
      <div className="flex items-center justify-center gap-1">
        <div className={textStyles(family, size, isDark)}>{children}</div>
        {title && (
          <Text styles={textStyles(family, size, isDark)} value={title} />
        )}
      </div>
    </button>
  );
};
