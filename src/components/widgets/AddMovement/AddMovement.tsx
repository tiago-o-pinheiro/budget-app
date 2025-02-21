import { useAccountProvider, useCategoryProvider } from "@hooks";
import {
  CategorySelect,
  CurrencyNumber,
  ListSelect,
  Modal,
  MovementDetails,
  PadNumber,
  Text,
} from "@components";
import { Account } from "@interfaces";
import { useEffect, useState } from "react";
import { AdditionalSettings } from "../MovementDetails/movement-details.type";

interface AddMovementProps {
  id?: number;
  close: () => void;
}

const DEFAULT_DATE = new Date().toISOString().split("T")[0];

export const AddMovement: React.FC<AddMovementProps> = ({ id, close }) => {
  const { accounts } = useAccountProvider();
  const { categories } = useCategoryProvider();
  const [accountId, setAccountId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [amount, setAmount] = useState<string>("0");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<"Expense" | "Income">("Expense");
  const [additionalOptions, setAdditionalOptions] =
    useState<AdditionalSettings>({});
  const [nameError, setNameError] = useState<string | null>(null);

  const [showSettings, setShowSettings] = useState<boolean>(false);

  const { addMovement } = useAccountProvider();

  useEffect(() => {
    if (accounts.length === 1) {
      setAccountId(accounts[0].id);
    }
    setAccountId(accounts[0].id);
  }, []);

  useEffect(() => {
    if (id) {
      setAccountId(id);
    }
  }, [id]);

  useEffect(() => {
    const value = Number(amount);
    if (value < 0) {
      setType("Expense");
    } else {
      setType("Income");
    }
  }, [amount]);

  const confirmAction = () => {
    const { description, frequency, date } = additionalOptions;
    const movementAmount = Number(amount);

    if (!movementAmount || !accountId) {
      return;
    }
    if (!name) {
      setNameError("Name is required");
      return;
    }

    addMovement(accountId, {
      accountId,
      category: categoryId,
      date: date ? date : DEFAULT_DATE,
      description: description,
      frequency: frequency,
      name,
      value: movementAmount,
    });

    close();
  };

  useEffect(() => {
    if (name) {
      setNameError(null);
    }
  }, [name]);

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
            onClick={(value) => setAccountId(value)}
            defaultValue={{ id: accounts[0].id, name: accounts[0].name }}
            options={accounts.map((account: Account) => ({
              id: account.id,
              name: account.name,
            }))}
          />
        </div>
        <div className="w-1/2">
          <CategorySelect
            onClick={(value) => setCategoryId(value)}
            categories={categories}
            defaultValue={categories[0]}
          />
        </div>
      </div>
      <div className="w-1/4 mx-auto">
        <Text
          value={type}
          size="xs"
          styles="text-center p-1 my-4 border border-gray-200 rounded-full"
          color="secondary"
        />
      </div>
      <CurrencyNumber value={`${amount}`} />
      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-center text-gray-500/70 focus:border-none focus:outline-none"
          placeholder="Enter a description..."
        />
        <div
          className={`transition-all duration-300 overflow-hidden ${
            nameError ? "max-h-10" : "max-h-0"
          }`}
        >
          <Text value={nameError} color="red" size="xs" styles="text-center" />
        </div>
      </div>
      <PadNumber
        confirmAction={confirmAction}
        callbackNumber={setAmount}
        handleSettings={() => setShowSettings(true)}
      />
    </Modal>
  );
};
