import { Header, Balance, Transactions } from "@components";
import { useAccountProvider } from "@hooks";
import { Movement } from "@interfaces";
import { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AccountSelectorComponent } from "./AccountSelectorComponent";
import { DashboardActions } from "./DashboardActions";

interface TransactionItemProps extends Movement {
  account: string;
  accountId: number;
}

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
      <div className="py-4">
        <Balance balance={balance} />
      </div>
      <DashboardActions accountId={accountId} />
    </div>
  );
};

export const DashboardContent = () => {
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
