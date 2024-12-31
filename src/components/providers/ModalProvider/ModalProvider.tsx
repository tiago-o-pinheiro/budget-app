import { AddMovementForm } from "./forms/AddMovementForm";
import { AccountForm } from "./forms/AccountForm";

export const ModalProvider = () => {
  return (
    <div>
      {/* <MovementForm /> */}
      <AddMovementForm />
      <AccountForm />
    </div>
  );
};
