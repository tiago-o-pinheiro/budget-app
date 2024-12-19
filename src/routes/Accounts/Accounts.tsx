import { AddAccount } from "@components";
import { useAccountProvider, useModalProvider } from "@hooks";
import { Account } from "@interfaces";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";

const AccountsDashboard = () => {
  const { accounts } = useAccountProvider();

  return (
    <div>
      Accounts
      {accounts.map((account) => (
        <div key={account.id}>
          <p>{account.name}</p>
          <p>{account.balance}</p>

          <div>
            <Link to={`/accounts/${account.id}`}>Details</Link>
          </div>
        </div>
      ))}
      <AddAccount />
      <Link to="/">Return</Link>
    </div>
  );
};

interface AccountPageDetailsProps extends Omit<Account, "movements" | "id"> {}

const AccountPageDetails = () => {
  const { accountId } = useParams();
  const { getAccount, editAccount } = useAccountProvider();
  const account = getAccount(Number(accountId));
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<AccountPageDetailsProps>(
    {
      defaultValues: {
        name: account?.name,
        owner: account?.owner,
        balance: account?.balance,
        description: account?.description,
        iban: account?.iban,
        swift: account?.swift,
      },
    }
  );

  const onSubmit = (data: AccountPageDetailsProps) => {
    editAccount(Number(accountId), data);
    navigate("/accounts");
  };

  useEffect(() => {
    if (!account) {
      navigate(-1);
    }

    setValue("name", account?.name || "");
    setValue("owner", account?.owner || "");
    setValue("balance", account?.balance || 0);
    setValue("description", account?.description || "");
    setValue("iban", account?.iban || "");
    setValue("swift", account?.swift || "");
  }, [account]);

  return (
    <div>
      <h4>Account Details</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Account Name"
          {...register("name", { required: true })}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Account owner"
          {...register("owner", {})}
        />
        <br />
        <br />
        <input
          type="number"
          step={0.01}
          placeholder="Balance"
          {...register("balance", { required: true })}
        />
        <br />
        <br />
        <textarea
          rows={4}
          placeholder="Account description"
          {...register("description", {})}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="IBAN"
          {...register("iban", { pattern: /^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/i })}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="BIC/SWIFT"
          {...register("swift", {
            pattern: /^[A-Z]{4}[A-Z]{2}[0-9A-Z]{2}([0-9A-Z]{3})?$/i,
          })}
        />
        <br />
        <br />
        <input type="submit" />
        <button onClick={() => navigate("/accounts")}>Cancel</button>
      </form>
    </div>
  );
};

const AddNewAccountPage = () => {
  const { setModal } = useModalProvider();
  useEffect(() => {
    setModal("ADD_ACCOUNT");
  }, []);

  return null;
};

export const Accounts = () => {
  return (
    <Routes>
      <Route path="/" element={<AccountsDashboard />} />
      <Route path="/:accountId" element={<AccountPageDetails />} />
      <Route path="/new" element={<AddNewAccountPage />} />
    </Routes>
  );
};
