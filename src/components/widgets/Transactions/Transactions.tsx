import { useAccountProvider } from "@hooks";
import { Movement } from "@interfaces";
import { useState } from "react";
import { ConfirmDialog } from "@components";

interface TransactionItemProps extends Movement {
  account: string;
}

export const Transactions = ({
  movements,
}: {
  movements: TransactionItemProps[];
}) => {
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const { removeMovement } = useAccountProvider();

  if (movements?.length === 0 || !movements) {
    return <h2>No transactions</h2>;
  }

  const handleDelete = (accountName: string, movementId: number) => {
    removeMovement(accountName, movementId);
  };

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {movements.map((movement, index) => (
          <li key={`${index}-${movement.id}`}>
            <p>Name: {movement.name}</p>
            <p>Amount: {movement.value}</p>

            <button onClick={() => setIsOpen(movement.id)}>Delete</button>
            {isOpen === movement.id && (
              <ConfirmDialog
                title="Delete Transaction"
                text="Are you sure you want to delete this transaction?"
                confirmAction={() =>
                  handleDelete(movement.account, movement.id)
                }
                cancelAction={() => setIsOpen(null)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
