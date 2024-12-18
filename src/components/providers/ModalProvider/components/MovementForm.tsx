import { RECURRENCY_OPTIONS } from "@config";
import {
  useAccountProvider,
  useCheckModalStatus,
  useGetCategories,
  useModalProvider,
} from "@hooks";
import { Movement } from "@interfaces";
import { useForm } from "react-hook-form";

interface MovementFormProps extends Omit<Movement, "id" | "value"> {
  accountId: string | null;
  type: "income" | "expense";
  value: number | null;
  isRecurrent: boolean;
}

export const MovementForm = () => {
  const { isOpen } = useCheckModalStatus("ADD_MOVEMENT");
  const { close, modal } = useModalProvider();
  const { addMovement, getAccountArray } = useAccountProvider();
  const accounts = getAccountArray(modal.id);
  const categories = useGetCategories();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<MovementFormProps>({
    defaultValues: {
      accountId: null,
      value: null,
      type: "expense",
      name: "",
      date: new Date().toISOString().split("T")[0],
      isRecurrent: false,
      category: "",
      description: "",
      frequency: null,
    },
  });

  if (!isOpen) return null;

  const isRecurrent = watch("isRecurrent");

  const handleClose = () => {
    reset();
    close();
  };

  const onSubmit = (data: MovementFormProps) => {
    const { accountId, type, frequency, isRecurrent, ...rest } = data;
    if (!accountId || !data.value) return;

    const parsedData = {
      ...rest,
      frequency: isRecurrent ? frequency : null,
      value: type === "expense" ? -data.value : data.value,
    };

    console.log({ accountId, parsedData });
    addMovement(+accountId, parsedData);
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Movement</h2>

      <input
        type="number"
        placeholder="Amount"
        {...register("value", { required: true, valueAsNumber: true })}
      />
      <br />
      {errors.value && <span>This field is required</span>}
      <br />

      <select {...register("accountId")}>
        {accounts.map((account) => (
          <option key={account?.id} value={account?.id}>
            {account?.name}
          </option>
        ))}
      </select>
      {errors.type && <span>{errors.type.message}</span>}
      <br />
      <br />

      {/* Type Select */}
      <select {...register("type")} defaultValue={"expense"}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      {errors.type && <span>{errors.type.message}</span>}
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

      {/* Type Select */}
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
          {...register("isRecurrent")}
          defaultChecked={false}
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
  );
};
