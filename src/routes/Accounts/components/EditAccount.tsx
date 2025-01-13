import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  ConfirmDialog,
  Container,
  Input,
  PageHeader,
} from "@components";
import {
  CurrencyEuroIcon,
  PencilSquareIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";
import { useAccountProvider } from "@hooks";

import { useNavigate, useParams } from "react-router-dom";
import { Account } from "@interfaces";
import {
  BuildingLibraryIcon,
  GlobeEuropeAfricaIcon,
  HeartIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface AccountFormProps {
  name: string;
  owner?: string;
  balance: number;
  description?: string;
  iban?: string;
  swift?: string;
}

export const EditAccount = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { accountId } = useParams();
  const { getAccount, editAccount, removeAccount } = useAccountProvider();
  const account = getAccount(Number(accountId));

  const navigate = useNavigate();
  const methods = useForm<AccountFormProps>({
    defaultValues: account,
  });
  const { formState } = methods;

  const onSubmit = (data: Omit<Account, "movements" | "id">) => {
    editAccount(Number(accountId), data);
    navigate("/accounts");
  };

  const handleRemoveAccount = () => {
    removeAccount(Number(accountId));
    navigate("/accounts");
  };

  useEffect(() => {
    if (!account) {
      navigate(-1);
    }
  }, [account]);

  return (
    <FormProvider {...methods}>
      <Container>
        <PageHeader title={account?.name ?? "Account"} to="/accounts" />
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

          <Input type="text" name="owner" label="Account Owner">
            <UserCircleIcon className="h-5 w-5 text-gray-500" />
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

          <Input type="text" name="iban" label="IBAN">
            <BuildingLibraryIcon className="h-5 w-5 text-gray-500" />
          </Input>

          <Input type="text" name="swift" label="BIC/SWIFT">
            <GlobeEuropeAfricaIcon className="h-5 w-5 text-gray-500" />
          </Input>

          <div className="flex justify-end space-x-2">
            <Button
              title="Delete"
              family="danger"
              onClick={() => setIsOpen(true)}
            >
              <TrashIcon className="h-5 w-5 text-rose-500" />
            </Button>
            <Button type="submit" title="Save" family="ghost">
              <HeartIcon className="h-5 w-5 text-black" />
            </Button>
          </div>
        </form>
        {isOpen && (
          <ConfirmDialog
            cancelAction={() => setIsOpen(false)}
            confirmAction={handleRemoveAccount}
            title="Delete account"
            text="Are you sure you want to delete this account?"
          />
        )}
      </Container>
    </FormProvider>
  );
};
