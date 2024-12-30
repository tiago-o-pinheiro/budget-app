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
  primary: "text-dark",
  secondary: "text-gray-400",
  white: "text-white",
  black: "text-black",
  red: "text-red-500",
  green: "text-green-500",
};

type Sizes = "xs" | "sm" | "md" | "lg" | "xl";

type TextColor = "primary" | "secondary" | "white" | "black" | "red" | "green";

interface TypoProps {
  type: "text" | "title";
  value: string;
  size?: Sizes;
  color?: TextColor;
  styles?: string;
}

const TypoStypes = (
  type: string,
  size: string,
  color: string,
  styles: string = ""
) => {
  return clsx(type === "text" ? "font-sans" : "font-mono", size, color, styles);
};

const Typo = ({
  type,
  value,
  size = "md",
  color = "primary",
  styles,
}: TypoProps) => {
  const Component = TYPES[type] as React.ElementType;

  const componentStyles = TypoStypes(type, SIZES[size], COLORS[color], styles);

  return (
    <Component className={clsx(componentStyles, styles)}>{value}</Component>
  );
};

export const Title = ({
  value,
  size = "md",
  color = "primary",
  styles,
}: Omit<TypoProps, "type">) => {
  return (
    <Typo
      type="title"
      value={value}
      size={size}
      color={color}
      styles={styles}
    />
  );
};

export const Text = ({
  value,
  size = "md",
  color = "primary",
  styles,
}: Omit<TypoProps, "type">) => {
  return (
    <Typo type="text" value={value} size={size} color={color} styles={styles} />
  );
};
