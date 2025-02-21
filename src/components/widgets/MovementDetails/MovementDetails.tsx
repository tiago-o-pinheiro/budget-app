import { CalendarDateRangeIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { HiMiniArrowPath } from "react-icons/hi2";
import {
  Modal,
  InputField,
  SwitchButton,
  ListSelect,
  Text,
  Button,
} from "@components";
import { Frequency } from "src/config/interfaces/movement.interface";
import { AdditionalSettings } from "./movement-details.type";

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

const DEFAULT_DATE = new Date().toISOString().split("T")[0];

export const MovementDetails = ({
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

  useEffect(() => {
    save({
      description,
      frequency,
      date,
    });
  }, []);

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
