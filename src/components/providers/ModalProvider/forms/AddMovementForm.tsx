import { useForm, FormProvider } from "react-hook-form";
import { Button, Input, Modal, Select } from "@components";
import {
  CurrencyEuroIcon,
  PencilSquareIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";
import {
  useAccountProvider,
  useCategoryProvider,
  useCheckModalStatus,
  useModalProvider,
} from "@hooks";

import { useNavigate } from "react-router-dom";
import { Account } from "@interfaces";
import {
  CalendarDaysIcon,
  HashtagIcon,
  HeartIcon,
  QueueListIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Frequency } from "src/config/interfaces/movement.interface";
import { RECURRENCY_OPTIONS } from "@config";
import clsx from "clsx";

//This entire form will be transformed into another component
//Add movement form should be calculator like

interface AddMovementFormProps {
  accountId: number;
  value: number;
  name: string;
  date: string;
  category: number;
  description?: string;
  frequency?: Frequency | null;
}

interface ContainerProps {
  children: React.ReactNode;
  styles?: string;
}

const containerStyles = (styles: string) => {
  return clsx(
    "p-3 bg-gray-300/50 flex flex-col w-full rounded-3xl justify-center items-center mb-2 px-5",
    `${styles}`
  );
};

const Container = ({ children, styles }: ContainerProps) => {
  const defaultStyles = containerStyles(styles || "");
  return <div className={defaultStyles}>{children}</div>;
};

export const IsRecurrentComponent = () => {
  const [isRecurrent, setIsRecurrent] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsRecurrent(event.target.checked);
  };

  return (
    <Container>
      <label className="flex items-center gap-4 w-full text-sm/6 font-medium dark:text-white text-gray-500/70">
        <input
          type="checkbox"
          checked={isRecurrent}
          onChange={handleCheckboxChange}
          className="form-checkbox h-5 w-5"
        />
        Is Recurrent?
      </label>

      {isRecurrent && (
        <div className="mt-4 w-full">
          <Select
            data={RECURRENCY_OPTIONS}
            label="Frequency"
            name="frequency"
          />
        </div>
      )}
    </Container>
  );
};

export const AddMovementForm = () => {
  const { isOpen } = useCheckModalStatus("ADD_MOVEMENT");
  const { close, modal } = useModalProvider();
  const { addMovement, getAccountArray } = useAccountProvider();
  const accounts = getAccountArray(modal.id);
  const { categories } = useCategoryProvider();

  const navigate = useNavigate();
  const methods = useForm<AddMovementFormProps>({
    defaultValues: {
      accountId: accounts[0]?.id ?? 0,
      name: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      frequency: null,
    },
  });
  const { formState } = methods;

  const handleClose = () => {
    methods.reset();
    close();
  };

  const onSubmit = (data: AddMovementFormProps) => {
    const { accountId, ...rest } = data;
    if (!accountId) return;
    addMovement(Number(accountId), rest);
    handleClose();
  };

  useEffect(() => {
    if (!accounts) {
      navigate(-1);
    }
  }, [accounts]);

  if (!accounts || accounts.length === 0 || !isOpen) return null;

  const accountsArray =
    accounts?.filter((account): account is Account => account !== undefined) ??
    [];

  return (
    <FormProvider {...methods}>
      <Modal title="Add Movement" close={handleClose}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Select data={accountsArray} label="Account" name="accountId">
            <WalletIcon className="h-5 w-5 text-gray-500" />
          </Select>

          <Input
            type="text"
            name="name"
            label="Name"
            isRequired
            error={Boolean(formState.errors.name)}
          >
            <HashtagIcon className="h-5 w-5 text-gray-500" />
          </Input>

          <Input
            type="number"
            name="value"
            label="Amount"
            isRequired
            error={Boolean(formState.errors.value)}
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

          <IsRecurrentComponent />

          <Input type="date" name="date" label="Date">
            <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
          </Input>

          <Input type="text" name="description" label="Description">
            <PencilSquareIcon className="h-5 w-5 text-gray-500" />
          </Input>

          <div className="flex justify-end space-x-2">
            <Button title="Cancel" onClick={handleClose}>
              <XMarkIcon className="h-5 w-5 text-black" />
            </Button>
            <Button type="submit" title="Save" family="ghost">
              <HeartIcon className="h-5 w-5 text-black" />
            </Button>
          </div>
        </form>
      </Modal>
    </FormProvider>
  );
};
