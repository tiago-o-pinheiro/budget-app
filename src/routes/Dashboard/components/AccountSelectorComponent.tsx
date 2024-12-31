import { Field, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
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
  const accounts = getAccountArray()
    .filter((account) => account !== undefined)
    .map((account) => ({
      ...account,
      id: String(account.id),
    }));
  const { pathname } = useLocation();

  const accountSelectorOptions =
    accounts.length === 1
      ? accounts
      : [{ id: "all", name: "All Accounts" }, ...accounts];

  useEffect(() => {
    // If only one account, set it as default
    if (accounts.length === 1) {
      setSelectedAccount(accounts[0]?.id ?? "all");
    } else {
      const accountIdFromPath = pathname.split("/")[1] || "all";
      setSelectedAccount(accountIdFromPath);
    }
  }, [pathname, accounts]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccount(e.target.value);
    handleSelectChange(e);
  };

  return (
    <div className="w-full max-w-64 px-4 mx-auto">
      <Field>
        <div className="relative">
          <Select
            className={clsx(
              "mt-3 block w-full appearance-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              "border-b text-center rounded-none",
              "*:text-black" // Windows-specific text fix
            )}
            onChange={handleChange}
            value={selectedAccount}
          >
            {accountSelectorOptions.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </Select>
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-gray/60"
            aria-hidden="true"
          />
        </div>
      </Field>
    </div>
  );
};
