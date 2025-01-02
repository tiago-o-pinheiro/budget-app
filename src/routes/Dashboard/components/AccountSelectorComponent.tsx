import { Field } from "@headlessui/react";

import { useAccountProvider } from "@hooks";

import { ListSelect } from "@components";

export const AccountSelectorComponent = ({
  handleSelectChange,
}: {
  handleSelectChange: (value: number) => void;
}) => {
  const { getAccountArray } = useAccountProvider();
  const accounts = getAccountArray().filter((account) => account !== undefined);

  const accountList = accounts.map((account) => ({
    id: account.id,
    name: account.name,
  }));

  const handleChange = (value: number) => {
    handleSelectChange(value);
  };

  return (
    <div className="w-full max-w-64 px-4 mx-auto">
      <Field>
        <div className="relative">
          <ListSelect onClick={handleChange} options={accountList} />
        </div>
      </Field>
    </div>
  );
};
