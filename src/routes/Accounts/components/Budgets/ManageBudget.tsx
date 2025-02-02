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
  AdjustmentsHorizontalIcon,
  BanknotesIcon,
  CurrencyEuroIcon,
  HeartIcon,
  QueueListIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAccountProvider, useCategoryProvider } from "@hooks";
import { Account, Budget } from "@interfaces";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Status = "active" | "inactive";

interface BudgetFormProps extends Omit<Budget, "id" | "account.id"> {
  name: string;
  amount: number;
  category: string;
  status: Status;
  type: "expense" | "income";
}

const defaultValueBudget = {
  name: "",
  category: "",
};

const useManageBudgetForm = (account: Account, budgetId?: number) => {
  const budget = account?.budgets?.find((budget) => budget.id === budgetId);

  const methods = useForm<BudgetFormProps>({
    defaultValues: budget ?? defaultValueBudget,
  });

  return {
    methods,
    formState: methods.formState,
    handleSubmit: methods.handleSubmit,
    budget,
  };
};

export const ManageBudget = ({
  account,
  close,
  budgetId,
}: {
  account: Account;
  budgetId?: number;
  close: () => void;
}) => {
  const [openConfirmationDialog, setOpenConfirmDialog] =
    useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(true);
  const { addBudget, editBudget, removeBudget } = useAccountProvider();
  const { categories } = useCategoryProvider();

  const { methods, formState, handleSubmit, budget } = useManageBudgetForm(
    account,
    budgetId
  );

  const submitForm = (data: BudgetFormProps) => {
    const budgetStatus = status ? "active" : "inactive";
    if (budget && budgetId) {
      editBudget(account.id, budgetId, { ...data, status: budgetStatus });
      return handleClose();
    }

    addBudget(account.id, {
      ...data,
      status: budgetStatus,
      accountId: account.id,
    });
    handleClose();
  };

  const handleClose = () => {
    close();
  };

  const handleDetele = () => {
    if (budgetId === null || budgetId === undefined) return;
    removeBudget(account.id, budgetId);
    setOpenConfirmDialog(false);
    handleClose();
  };

  useEffect(() => {
    if (budget) {
      const status = budget.status === "active";
      setStatus(status);
    }
  }, []);

  return (
    <Modal title={budget ? budget.name : "Add Budget"} close={handleClose}>
      {openConfirmationDialog ? (
        <ConfirmDialog
          title="Delete Budget"
          text="Are you sure you want to perform this action? This can't be undone"
          cancelAction={() => setOpenConfirmDialog(false)}
          confirmAction={handleDetele}
        />
      ) : null}
      <Container>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submitForm)}>
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
            <Select
              data={[
                { id: 0, name: "Expense", value: "expense" },
                { id: 1, name: "Income", value: "income" },
              ]}
              label="Type"
              name="type"
              error={Boolean(formState.errors.type)}
            >
              <QueueListIcon className="h-5 w-5 text-gray-500" />
            </Select>
            <div className="flex items-center justify-between bg-gray-200 rounded-3xl p-4 mb-2">
              <div className="flex items-center gap-2 ml-2">
                <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" />
                <Text
                  value="Enable budget"
                  color="secondary"
                  styles="text-gray-500/70"
                />
              </div>
              <SwitchButton
                values={["active", "inactive"]}
                defaultValue={status}
                handleClick={(value) => setStatus(value as boolean)}
                type="boolean"
              />
            </div>

            <div className="flex justify-end items-center py-2">
              <Button title="Cancel" onClick={handleClose}>
                <XMarkIcon className="h-5 w-5 text-black" />
              </Button>
              {budget ? (
                <Button
                  title="Delete"
                  family="danger"
                  onClick={() => setOpenConfirmDialog(true)}
                >
                  <TrashIcon className="h-5 w-5 text-rose-500" />
                </Button>
              ) : null}

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
