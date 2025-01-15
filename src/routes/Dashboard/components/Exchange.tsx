import {
  Container,
  CurrencyNumber,
  ListSelect,
  PageHeader,
  Title,
} from "@components";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { useAccountProvider, useCurrencyFormatter } from "@hooks";

import { useEffect, useState } from "react";
import { PadNumber } from "@components";
import { useNavigate } from "react-router-dom";

const AvailableBalance = ({ balance }: { balance: number }) => {
  const formattedBalance = useCurrencyFormatter({ value: balance });

  return (
    <Title
      value={`Available balance: ${formattedBalance}`}
      size="sm"
      styles="text-center"
    />
  );
};

export const Exchange = () => {
  const { accounts, transferMoney } = useAccountProvider();
  const [amount, setAmount] = useState<string | null>(null);
  const [fromAccount, setFromAccount] = useState<number | null>(null);
  const [toAccount, setToAccount] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleFromAccountChange = (value: number) => {
    setFromAccount(value);
  };

  const handleToAccountChange = (value: number) => {
    setToAccount(value);
  };

  const handleMovement = (value: number) => {
    if (!fromAccount || !toAccount || !value) {
      return;
    }
    transferMoney(fromAccount, toAccount, value);
    navigate("/");
  };

  const accountDestinationOptions = accounts.filter(
    (account) => account.id !== fromAccount
  );

  if (accounts.length <= 1) {
    return (
      <div className="max-w-3xl mx-auto h-screen">
        <PageHeader title="Exchange" />
        <Title
          value="You need at least two accounts to exchange money"
          size="md"
          styles="text-center"
        />
      </div>
    );
  }

  useEffect(() => {
    if (accounts.length > 1) {
      setFromAccount(accounts[0].id);
    }
  }, []);

  useEffect(() => {
    if (accountDestinationOptions.length > 1) {
      setToAccount(accountDestinationOptions[0].id);
    }
  }, []);

  const fromAccountBalance = accounts.find(
    (account) => account.id === fromAccount
  );

  return (
    <Container styles="max-w-3xl mx-auto h-screen">
      <PageHeader title="Exchange" />
      <Title
        value="Transfer money between accounts"
        size="md"
        styles="text-center"
      />
      <div className="flex flex-col justify-center items-center h-1/4">
        <CurrencyNumber value={`${amount}`} />
        {fromAccountBalance && (
          <AvailableBalance balance={fromAccountBalance.balance} />
        )}
      </div>
      <div className="mx-auto flex justify-between items-center gap-2 mb-4">
        <div className="flex justify-center items-center w-full">
          <ListSelect
            onClick={handleFromAccountChange}
            options={accounts}
            defaultValue={accounts[0]}
          />
        </div>
        <ArrowPathRoundedSquareIcon className="h-12 w-12 text-black" />
        <div className="flex justify-center items-center w-full">
          <ListSelect
            onClick={handleToAccountChange}
            options={accountDestinationOptions}
            defaultValue={accountDestinationOptions[0]}
          />
        </div>
      </div>

      <div className="h-3/5">
        <PadNumber confirmAction={handleMovement} callbackNumber={setAmount} />
      </div>
    </Container>
  );
};
