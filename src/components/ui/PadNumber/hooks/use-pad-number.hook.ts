import { useState, useEffect } from "react";

export const usePadNumber = (
  callbackNumber?: (value: string) => void,
  confirmAction?: (number: number) => void
) => {
  const [input, setInput] = useState<string>("0");

  useEffect(() => {
    if (callbackNumber) {
      callbackNumber(input.replace(",", "."));
    }
  }, [input, callbackNumber]);

  const handleButtonClick = (value: string) => {
    if (value === "," && input.includes(",")) return;
    if (value === "-" && input === "0") return;

    if (input === "0" && value === ",") {
      setInput("0,");
      return;
    }

    if (input === "0" && value !== ",") {
      setInput(value);
      return;
    }

    setInput((prev) => prev + value);
  };

  const handleBackspace = () => {
    setInput((prev) => {
      if (prev === "0") return prev;
      if (prev === "-") return "0";
      if (prev.length === 2 && prev.startsWith("-")) return "0";
      return prev.length > 1 ? prev.slice(0, -1) : "0";
    });
  };

  const handleClear = () => {
    setInput("0");
  };

  const changeValue = () => {
    if (input === "0") return;
    setInput((prev) => (prev.startsWith("-") ? prev.slice(1) : `-${prev}`));
  };

  const handleOperation = () => {
    confirmAction?.(parseFloat(input.replace(",", ".")));
  };

  return {
    input,
    handleButtonClick,
    handleBackspace,
    handleClear,
    changeValue,
    handleOperation,
  };
};
