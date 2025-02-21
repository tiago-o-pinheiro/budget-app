import {
  AdditionalSettings,
  CurrencyNumber,
  ListSelect,
  Modal,
  MovementDetails,
  PadNumber,
  Text,
  Title,
} from "@components";
import { useAccountProvider, useCurrencyFormatter } from "@hooks";
import { Account } from "@interfaces";
import { useEffect, useState } from "react";

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

const DEFAULT_DATE = new Date().toISOString().split("T")[0];

export const Exchange = ({ close }: { close: () => void }) => {
  const [originAccountId, setOriginAccountId] = useState<number | null>(null);
  const [destinationAccountId, setDestinationAccountId] = useState<
    number | null
  >(null);
  const [amount, setAmount] = useState<string>("0");
  const [additionalOptions, setAdditionalOptions] =
    useState<AdditionalSettings>({});
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const { accounts, transferMoney } = useAccountProvider();

  if (accounts.length === 0) {
    return (
      <Modal close={close}>
        <div className="flex items-center justify-center h-14">
          <Text
            value="You need at least two accounts to exchange money"
            size="md"
            styles="text-center"
          />
        </div>
      </Modal>
    );
  }

  useEffect(() => {
    setOriginAccountId(accounts[0].id);
    setDestinationAccountId(accounts[1].id);
  }, []);

  const fromAccountBalance = accounts.find(
    (account) => account.id === originAccountId
  );

  const confirmAction = () => {
    const { description, date } = additionalOptions;

    const movementAmount = Number(amount);

    if (!movementAmount || !originAccountId || !destinationAccountId) {
      return;
    }

    transferMoney(originAccountId, destinationAccountId, {
      value: movementAmount,
      date: date ? date : DEFAULT_DATE,
      description: description ? description : "",
    });
    close();
  };

  return (
    <Modal close={close}>
      {showSettings && (
        <MovementDetails
          close={() => setShowSettings(false)}
          save={setAdditionalOptions}
        />
      )}
      <div className="flex items-center justify-between gap-2 h-14">
        <div className="w-1/2">
          <ListSelect
            onClick={(value) => setOriginAccountId(value)}
            defaultValue={{ id: accounts[0].id, name: accounts[0].name }}
            options={accounts
              .map((account: Account) => ({
                id: account.id,
                name: account.name,
              }))
              .filter((account) => account.id !== destinationAccountId)}
          />
        </div>
        <div className="w-1/2">
          <ListSelect
            onClick={(value) => setDestinationAccountId(value)}
            defaultValue={{ id: accounts[1].id, name: accounts[1].name }}
            options={accounts
              .map((account: Account) => ({
                id: account.id,
                name: account.name,
              }))
              .filter((account) => account.id !== originAccountId)}
          />
        </div>
      </div>
      <CurrencyNumber value={`${amount}`} />
      {fromAccountBalance && (
        <AvailableBalance balance={fromAccountBalance.balance} />
      )}
      <PadNumber
        confirmAction={confirmAction}
        callbackNumber={setAmount}
        handleSettings={() => setShowSettings(true)}
      />
    </Modal>
  );
};
