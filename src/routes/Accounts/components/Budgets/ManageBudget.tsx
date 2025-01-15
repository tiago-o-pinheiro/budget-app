import {
  Button,
  Container,
  Input,
  Modal,
  Select,
  SwitchButton,
} from "@components";
import {
  BanknotesIcon,
  CurrencyEuroIcon,
  HeartIcon,
  QueueListIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAccountProvider, useGetCategories } from "@hooks";
import { Budget } from "@interfaces";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

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

export const ManageBudget = ({
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
      status,
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

  useEffect(() => {
    if (budgetExists) {
      setStatus(budgetExists.status);
    }
  }, [budgetExists]);

  return (
    <Modal
      title={budgetExists ? budgetExists.name : "Add Budget"}
      isOpen={true}
    >
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
                defaultValue={status}
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
