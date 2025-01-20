import { useCurrencyFormatter, usePercentage } from "@hooks";
import { Text, Container } from "@components";

export const PercentageBar = ({
  total,
  percentage,
  label,
  color,
}: {
  total: number;
  percentage: number;
  label?: string;
  color?: string;
}) => {
  const barPercentage = usePercentage(total, percentage);
  const formattedValue = useCurrencyFormatter({ value: total });

  return (
    <Container clean>
      <div className="flex justify-between items-center">
        {label && (
          <div className="flex justify-between items-center gap-2 w-full mb-2">
            <Text value={label} size="md" styles="font-thin" />
            <Text value={formattedValue} size="md" styles="font-thin" />
          </div>
        )}
      </div>
      <div className="w-full h-4 bg-gray-300 rounded-full">
        <div
          className={`h-full ${
            color ? color : `bg-indigo-400`
          } rounded-full flex justify-end items-center`}
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
