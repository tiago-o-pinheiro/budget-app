import { useModalProvider } from "@hooks";

export const AddAccount = () => {
  const { setModal, close } = useModalProvider();
  return (
    <div>
      <button onClick={() => setModal("ADD_ACCOUNT")}>Add account</button>
      <button onClick={() => close()}>Close account</button>
    </div>
  );
};
