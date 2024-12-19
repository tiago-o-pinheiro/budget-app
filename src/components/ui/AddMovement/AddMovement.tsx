import { useModalProvider } from "@hooks";

interface AddMovementProps {
  id?: number | null;
}

export const AddMovement: React.FC<AddMovementProps> = ({ id }) => {
  const { setModal } = useModalProvider();

  const handleModal = () => {
    if (id) {
      return setModal("ADD_MOVEMENT", id);
    }

    setModal("ADD_MOVEMENT");
  };

  return (
    <div>
      <button onClick={handleModal}>Add new movement</button>
    </div>
  );
};
