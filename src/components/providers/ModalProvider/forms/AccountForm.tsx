import { useForm, FormProvider, DefaultValues } from "react-hook-form";
import { Button, Input, Modal } from "@components";
import {
  CurrencyEuroIcon,
  PencilSquareIcon,
  PlusIcon,
  WalletIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useCheckModalStatus, useModalProvider } from "@hooks";
import { useAccountStore } from "@stores";
import { useNavigate } from "react-router-dom";

interface AccountFormsProviderProps<T> {
  defaultValues?: DefaultValues<T>;
}

interface AccountFormProps {
  name: string;
  balance: number | null;
  description: string;
}

export const AccountForm = ({
  defaultValues,
}: AccountFormsProviderProps<AccountFormProps>) => {
  const { isOpen } = useCheckModalStatus("ADD_ACCOUNT");
  const { createAccount } = useAccountStore();
  const { close } = useModalProvider();
  const navigate = useNavigate();
  const methods = useForm<AccountFormProps>({
    defaultValues,
  });
  const { formState, reset } = methods;

  const onSubmit = (data: AccountFormProps) => {
    const parsedData = {
      ...data,
      balance: data.balance || 0,
    };
    createAccount(parsedData);
    handleClose();
  };

  const handleClose = () => {
    reset();
    close();
    navigate("/accounts");
  };

  if (!isOpen) return null;

  return (
    <FormProvider {...methods}>
      <Modal title="Add Account" isOpen={isOpen}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            type="text"
            name="name"
            label="Account Name"
            isRequired
            error={Boolean(formState.errors.name)}
          >
            <WalletIcon className="h-5 w-5 text-gray-500" />
          </Input>

          <Input
            type="number"
            name="balance"
            label="Account Balance"
            isRequired
            error={Boolean(formState.errors.balance)}
          >
            <CurrencyEuroIcon className="h-5 w-5 text-gray-500" />
          </Input>

          <Input type="text" name="description" label="Description">
            <PencilSquareIcon className="h-5 w-5 text-gray-500" />
          </Input>
          <div className="flex justify-end space-x-2">
            <Button title="Cancel" family="ghost" onClick={handleClose}>
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </Button>
            <Button type="submit" title="Add">
              <PlusIcon className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </form>
      </Modal>
    </FormProvider>
  );
};
