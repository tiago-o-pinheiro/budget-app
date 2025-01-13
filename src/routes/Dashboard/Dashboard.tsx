import {
  AddMovement,
  Balance,
  Button,
  Header,
  Transactions,
} from "@components";
import { useAccountProvider } from "@hooks";
import { Movement } from "@interfaces";
import { useEffect } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { AccountSelectorComponent } from "./components/AccountSelectorComponent";
import {
  ArrowsRightLeftIcon,
  ChartBarSquareIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { MovementDetails } from "./components/MovementDetails";
import { Exchange } from "./components/Exchange";

interface TransactionItemProps extends Movement {
  account: string;
  accountId: number;
}

interface DashboardContentProps {
  accountId?: number;
}
const DashboardActions = ({ accountId }: DashboardContentProps) => {
  return (
    <div className="flex justify-around items-center">
      <div className="flex flex-col items-center">
        <AddMovement id={accountId} />
      </div>
      <div className="flex flex-col items-center">
        <Link to="/exchange">
          <Button title="Exchange">
            <ArrowsRightLeftIcon className="size-4 text-black" />
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <Link to="/reports">
          <Button title="Reports">
            <ChartBarSquareIcon className="size-4 text-black" />
          </Button>
        </Link>
      </div>
      {/* <div className="flex flex-col items-center">
        <Link to="/insights">
          <Button title="Insights">
            <SparklesIcon className="size-4 text-black" />
          </Button>
        </Link>
      </div> */}
    </div>
  );
};

interface DashboardHeaderProps {
  balance: number;
  accountId?: number;
}
const DashboardHeader = ({ balance, accountId }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const handleSelectChange = (value: number) => {
    if (value === 999) {
      navigate(`/`);
    } else {
      navigate(`/${value}`);
    }
  };

  return (
    <div className="bg-white p-4 mt-14">
      <Header />
      <AccountSelectorComponent handleSelectChange={handleSelectChange} />
      <Balance balance={balance} />
      <DashboardActions accountId={accountId} />
    </div>
  );
};

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
        <DashboardHeader balance={account.balance} accountId={account.id} />
        <Transactions movements={movements} />
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader balance={totalBalance} />
      <Transactions movements={movements} />
    </div>
  );
};

export const Dashboard = () => {
  return (
    <>
      <Routes>
        <Route path="/:accountId?" element={<DashboardContent />} />
        <Route path="/movement/*" element={<MovementDetails />} />
        <Route path="/exchange" element={<Exchange />} />
      </Routes>
    </>
  );
};
