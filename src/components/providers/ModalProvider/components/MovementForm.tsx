import { useCheckModalStatus } from "@hooks";

export const MovementForm = () => {
  const { isOpen } = useCheckModalStatus("ADD_MOVEMENT");
  if (!isOpen) return null;

  return <div>MovementForm</div>;
};
