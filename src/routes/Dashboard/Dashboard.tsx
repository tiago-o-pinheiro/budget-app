import { AddMovement, Balance, Transactions } from "@components";
import { useAccountProvider } from "@hooks";
import { Movement } from "@interfaces";
import { useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { AccountSelectorComponent } from "./components/AccountSelectorComponent";

interface TransactionItemProps extends Movement {
  account: string;
}

const DashboardContent = () => {
  const {
    totalBalance,
    accounts,
    getAllMovements,
    getAccount,
    getAccountMovement,
  } = useAccountProvider();
  const movements = getAllMovements() as TransactionItemProps[];
  const navigate = useNavigate();
  const location = useLocation();
  const { accountId } = useParams();
  const account = getAccount(parseInt(accountId ?? ""));

  useEffect(() => {
    if (accounts.length === 0) {
      navigate("/accounts/new", { state: { from: location } });
    }
  }, [accounts, navigate, location]);

  if (account && accountId) {
    const movements = getAccountMovement(
      parseInt(accountId)
    ) as TransactionItemProps[];

    return (
      <div>
        <Balance balance={account.balance} />
        <Transactions movements={movements} />
        <AddMovement id={account.id} />
      </div>
    );
  }

  return (
    <div>
      <Balance balance={totalBalance} />
      <Transactions movements={movements} />
      <AddMovement />
    </div>
  );
};

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    if (!selectedId || selectedId === "all") {
      navigate(`/`);
    } else {
      navigate(`/${selectedId}`);
    }
  };

  return (
    <div>
      <AccountSelectorComponent handleSelectChange={handleSelectChange} />
      <Routes>
        <Route path="/:accountId?" element={<DashboardContent />} />
      </Routes>
    </div>
  );
};
