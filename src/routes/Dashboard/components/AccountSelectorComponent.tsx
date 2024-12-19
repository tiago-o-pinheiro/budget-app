import { useAccountProvider } from "@hooks";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const AccountSelectorComponent = ({
  handleSelectChange,
}: {
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const [selectedAccount, setSelectedAccount] = useState<string>("all");
  const { getAccountArray } = useAccountProvider();
  const accounts = getAccountArray();
  const { pathname } = useLocation();

  const accountSelectorOptions = [
    { id: "all", name: "All Accounts" },
    ...accounts,
  ];

  useEffect(() => {
    const accountIdFromPath = pathname.split("/")[1] || "all";
    setSelectedAccount(accountIdFromPath);
  }, [pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccount(e.target.value);
    handleSelectChange(e);
  };

  return (
    <div>
      <label htmlFor="accounts">Select an account:</label>
      <br />
      <select id="accounts" onChange={handleChange} value={selectedAccount}>
        {accountSelectorOptions.map((account) => (
          <option key={account?.id ?? "all"} value={account?.id ?? "all"}>
            {account?.name}
          </option>
        ))}
      </select>
    </div>
  );
};
