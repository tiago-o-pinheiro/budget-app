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
    <div>
      <h2>{title}</h2>
      <p>{text}</p>
      <button onClick={confirmAction}>Yes</button>
      <button onClick={cancelAction}>No</button>
    </div>
  );
};
