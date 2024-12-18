import { useModalProvider } from "@hooks";

export const AddMovement = () => {
  const { setModal } = useModalProvider();
  return (
    <div>
      <button onClick={() => setModal("ADD_MOVEMENT")}>Add new movement</button>
    </div>
  );
};
