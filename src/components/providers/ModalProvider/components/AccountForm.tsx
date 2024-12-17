import { useCheckModalStatus } from "@hooks";

export const AccountForm = () => {
  const { isOpen } = useCheckModalStatus("ADD_ACCOUNT");

  if (!isOpen) return null;

  return <div>AccountForm</div>;
};
