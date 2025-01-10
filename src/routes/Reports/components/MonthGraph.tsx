import { Text, Title } from "@components";
import { useTotalByDayReport } from "@hooks";
import { Movement } from "@interfaces";

export const MonthGraph = ({
  movements,
  month,
}: {
  movements: Omit<Movement, "account" | "accountId">[];
  month?: number;
}) => {
  const { totalByDay } = useTotalByDayReport(movements, month ?? undefined);
  console.log(totalByDay);

  const getBarHeight = (value: number) => {
    const max = Math.max(...totalByDay.map((day) => day.total));
    return (value / max) * 100;
  };

  if (totalByDay.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 mt-4">
      <Title value="Total spend by day/month" size="md" />
      <div className="h-48 flex flex-col items-end justify-end w-full h-full">
        <div className="flex gap-1 w-full items-end justify-between px-3">
          {totalByDay.map((day) => {
            return (
              <div key={day.day} className="flex flex-col items-center">
                <Text value={`${day.total}€`} size="xs" />
                <div
                  className="bg-indigo-500 w-5 rounded-full transition-all duration-300 hover:bg-indigo-700 cursor-pointer mb-1"
                  style={{ height: getBarHeight(day.total) }}
                ></div>
                <Title value={`${day.day}`} size="xs" color="secondary" />
              </div>
            );
          })}
        </div>
        <div className=" border-b border-gray-300 w-full relative -top-4" />
      </div>
    </div>
  );
};
