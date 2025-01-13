import {
  Container,
  ListSelect,
  PageHeader,
  SwitchButton,
  Title,
} from "@components";
import { MONTH_LIST } from "@constants";
import { useAccountProvider, useMonthlySpending } from "@hooks";
import { useState } from "react";
import { MonthGraph } from "./components/MonthGraph";
import { ReportPills } from "./components/ReportPills";
import { MonthOverview } from "./components/MonthOverview";

//TODO: Improve this component

export const Reports = () => {
  const [month, setMonth] = useState<number | null>(null);
  const [selected, setSelected] = useState<"expenses" | "incomes">("expenses");
  const { getAllMovements } = useAccountProvider();
  const movements = getAllMovements();

  const selectedMovements = movements.filter((movement) => {
    return selected === "expenses" ? movement.value < 0 : movement.value > 0;
  });

  const spentSummary = useMonthlySpending(
    selectedMovements,
    month ?? undefined
  );

  const hasMovements = spentSummary.some((item) => item.amount > 0);

  return (
    <Container styles="h-screen">
      <PageHeader title="Reports" to="/" />
      <div className="flex justify-between items-center mb-4 gap-4">
        <SwitchButton
          values={["expenses", "incomes"]}
          handleClick={(value) => setSelected(value as "expenses" | "incomes")}
        />
        <ListSelect options={MONTH_LIST} onClick={(value) => setMonth(value)} />
      </div>

      <div className=" rounded-xl flex items-center flex-col justify-center gap-4">
        {selected === "expenses" && (
          <>
            <MonthGraph
              movements={selectedMovements}
              month={month ?? undefined}
            />
          </>
        )}

        {selected === "incomes" && hasMovements && (
          <div className="mt-4">
            <Title value="Total income this month" size="md" />
          </div>
        )}
      </div>

      <div className={`flex gap-4 mt-4 w-full justify-center`}>
        {selected === "expenses" &&
          spentSummary.map((item) => (
            <ReportPills
              key={item.label}
              value={item.amount}
              label={item.label}
            />
          ))}
        {selected === "incomes" && (
          <ReportPills
            key={spentSummary[2].label}
            value={spentSummary[2].amount}
            label={spentSummary[2].label}
          />
        )}
      </div>
      <MonthOverview
        month={month ?? new Date().getMonth() + 1}
        type={selected}
      />
    </Container>
  );
};
