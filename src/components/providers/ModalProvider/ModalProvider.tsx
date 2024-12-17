import { AccountForm } from "./components/AccountForm";
import { MovementForm } from "./components/MovementForm";

export const ModalProvider = () => {
  return (
    <div>
      <MovementForm />
      <AccountForm />
    </div>
  );
};
