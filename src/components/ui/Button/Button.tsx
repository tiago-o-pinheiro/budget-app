import clsx from "clsx";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  family?: "primary" | "secondary" | "ghost" | "nav" | "danger";
  title: string;
  size?: "sm" | "md" | "lg";
}

const buttonStyles = (family: string, size: string) => {
  return clsx(
    "p-2  pr-4 rounded-2xl font-thin text-white m-1 border",
    `${family === "primary" && "bg-gray-200 "}`,
    `${family === "secondary" && "bg-gray-50 "}`,
    `${family === "ghost" && "bg-transparent border-gray-200 "}`,
    `${family === "nav" && "bg-transparent border-transparent "}`,
    `${family === "danger" && "bg-transparent border-rose-200"}`,
    `${size === "sm" && "text-xs "}`,
    `${size === "md" && "text-sm "}`,
    `${size === "lg" && "text-lg "}`
  );
};

const textStyles = (family: string, size: string) => {
  return clsx(
    `${family === "primary" && "text-black "}`,
    `${family === "secondary" && "text-gray-500"}`,
    `${family === "ghost" && "text-gray-500"}`,
    `${family === "nav" && "text-gray-500"}`,
    `${family === "danger" && "text-rose-500 "}`,
    `${size === "sm" && "text-xs "}`,
    `${size === "md" && "text-sm "}`,
    `${size === "lg" && "text-lg "}`
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
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonStyles(family, size)}
    >
      <div className="flex items-center justify-center gap-1">
        <div>{children}</div>
        <p className={textStyles(family, size)}>{title}</p>
      </div>
    </button>
  );
};
