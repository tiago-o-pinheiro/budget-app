import { Modal, Text, Button } from "@components";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ConfirmDialogProps {
  confirmAction: () => void;
  cancelAction: () => void;
  title: string;
  text: string;
}

export const ConfirmDialog = ({
  cancelAction,
  confirmAction,
  title,
  text,
}: ConfirmDialogProps) => {
  return (
    <Modal title={title}>
      <Text value={text} />
      <div className="flex justify-center gap-4 mt-4">
        <Button onClick={cancelAction} title={"No"}>
          <CheckIcon className="size-4 text-black" />
        </Button>
        <Button onClick={confirmAction} title={"Yes"} family="danger">
          <TrashIcon className="size-4 text-rose-500" />
        </Button>
      </div>
    </Modal>
  );
};
