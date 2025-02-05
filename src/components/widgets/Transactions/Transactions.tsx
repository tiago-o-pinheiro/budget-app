import {
  useAccountProvider,
  useCategoryProvider,
  useCurrencyFormatter,
} from "@hooks";
import { Container, Text, Title, Badge, ListSelect, Icon } from "@components";
import clsx from "clsx";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { MONTH_LIST } from "@constants";
import { filterMovementsBySelectedMonth, sortMovementsByDate } from "./utils";
import { Movement } from "@interfaces";

export const Transaction = ({
  name,
  value,
  account,
  category,
  id,
  date,
  accountId,
}: Movement) => {
  const formattedValue = useCurrencyFormatter({ value });
  const { getCategory } = useCategoryProvider();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
  }).format(new Date(date));

  const categoryData = getCategory(category);

  return (
    <Container styles="rounded-xl p-2 bg-white mb-4">
      <Link to={`/movement?accountId=${accountId}&movementId=${id}`}>
        <div className="flex items-center justify-between">
          <div
            className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full"
            style={{ backgroundColor: categoryData?.color }}
          >
            <Icon name={categoryData?.icon ?? ""} color="white" size="xs" />
          </div>

          <div className="flex-1 ml-4 flex flex-col">
            <Title value={name} size="xs" styles="text-base font-thin" />
            <Text
              value={account ?? ""}
              size="sm"
              color="secondary"
              styles="mb-2"
            />
            <Badge value={categoryData?.name ?? ""} size="xs" />
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

export const Transactions = ({ movements }: { movements: Movement[] }) => {
  const thisMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(thisMonth);
  const { getAccountMovement } = useAccountProvider();
  const { accountId } = useParams();

  const accountMovements = getAccountMovement(parseInt(accountId ?? ""));
  const transactions = accountMovements ?? movements;

  const filteredMovements = filterMovementsBySelectedMonth(
    transactions,
    selectedMonth
  )?.sort(sortMovementsByDate);

  const hasTransactions = filteredMovements?.length > 0;

  return (
    <Container
      styles="mt-2 pb-2 pt-8 px-4 rounded-3xl bg-gray-100/50 flex flex-col h-full"
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
        <div className="flex flex-col items-center justify-center h-64">
          <Text value="No transactions found" size="md" styles="text-center" />
        </div>
      )}
    </Container>
  );
};
