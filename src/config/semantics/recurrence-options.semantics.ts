interface RecurrencyOptionsProps {
  name: string;
  value: string;
  id: number;
}

export const RECURRENCY_OPTIONS: RecurrencyOptionsProps[] = [
  { name: "Daily", value: "daily", id: 1 },
  { name: "Weekly", value: "weekly", id: 2 },
  { name: "Monthly", value: "monthly", id: 3 },
  { name: "Yearly", value: "yearly", id: 4 },
];
