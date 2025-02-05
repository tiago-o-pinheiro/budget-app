import { ICON_LIST } from "@constants";
import clsx from "clsx";
import { FaGripLines } from "react-icons/fa6";

interface IconProps {
  name?: string;
  size?: "sm" | "md" | "lg" | "xs";
  color?: "primary" | "secondary" | "white";
  styles?: string;
  children?: React.ReactNode;
  bgColor?: string;
}

const COLORS = {
  primary: "text-dark dark:text-white",
  secondary: "text-gray-500 dark:text-gray-300",
  white: "text-white",
};

const SIZES = {
  xs: "size-5",
  sm: "size-7",
  md: "size-8",
  lg: "size-9",
};

const VECTOR_ICONS = (name: string, size: string) => {
  const icon = ICON_LIST.find((icon) => icon.name === name);

  const IconComponent = icon?.component || FaGripLines;

  return <IconComponent className={size} />;
};

export const Icon = ({
  size = "xs",
  color = "primary",
  name,
  styles,
  children,
  bgColor,
}: IconProps) => {
  return (
    <div
      className={clsx(
        SIZES[size],
        COLORS[color ?? "primary"],
        styles,
        "rounded-full flex items-center justify-center"
      )}
      style={{ backgroundColor: bgColor }}
    >
      {children ?? VECTOR_ICONS(name ?? "", SIZES[size])}
    </div>
  );
};
