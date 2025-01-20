import { useForm, FormProvider } from "react-hook-form";
import {
  Badge,
  Balance,
  Button,
  ConfirmDialog,
  Container,
  Input,
  Select,
  SwitchButton,
  Text,
} from "@components";

import { useAccountProvider } from "@hooks";

import { useNavigate, useParams } from "react-router-dom";
import { Account } from "@interfaces";
import {
  AdjustmentsHorizontalIcon,
  BuildingLibraryIcon,
  GlobeEuropeAfricaIcon,
  HeartIcon,
  QueueListIcon,
  TrashIcon,
  UserCircleIcon,
  CurrencyEuroIcon,
  PencilSquareIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { AccountType } from "src/config/interfaces/account.interface";

interface AccountFormProps {
  name: string;
  owner?: string;
  balance: number;
  description?: string;
  iban?: string;
  swift?: string;
  isMain: boolean;
  type: AccountType;
}

const ACCOUNT_TYPES = [
  {
    id: 1,
    name: "Checking",
    value: "checking",
  },
  {
    id: 2,
    name: "Savings",
    value: "savings",
  },
  {
    id: 3,
    name: "Credit",
    value: "credit",
  },
  {
    id: 4,
    name: "Investment",
    value: "investment",
  },
];

export const EditAccount = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMain, setIsMain] = useState<boolean>(false);
  const { accountId } = useParams();
  const { getAccount, editAccount, removeAccount } = useAccountProvider();
  const account = getAccount(Number(accountId));

  const navigate = useNavigate();
  const methods = useForm<AccountFormProps>({
    defaultValues: account,
  });
  const { formState } = methods;

  const onSubmit = (data: Omit<Account, "movements" | "id">) => {
    editAccount(Number(accountId), { ...data, isMain });
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

  useEffect(() => {
    if (account?.isMain) {
      setIsMain(account.isMain);
    }
  }, []);

  if (!account) {
    return <Container>Account not found</Container>;
  }

  return (
    <Container styles="pb-16">
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        {account.type && !account.isMain ? (
          <Badge value={account.type} size="xs" />
        ) : null}

        {account.isMain ? <Badge value={"Main account"} size="xs" /> : null}
        <Balance balance={account.balance} />
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between bg-gray-200 rounded-3xl p-4 mb-2">
            <div className="flex items-center gap-2 ml-2">
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" />
              <Text
                value="Set as main account"
                color="secondary"
                styles="text-gray-500/70"
              />
            </div>
            <SwitchButton
              values={["active", "inactive"]}
              defaultValue={account?.isMain ?? isMain}
              handleClick={(value) => setIsMain(value as boolean)}
              type="boolean"
            />
          </div>

          <Input
            type="text"
            name="name"
            label="Account Name"
            isRequired
            error={Boolean(formState.errors.name)}
          >
            <WalletIcon className="h-5 w-5 text-gray-500" />
          </Input>

          <Select data={ACCOUNT_TYPES} label="Account type" name="type">
            <QueueListIcon className="h-5 w-5 text-gray-500" />
          </Select>

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
      </FormProvider>
    </Container>
  );
};
