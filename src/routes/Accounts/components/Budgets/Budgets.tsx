import { Button, Container, Text } from "@components";
import { useAccountProvider } from "@hooks";
import { Account } from "@interfaces";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BudgetCard } from "./BudgetCard";
import { ManageBudget } from "./ManageBudget";

export const Budgets = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { accountId } = useParams();
  const { getAccount } = useAccountProvider();
  const account = getAccount(Number(accountId)) as Account;

  return (
    <Container clean styles="mb-12">
      {account?.budgets && account?.budgets.length > 0 ? (
        <div className="flex flex-col gap-4">
          {account.budgets.map((budget) => (
            <BudgetCard
              budget={budget}
              key={budget.id}
              movements={account.movements ?? []}
            />
          ))}
          <div className="flex justify-end items-center">
            <Button
              title="Add Budget"
              family="primary"
              onClick={() => setOpenModal(true)}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-40 gap-8">
          <Text value="No budgets found" size="md" color="secondary" />
          <Button
            title="Add Budget"
            family="primary"
            onClick={() => setOpenModal(true)}
          />
        </div>
      )}
      {openModal ? (
        <ManageBudget account={account} close={() => setOpenModal(false)} />
      ) : null}
    </Container>
  );
};
