import { useCurrencyFormatter, usePercentage } from "@hooks";
import { Text, Container } from "@components";
import clsx from "clsx";

const barColor = (active: boolean, color?: string) => {
  if (active) {
    return clsx(color ? color : `bg-indigo-400`);
  }

  return clsx("bg-gray-200");
};

export const PercentageBar = ({
  total,
  percentage,
  label,
  color,
  isActive = true,
}: {
  total: number;
  percentage: number;
  label?: string;
  color?: string;
  isActive?: boolean;
}) => {
  const barPercentage = usePercentage(total, percentage);
  const formattedValue = useCurrencyFormatter({ value: total });

  return (
    <Container clean>
      <div className="flex justify-between items-center">
        {label && (
          <div className="flex justify-between items-center gap-2 w-full mb-2">
            <Text
              value={label}
              size="md"
              styles={isActive ? "font-thin" : "font-thin text-gray-300"}
            />
            <Text
              value={formattedValue}
              size="md"
              styles={isActive ? "font-thin" : "font-thin text-gray-300"}
            />
          </div>
        )}
      </div>
      <div className="w-full h-4 bg-gray-300 rounded-full">
        <div
          className={`h-full ${barColor(
            isActive,
            color
          )} rounded-full flex justify-end items-center`}
          style={{ width: `${barPercentage}%` }}
        >
          {percentage > 0 && (
            <div className="rounded-full h-3 w-3 bg-white mx-1" />
          )}
        </div>
      </div>
    </Container>
  );
};
