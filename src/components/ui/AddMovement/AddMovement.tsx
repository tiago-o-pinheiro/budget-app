import { PlusIcon } from "@heroicons/react/24/outline";
import { useModalProvider } from "@hooks";
import { Button } from "../Button/Button";

interface AddMovementProps {
  id?: number | null;
}

export const AddMovement: React.FC<AddMovementProps> = ({ id = null }) => {
  const { setModal } = useModalProvider();

  const handleModal = () => {
    if (id) {
      return setModal("ADD_MOVEMENT", id);
    }

    setModal("ADD_MOVEMENT");
  };

  return (
    <Button onClick={handleModal} title="Add">
      <PlusIcon className="size-4 text-black" />
    </Button>
  );
};
