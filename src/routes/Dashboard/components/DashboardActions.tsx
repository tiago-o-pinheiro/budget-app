import { Button, AddMovement, Exchange } from "@components";
import {
  ArrowsRightLeftIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

interface DashboardContentProps {
  accountId?: number;
}
export const DashboardActions = ({ accountId }: DashboardContentProps) => {
  const [addMovement, setAddMovement] = useState<boolean>(false);
  const [exchange, setExchange] = useState<boolean>(false);

  if (addMovement) {
    return <AddMovement id={accountId} close={() => setAddMovement(false)} />;
  }

  if (exchange) {
    return <Exchange close={() => setExchange(false)} />;
  }

  return (
    <div className="flex justify-around items-center">
      <div className="flex flex-col items-center">
        <Button title="Add Movement" onClick={() => setAddMovement(true)}>
          <PlusIcon className="size-4 text-black" />
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <Button title="Exchange" onClick={() => setExchange(true)}>
          <ArrowsRightLeftIcon className="size-4 text-black" />
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <Link to="/reports">
          <Button title="Reports">
            <ChartBarSquareIcon className="size-4 text-black" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
