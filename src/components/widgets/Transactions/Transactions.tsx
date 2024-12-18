import { useAccountProvider } from "@hooks";

export const Transactions = () => {
  const { getAllMovements } = useAccountProvider();
  const movements = getAllMovements();

  if (movements.length === 0) return null;

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {movements.map((movement, index) => (
          <li key={`${index}-${movement.id}`}>
            <p>Name: {movement.name}</p>
            <p>Amount: {movement.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
