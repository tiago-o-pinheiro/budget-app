import { useCurrencyFormatter } from "@hooks";
import { Container, Text, Title, Avatar, Badge, ListSelect } from "@components";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MONTH_LIST } from "@constants";
import { TransactionItemProps } from "./transaction.interface";
import { filterMovementsBySelectedMonth, sortMovementsByDate } from "./utils";

const Transaction = ({
  name,
  value,
  account,
  category,
  id,
  date,
  accountId,
}: TransactionItemProps) => {
  const formattedValue = useCurrencyFormatter({ value });

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
  }).format(new Date(date));

  return (
    <Container styles="rounded-xl p-2 bg-white mb-4">
      <Link to={`/movement?accountId=${accountId}&movementId=${id}`}>
        <div className="flex items-center justify-between">
          <Avatar value={name} />

          <div className="flex-1 ml-4 flex flex-col">
            <Title value={name} size="xs" styles="text-base font-thin" />
            <Text value={account} size="sm" color="secondary" styles="mb-2" />
            <Badge value={category} />
          </div>

          <div className="text-right">
            <Text
              value={formattedValue}
              size="md"
              styles={clsx(
                "font-bold",
                value < 0 ? "text-red-500" : "text-green-500"
              )}
            />
            <Text
              value={formattedDate}
              size="sm"
              styles="text-xs text-gray-400 mt-1"
            />
          </div>
        </div>
      </Link>
    </Container>
  );
};

export const Transactions = ({
  movements,
}: {
  movements: TransactionItemProps[];
}) => {
  const thisMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(thisMonth);
  const hasTransactions = movements?.length > 0;

  const filteredMovements = filterMovementsBySelectedMonth(
    movements,
    selectedMonth
  )?.sort(sortMovementsByDate);

  return (
    <Container
      styles="mt-2 pb-2 pt-8 px-4 rounded-t-3xl bg-gray-100/50 flex flex-col overflow-y-auto absolute top-62 left-2 right-2 h-full"
      clean
    >
      <div className="flex justify-between items-center mb-4">
        <Text value="Transactions" size="lg" styles="font-medium w-8/12" />
        <ListSelect
          options={MONTH_LIST}
          onClick={setSelectedMonth}
          styles={{
            containerStyles: "w-4/12",
            optionsStyles: "",
            selectedStyles: "",
          }}
        />
      </div>
      {hasTransactions ? (
        filteredMovements.map((movement, index) => (
          <Transaction key={`${index}-${movement.id}`} {...movement} />
        ))
      ) : (
        <Text value="No transactions" size="md" styles="text-center" />
      )}
    </Container>
  );
};
