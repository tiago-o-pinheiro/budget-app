import { Button, ConfirmDialog } from "@components";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCurrencyFormatter, useMovementReport } from "@hooks";
import { Budget, Movement } from "@interfaces";
import { useAccountStore } from "@stores";
import { useState } from "react";
import { ManageBudget } from "./ManageBudget";

const calculatePergentage = (total: number, value: number) => {
  const percentage = (value * 100) / total;
  return percentage > 100 ? 100 : percentage;
};

export const BudgetCard = ({
  budget,
  movements,
  accountId,
}: {
  budget: Budget;
  movements: Movement[];
  accountId: number;
}) => {
  const [openConfirmationDialog, setOpenConfirmDialog] =
    useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { removeBudget } = useAccountStore();
  const formattedBalance = useCurrencyFormatter({ value: budget.amount });
  const monthlyExpenses = useMovementReport(movements, "expenses");
  const totalAcheived = Math.abs(monthlyExpenses[budget.category] || 0);

  const percentage = calculatePergentage(budget.amount, totalAcheived);

  const handleDetele = () => {
    removeBudget(accountId, budget.id);
    setOpenConfirmDialog(false);
  };

  return (
    <div className="w-full rounded-3xl mb-2 p-2 pl-4 pt-4  bg-gray-100">
      <div className="flex flex-col justify-between px-2">
        <div className="flex justify-between py-2 ">
          <div>{budget.name}</div>
          <div>{formattedBalance}</div>
        </div>
        <div className="w-full bg-gray-200 h-4 rounded-full">
          <div
            className="h-4 bg-indigo-400 rounded-full flex items-center justify-end"
            style={{ width: `${percentage}%` }}
          >
            <span
              className={`text-[10px] text-white ${
                percentage > 0 ? "px-2" : "px-0"
              }`}
            >
              {percentage.toFixed(0)}%
            </span>
          </div>
        </div>
        <div className="flex justify-end items-center py-2">
          <Button
            title="Delete"
            family="danger"
            onClick={() => setOpenConfirmDialog(true)}
          >
            <TrashIcon className="h-5 w-5 text-rose-500" />
          </Button>
          <Button
            title="Edit"
            family="primary"
            onClick={() => setOpenModal(true)}
          >
            <PencilIcon className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </div>
      {openConfirmationDialog ? (
        <ConfirmDialog
          title="Delete Budget"
          text="Are you sure you want to perform this action? This can't be undone"
          cancelAction={() => setOpenConfirmDialog(false)}
          confirmAction={handleDetele}
        />
      ) : null}
      {openModal && (
        <ManageBudget
          accountId={budget.accountId}
          budgetId={budget.id}
          close={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};
