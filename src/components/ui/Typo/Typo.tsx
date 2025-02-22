import clsx from "clsx";

const TYPES = {
  text: "p",
  title: "h1",
};

const SIZES = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-3xl",
};

const COLORS = {
  primary: "text-dark dark:text-white",
  secondary: "text-gray-500 dark:text-gray-300",
  white: "text-white",
  black: "text-black",
  red: "text-red-500",
  green: "text-green-500",
};

type Sizes = "xs" | "sm" | "md" | "lg" | "xl";

type TextColor = "primary" | "secondary" | "white" | "black" | "red" | "green";

interface TypoProps {
  type: "text" | "title";
  value?: string | number | null;
  size?: Sizes;
  color?: TextColor;
  styles?: string;
  ellipsis?: boolean;
}

const TypoStypes = (
  type: string,
  size: string,
  color: string,
  styles: string = "",
  ellipsis: boolean = false
) => {
  return clsx(
    type === "text" ? "font-sans" : "font-mono",
    size,
    color,
    ellipsis ? "overflow-hidden text-ellipsis whitespace-nowrap" : "",
    styles
  );
};

const Typo = ({
  type,
  value,
  size = "md",
  color = "primary",
  styles,
  ellipsis = false,
}: TypoProps) => {
  const Component = TYPES[type] as React.ElementType;

  if (!value) return null;

  const componentStyles = TypoStypes(
    type,
    SIZES[size],
    COLORS[color],
    styles,
    ellipsis
  );

  return (
    <Component className={clsx(componentStyles, styles)}>{value}</Component>
  );
};

export const Title = ({
  value,
  size = "md",
  color = "primary",
  styles,
  ellipsis = false,
}: Omit<TypoProps, "type"> & { ellipsis?: boolean }) => {
  return (
    <Typo
      type="title"
      value={value}
      size={size}
      color={color}
      styles={styles}
      ellipsis={ellipsis}
    />
  );
};

export const Text = ({
  value,
  size = "md",
  color = "primary",
  styles,
  ellipsis = false,
}: Omit<TypoProps, "type"> & { ellipsis?: boolean }) => {
  return (
    <Typo
      type="text"
      value={value}
      size={size}
      color={color}
      styles={styles}
      ellipsis={ellipsis}
    />
  );
};
