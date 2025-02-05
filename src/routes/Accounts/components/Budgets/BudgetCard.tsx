import { useAccountProvider, useMovementReport } from "@hooks";
import { Account, Budget, Movement } from "@interfaces";
import { useState } from "react";
import { ManageBudget } from "./ManageBudget";
import { Container, PercentageBar } from "@components";

export const BudgetCard = ({
  budget,
  movements,
}: {
  budget: Budget;
  movements: Movement[];
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { getAccount } = useAccountProvider();
  const monthlyExpenses = useMovementReport(movements);
  const budgetTotal = monthlyExpenses.find(
    (el) => el.categoryId === budget.category
  );
  const account = getAccount(budget.accountId) as Account;

  return (
    <Container clean>
      <div
        className="w-full p-2 py-2 pb-4 border-b border-gray-200"
        onClick={() => setOpenModal(true)}
      >
        <PercentageBar
          total={budget.amount}
          percentage={Math.abs(budgetTotal?.total ?? 0)}
          label={budget.name}
          isActive={budget.status === "active"}
        />
      </div>
      {openModal && (
        <ManageBudget
          account={account}
          budgetId={budget.id}
          close={() => setOpenModal(false)}
        />
      )}
    </Container>
  );
};
