interface BadgeProps {
  value: string;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const TEXT_SIZE = {
  xs: "text-xs/[8px]",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const Badge = ({ value, color, size }: BadgeProps) => {
  const displayValue =
    size === "xs" && value.length > 20 ? `${value.slice(0, 17)}...` : value;

  return (
    <span
      className={`rounded-full px-2 py-1 w-max capitalize ${
        color ? color : "bg-gray-200 text-gray-800"
      } ${TEXT_SIZE[size || "md"]}`}
      title={size === "xs" && value.length > 20 ? value : undefined}
    >
      {displayValue}
    </span>
  );
};
