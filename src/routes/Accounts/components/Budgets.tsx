import {
  Button,
  ConfirmDialog,
  Container,
  Input,
  Modal,
  Select,
  SwitchButton,
  Text,
} from "@components";
import {
  BanknotesIcon,
  CurrencyEuroIcon,
  HeartIcon,
  PencilIcon,
  QueueListIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  useAccountProvider,
  useCurrencyFormatter,
  useGetCategories,
  useMovementReport,
} from "@hooks";
import { Account, Budget, Movement } from "@interfaces";
import { useAccountStore } from "@stores";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

type Status = "active" | "inactive";

interface BudgetFormProps extends Omit<Budget, "id" | "accountId"> {
  name: string;
  amount: number;
  category: string;
  status: Status;
}

const defaultValueBudget = {
  name: "",
  category: "",
};

const AddBudget = ({
  accountId,
  close,
  budgetId,
}: {
  accountId: number;
  budgetId?: number;
  close: () => void;
}) => {
  const [status, setStatus] = useState<Status>("active");
  const { addBudget, editBudget, getBudget } = useAccountProvider();
  const categories = useGetCategories();

  const budgetExists = budgetId ? getBudget(accountId, budgetId) : null;

  const methods = useForm<BudgetFormProps>({
    defaultValues: budgetExists ?? defaultValueBudget,
  });

  const { formState } = methods;

  const handleSubmit = (data: BudgetFormProps) => {
    if (budgetExists && budgetId) {
      editBudget(accountId, budgetId, { ...data, status });
      return handleClose();
    }

    addBudget(accountId, {
      ...data,
      status: "active",
      accountId: accountId,
    });
    handleClose();
  };

  const handleClose = () => {
    close();
  };

  if (!accountId) {
    return <div>Account not found</div>;
  }

  return (
    <Modal title="Add Budget" isOpen={true}>
      <Container>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <Input
              type="text"
              name="name"
              label="Name"
              placeholder="Add a budget name"
              isRequired
              error={Boolean(formState.errors.name)}
            >
              <BanknotesIcon className="h-5 w-5 text-gray-500" />
            </Input>
            <Input
              type="number"
              name="amount"
              label="Amount"
              isRequired
              error={Boolean(formState.errors.amount)}
            >
              <CurrencyEuroIcon className="h-5 w-5 text-gray-500" />
            </Input>
            <Select
              data={categories}
              label="Category"
              name="category"
              error={Boolean(formState.errors.category)}
            >
              <QueueListIcon className="h-5 w-5 text-gray-500" />
            </Select>
            <div>
              <SwitchButton
                values={["active", "inactive"]}
                handleClick={(value) => setStatus(value as Status)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button title="Cancel" onClick={handleClose}>
                <XMarkIcon className="h-5 w-5 text-black" />
              </Button>
              <Button type="submit" title="Save" family="ghost">
                <HeartIcon className="h-5 w-5 text-black" />
              </Button>
            </div>
          </form>
        </FormProvider>
      </Container>
    </Modal>
  );
};

const calculatePergentage = (total: number, value: number) => {
  const percentage = (value * 100) / total;
  return percentage > 100 ? 100 : percentage;
};

const BudgetCard = ({
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
        <AddBudget
          accountId={budget.accountId}
          budgetId={budget.id}
          close={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export const Budgets = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { accountId } = useParams();
  const { getAccount } = useAccountProvider();
  const account = getAccount(Number(accountId)) as Account;

  if (!account?.budgets) {
    return null;
  }

  return (
    <Container clean>
      {account?.budgets.length > 0 ? (
        <div className="flex flex-col gap-4">
          {account.budgets.map((budget) => (
            <BudgetCard
              budget={budget}
              key={budget.id}
              movements={account.movements ?? []}
              accountId={account.id}
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
        <AddBudget accountId={account.id} close={() => setOpenModal(false)} />
      ) : null}
    </Container>
  );
};
