import { ICON_LIST } from "@constants";
import clsx from "clsx";
import { FaGripLines } from "react-icons/fa6";

interface IconProps {
  name?: string;
  size?: "sm" | "md" | "lg" | "xs";
  color?: "primary" | "secondary";
  styles?: string;
  children?: React.ReactNode;
  bgColor?: string;
}

const COLORS = {
  primary: "text-dark dark:text-white",
  secondary: "text-gray-500 dark:text-gray-300",
};

const SIZES = {
  xs: "size-6",
  sm: "size-7",
  md: "size-8",
  lg: "size-9",
};

const VECTOR_ICONS = (name: string) => {
  const icon = ICON_LIST.find((icon) => icon.name === name);

  const IconComponent = icon?.component || FaGripLines;

  return <IconComponent />;
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
      {children ?? VECTOR_ICONS(name ?? "")}
    </div>
  );
};
