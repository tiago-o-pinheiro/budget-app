import { Badge, Balance, Container, PageHeader } from "@components";
import { useAccountProvider } from "@hooks";
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import { NavLink } from "react-router-dom";

export const Tabs = () => {
  const tabStyles = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 text-sm font-medium ${
      isActive ? "border-b-2 border-black text-black" : "text-gray-500"
    }`;

  return (
    <div className="flex justify-center gap-4 border-b">
      <NavLink to="details" className={tabStyles}>
        Details
      </NavLink>
      <NavLink to="transactions" className={tabStyles}>
        Transactions
      </NavLink>
      <NavLink to="budgets" className={tabStyles}>
        Budgets
      </NavLink>
    </div>
  );
};

export const AccountDetails = () => {
  const { accountId } = useParams();
  const { getAccount } = useAccountProvider();
  const navigate = useNavigate();
  const account = getAccount(Number(accountId));

  if (!account) {
    return <Container>Account not found</Container>;
  }

  useEffect(() => {
    navigate(`/accounts/${accountId}/details`);
  }, [accountId]);

  return (
    <Container>
      <PageHeader title={account.name} to="/accounts" />

      <Tabs />
      <div className="mt-4">
        <Outlet />
      </div>
    </Container>
  );
};
