interface BadgeProps {
  value: string;
  color?: string;
}

export const Badge = ({ value, color }: BadgeProps) => {
  return (
    <span
      className={`text-xs rounded-full px-2 py-1 w-max capitalize ${
        color ? color : "bg-gray-200 text-gray-800"
      }`}
    >
      {value}
    </span>
  );
};
