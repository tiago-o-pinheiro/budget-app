import { useCheckModalStatus, useModalProvider } from "@hooks";
import { useAccountStore } from "@stores";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

interface AccountFormProps {
  name: string;
  balance: number | null;
  description: string;
}
export const AccountForm = () => {
  const { isOpen } = useCheckModalStatus("ADD_ACCOUNT");
  const { createAccount } = useAccountStore();
  const { close } = useModalProvider();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountFormProps>({
    defaultValues: {
      name: "",
      balance: null,
      description: "",
    },
  });

  if (!isOpen) return null;

  const handleClose = () => {
    const from = location.state?.from?.pathname || "/";
    reset();
    close();
    navigate(from);
  };

  const onSubmit = (data: AccountFormProps) => {
    const parsedData = {
      ...data,
      balance: data.balance || 0,
    };
    createAccount(parsedData);
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Account</h2>

      <input
        type="text"
        placeholder="Name"
        {...register("name", { required: true })}
      />
      <br />
      {errors.name && <span>This field is required</span>}

      <br />

      <input
        type="number"
        placeholder="Balance"
        {...register("balance", { required: true, valueAsNumber: true })}
      />
      <br />
      {errors.balance && <span>This field is required</span>}

      {/* Type Select */}
      {/* <select {...register("type")} defaultValue={"expense"}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      {errors.type && <span>{errors.type.message}</span>}
      <br /> */}
      <br />
      <textarea
        rows={4}
        placeholder="Description"
        {...register("description")}
      />
      <br />
      <button type="submit">Add</button>
      <button onClick={handleClose}>Cancel</button>
    </form>
  );
};
