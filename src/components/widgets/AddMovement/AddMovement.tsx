import { useAccountProvider, useCategoryProvider } from "@hooks";
import {
  Button,
  CategorySelect,
  CurrencyNumber,
  InputField,
  ListSelect,
  Modal,
  PadNumber,
  SwitchButton,
  Text,
} from "@components";
import { Account } from "@interfaces";
import { useEffect, useState } from "react";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import { HiMiniArrowPath } from "react-icons/hi2";
import { Frequency } from "src/config/interfaces/movement.interface";

interface AddMovementProps {
  id?: number;
  close: () => void;
}

type Recurrency = {
  id: number;
  name: string;
};

const recurrency: Recurrency[] = [
  {
    id: 1,
    name: "daily",
  },
  {
    id: 2,
    name: "weekly",
  },
  {
    id: 3,
    name: "monthly",
  },
  {
    id: 4,
    name: "yearly",
  },
];

type AdditionalSettings = {
  description?: string;
  frequency?: Frequency | null;
  date?: string;
};

const DEFAULT_DATE = new Date().toISOString().split("T")[0];

const ModalSettings = ({
  close,
  save,
}: {
  close: () => void;
  save: (additionalSettings: AdditionalSettings) => void;
}) => {
  const [isRecurrent, setIsRecurrent] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency | null>(null);
  const [date, setDate] = useState<string>(DEFAULT_DATE);

  const handleSave = () => {
    save({
      description,
      frequency,
      date,
    });
    close();
  };

  const handleFrequency = (value: number) => {
    const selected = recurrency.find((event) => event.id === value);
    if (selected) {
      setFrequency(selected.name as Frequency);
    }
  };
  return (
    <Modal close={close}>
      <div className="flex flex-col gap-2">
        <InputField
          type="date"
          name="Date"
          label="Date"
          handleChange={(e) => setDate(e.target.value)}
          defaultValue={date}
        />

        <div className="flex flex-col rounded-3xl mb-2 border bg-gray-100 border-gray-100 transition-all">
          <div className="flex items-center justify-between bg-gray-200 rounded-3xl p-4">
            <div className="flex items-center gap-2 ml-2">
              <CalendarDateRangeIcon className="h-5 w-5 text-gray-500" />
              <Text
                value="Is recurrent?"
                color="secondary"
                styles="text-gray-500/70"
              />
            </div>
            <SwitchButton
              values={["EUR", "USD"]}
              type={"boolean"}
              defaultValue={isRecurrent}
              handleClick={() => setIsRecurrent(!isRecurrent)}
            />
          </div>

          <div
            className={`transition-all duration-300  ${
              isRecurrent ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-2 ml-2">
                <HiMiniArrowPath className="h-5 w-5 text-gray-500" />
                <Text
                  value="Frequency"
                  color="secondary"
                  styles="text-gray-500/70"
                />
              </div>
              <div className="w-1/2">
                <ListSelect
                  onClick={(value) => handleFrequency(value)}
                  options={recurrency.map((event) => ({
                    id: event.id,
                    name: event.name,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>

        <InputField
          type="text"
          name="description"
          label="Description"
          placeholder="Enter a description..."
          handleChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex items-center justify-end">
          <Button
            title="Cancel"
            family="secondary"
            onClick={() => {
              close();
            }}
          />
          <Button
            title="Save"
            family="primary"
            onClick={() => {
              handleSave();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

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
    <>
      <Modal close={close}>
        {showSettings && (
          <ModalSettings
            close={() => setShowSettings(false)}
            save={setAdditionalOptions}
          />
        )}
        <div className="flex items-center justify-between gap-2 h-14">
          <div className="w-1/2">
            <ListSelect
              onClick={(value) => setAccountId(value)}
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
            <Text
              value={nameError}
              color="red"
              size="xs"
              styles="text-center"
            />
          </div>
        </div>
        <PadNumber
          confirmAction={confirmAction}
          callbackNumber={setAmount}
          handleSettings={() => setShowSettings(true)}
        />
      </Modal>
    </>
  );
};
