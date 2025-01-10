import { Container, Text, Title } from "@components";
import { useCurrencyFormatter } from "@hooks";

export const ReportPills = ({
  value,
  label,
}: {
  value: number;
  label: string;
}) => {
  const formattedValue = useCurrencyFormatter({ value });

  if (value === 0) return null;

  return (
    <Container styles="flex items-center justify-center flex-col bg-gray-100 rounded-3xl p-1 gap-2 w-full transition-all duration-300 hover:bg-gray-200 cursor-pointer">
      <Title value={label} styles="capitalize" size="xs" color="secondary" />
      <Text value={formattedValue} size="md" styles="font-thin" />
    </Container>
  );
};
