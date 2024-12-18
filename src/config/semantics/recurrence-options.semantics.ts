interface RecurrencyOptionsProps {
  label: string;
  value: string;
}

export const RECURRENCY_OPTIONS: RecurrencyOptionsProps[] = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];
