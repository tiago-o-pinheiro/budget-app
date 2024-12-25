import { RECURRENCY_OPTIONS } from "@config";
import {
  useAccountProvider,
  useCheckModalStatus,
  useGetCategories,
  useModalProvider,
} from "@hooks";
import { Account, Movement } from "@interfaces";
import { useForm } from "react-hook-form";
import { useAmountValidation } from "./utils";
import { useEffect, useState } from "react";
import { CurrentBalance } from "./CurrentBalanceCapition";
import { Modal, Select } from "@components";

interface MovementFormProps extends Omit<Movement, "id" | "value"> {
  value: number | null;
}

export const MovementForm = () => {
  const [isRecurrent, setIsRecurrent] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const { isOpen } = useCheckModalStatus("ADD_MOVEMENT");
  const { close, modal } = useModalProvider();
  const { addMovement, getAccountArray } = useAccountProvider();
  const accounts = getAccountArray(modal.id);
  const categories = useGetCategories();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<MovementFormProps>({
    defaultValues: {
      value: null,
      name: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      description: "",
      frequency: null,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccount(e.target.value);
  };

  useEffect(() => {
    if (accounts.length) {
      setSelectedAccount(accounts[0]?.id?.toString() ?? null);
    }
  }, [modal.id]);

  const foundAccount = accounts.find(
    (account) => account?.id === Number(selectedAccount)
  );

  const isAmountValid = useAmountValidation(
    foundAccount?.balance ?? 0,
    getValues("value") ?? 0
  );

  const handleClose = () => {
    reset();
    close();
  };

  const onSubmit = (data: MovementFormProps) => {
    const { value, ...rest } = data;

    if (!selectedAccount || !value) return;

    const parsedData = {
      ...rest,
      value,
    };

    addMovement(parseInt(selectedAccount), parsedData);
    handleClose();
  };

  if (!accounts || accounts.length === 0 || !isOpen) return null;

  return (
    <Modal isOpen={isOpen} title={"Add new movement"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          data={accounts.filter(
            (account): account is Account => account !== undefined
          )}
          label="Account"
          handleChange={handleChange}
        />

        <input
          type="number"
          placeholder="Amount"
          step={0.01}
          {...register("value", {
            required: "This field is required",
            valueAsNumber: true,
          })}
        />
        <br />

        {!errors.value?.message ? (
          <CurrentBalance
            balance={foundAccount?.balance ?? 0}
            isValid={isAmountValid}
          />
        ) : (
          <span>{errors.value?.message}</span>
        )}

        <br />
        <br />

        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        <br />
        {errors.name && <span>This field is required</span>}
        <br />

        <label>
          <select {...register("category")}>
            {categories.map((category) => (
              <option key={category.label} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
        {errors.category && <span>{errors.category.message}</span>}
        <br />

        <label>
          <input
            type="checkbox"
            checked={isRecurrent}
            onChange={() => setIsRecurrent(!isRecurrent)}
          />
          Is recurrent?
        </label>
        <br />
        <br />

        {isRecurrent && (
          <label>
            Recurrency frequency
            <br />
            <select {...register("frequency")}>
              {RECURRENCY_OPTIONS.map((frequency) => (
                <option key={frequency.label} value={frequency.value}>
                  {frequency.label}
                </option>
              ))}
            </select>
            {errors.frequency && <span>{errors.frequency.message}</span>}
            <br />
            <br />
          </label>
        )}

        <input
          type="date"
          placeholder="Date"
          {...register("date", {
            required: true,
            value: new Date().toISOString().split("T")[0],
          })}
        />
        <br />
        {errors.date && <span>This field is required</span>}

        <br />
        <br />
        <textarea
          rows={4}
          placeholder="Description"
          {...register("description")}
        />
        <br />
        <br />

        <button type="submit">Add</button>
        <button onClick={handleClose}>Cancel</button>
      </form>
    </Modal>
  );
};
