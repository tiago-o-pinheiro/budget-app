import { Container, Text } from "@components";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { useCurrencyFormatter } from "@hooks";

export const CategoryItem = ({
  category,
  value,
}: {
  category: string;
  value: number;
}) => {
  const formattedValue = useCurrencyFormatter({ value });
  const isExpense = value < 0;
  return (
    <Container
      styles="flex items-center justify-between mb-4 bg-white rounded-xl py-4 px-2"
      clean
    >
      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
        {isExpense ? (
          <ArrowTrendingDownIcon className="h-5 w-5 " />
        ) : (
          <ArrowTrendingUpIcon className="h-5 w-5 " />
        )}
      </div>
      <div className="flex-1 ml-4 flex items-center justify-between">
        <Text value={category} styles="font-medium" />
        <Text value={formattedValue} styles="font-thin" />
      </div>
    </Container>
  );
};
