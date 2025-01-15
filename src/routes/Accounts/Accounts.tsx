import {
  Button,
  Container,
  PageHeader,
  Text,
  Title,
  Transactions,
} from "@components";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  useAccountProvider,
  useCurrencyFormatter,
  useModalProvider,
} from "@hooks";
import { Account } from "@interfaces";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { EditAccount } from "./components/EditAccount";
import { AccountDetails } from "./components/AccountDetails";
import { Budgets } from "./components/Budgets/Budgets";

const AccountCard = ({ account }: { account: Account }) => {
  const formattedBalance = useCurrencyFormatter({ value: account.balance });
  const navigate = useNavigate();

  const goTo = () => {
    navigate(`/accounts/${account.id}`);
  };

  return (
    <div
      className="w-full rounded-3xl mb-2 p-2 pl-4 pt-4  bg-gray-100"
      key={account.id}
    >
      <Title value={account.name} size="lg" styles="mb-2" />

      <Text value={formattedBalance} size="md" color="primary" />

      <div className="flex justify-end items-center">
        <Button title="Details" onClick={goTo} family="secondary" size="sm" />
      </div>
    </div>
  );
};

const AccountsDashboard = () => {
  const { accounts } = useAccountProvider();
  const navigate = useNavigate();

  const addAccount = () => {
    navigate("/accounts/new");
  };

  return (
    <Container clean={false}>
      <PageHeader title="Accounts" to="/" />
      {accounts.map((account) => (
        <AccountCard account={account} key={account.id} />
      ))}

      <div className="flex justify-end items-center">
        <Button title="Add Account" family="primary" onClick={addAccount}>
          <PlusIcon className="size-4 text-black" />
        </Button>
      </div>
    </Container>
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
      <Route path="/:accountId" element={<AccountDetails />}>
        <Route path="details" element={<EditAccount />} />
        <Route path="transactions" element={<Transactions movements={[]} />} />
        <Route path="budgets" element={<Budgets />} />
      </Route>
      <Route path="/new" element={<AddNewAccountPage />} />
    </Routes>
  );
};
