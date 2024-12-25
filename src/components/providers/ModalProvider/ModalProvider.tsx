import { MovementForm } from "./components/MovementForm";
import { AccountForm } from "./forms/AccountForm";

export const ModalProvider = () => {
  return (
    <div>
      <MovementForm />
      <AccountForm />
    </div>
  );
};
