import { ChevronLeftIcon, CheckIcon } from "@heroicons/react/20/solid";
import { BsPlusSlashMinus } from "react-icons/bs";

import { usePadNumber } from "./hooks/use-pad-number.hook";
import { PadButtons } from "./components/PadButtons";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

//TO DO: Add date functionality to the pad

export const PadNumber = ({
  callbackNumber,
  confirmAction,
  handleSettings = () => {},
  showTotal = false,
}: {
  callbackNumber?: (value: string) => void;
  confirmAction?: (number: number) => void;
  handleSettings?: () => void;
  showTotal?: boolean;
}) => {
  const {
    handleButtonClick,
    handleBackspace,
    changeValue,
    handleOperation,
    input,
  } = usePadNumber(callbackNumber, confirmAction);

  return (
    <div className="flex flex-col w-full h-full justify-end">
      <div className="w-full p-2 bg-white text-center text-6xl font-thin">
        {showTotal ? `${input}€` : ""}
      </div>
      <div className="flex flex-row md:flex-row w-full">
        <div className="flex-[3] grid grid-cols-3 gap-2 p-2 h-3/4">
          <PadButtons label="1" onClick={() => handleButtonClick("1")} />
          <PadButtons label="2" onClick={() => handleButtonClick("2")} />
          <PadButtons label="3" onClick={() => handleButtonClick("3")} />
          <PadButtons label="4" onClick={() => handleButtonClick("4")} />
          <PadButtons label="5" onClick={() => handleButtonClick("5")} />
          <PadButtons label="6" onClick={() => handleButtonClick("6")} />
          <PadButtons label="7" onClick={() => handleButtonClick("7")} />
          <PadButtons label="8" onClick={() => handleButtonClick("8")} />
          <PadButtons label="9" onClick={() => handleButtonClick("9")} />
          <PadButtons
            onClick={changeValue}
            style="bg-gray-200 text-gray-600/75 flex items-center justify-center"
          >
            <BsPlusSlashMinus />
          </PadButtons>
          <PadButtons label="0" onClick={() => handleButtonClick("0")} />
          <PadButtons label="," onClick={() => handleButtonClick(",")} />
        </div>
        <div className="flex-[1] grid grid-cols-1 grid-rows-4 gap-2 p-2 h-full">
          <PadButtons
            onClick={handleBackspace}
            style="bg-gray-600/50  text-white flex items-center justify-center"
          >
            <ChevronLeftIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
          </PadButtons>

          <PadButtons
            onClick={handleSettings}
            style="bg-gray-800/50 text-white flex items-center justify-center"
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
          </PadButtons>

          <PadButtons
            onClick={handleOperation}
            style="bg-green-600/60 text-white flex items-center justify-center row-span-2 h-full"
          >
            <CheckIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
          </PadButtons>
        </div>
      </div>
    </div>
  );
};
