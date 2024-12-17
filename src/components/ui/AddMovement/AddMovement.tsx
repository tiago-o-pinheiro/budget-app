import { useModalProvider } from "@hooks";

export const AddMovement = () => {
  const { setModal, close } = useModalProvider();
  return (
    <div>
      <button onClick={() => setModal("ADD_MOVEMENT", 1)}>
        Add new movement
      </button>
      <button onClick={() => close()}>Close movement modal</button>
    </div>
  );
};
