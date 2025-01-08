import {
  ChevronLeftIcon,
  CalendarDaysIcon,
  CheckIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

import { usePadNumber } from "./hooks/use-pad-number.hook";
import { PadButtons } from "./components/PadButtons";

//TO DO: Add date functionality to the pad

export const PadNumber = ({
  callbackNumber,
  confirmAction,
  showTotal = false,
}: {
  callbackNumber?: (value: string) => void;
  confirmAction?: (number: number) => void;
  showTotal?: boolean;
}) => {
  const {
    handleButtonClick,
    handleBackspace,
    handleClear,
    changeValue,
    handleOperation,
    input,
  } = usePadNumber(callbackNumber, confirmAction);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full p-2 bg-white text-center text-6xl font-thin">
        {showTotal ? `${input}€` : ""}
      </div>
      <div className="grid grid-cols-4 gap-2 p-2 h-3/4">
        <PadButtons label="1" onClick={() => handleButtonClick("1")} />
        <PadButtons label="2" onClick={() => handleButtonClick("2")} />
        <PadButtons label="3" onClick={() => handleButtonClick("3")} />
        <PadButtons
          onClick={handleBackspace}
          style="bg-orange-400/50 text-white flex items-center justify-center"
        >
          <ChevronLeftIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
        </PadButtons>
        <PadButtons label="4" onClick={() => handleButtonClick("4")} />
        <PadButtons label="5" onClick={() => handleButtonClick("5")} />
        <PadButtons label="6" onClick={() => handleButtonClick("6")} />
        <PadButtons
          onClick={handleBackspace}
          style="bg-sky-400/50 text-white flex items-center justify-center"
        >
          <CalendarDaysIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
        </PadButtons>
        <PadButtons label="7" onClick={() => handleButtonClick("7")} />
        <PadButtons label="8" onClick={() => handleButtonClick("8")} />
        <PadButtons label="9" onClick={() => handleButtonClick("9")} />
        <PadButtons
          onClick={handleOperation}
          style="bg-green-400/50 text-white flex items-center justify-center"
        >
          <CheckIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
        </PadButtons>
        <PadButtons
          label="-"
          onClick={changeValue}
          style="bg-yellow-200/50 text-gray-400"
        />
        <PadButtons label="0" onClick={() => handleButtonClick("0")} />
        <PadButtons
          label=","
          onClick={() => handleButtonClick(",")}
          style="bg-yellow-200/50 text-gray-400"
        />
        <PadButtons
          onClick={handleClear}
          style="bg-gray-400/50 text-white flex items-center justify-center"
        >
          <TrashIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
        </PadButtons>
      </div>
    </div>
  );
};
