import { useState, useEffect } from "react";

export const useAmountValidation = (
  accountBalance: number,
  selectedAmount: number
) => {
  const [isAmountValid, setIsAmountValid] = useState(true);

  useEffect(() => {
    if (!accountBalance) {
      return;
    }
    const newBalance = accountBalance + Number(selectedAmount);

    if (newBalance < 0) {
      return setIsAmountValid(false);
    }
    setIsAmountValid(true);
  }, [selectedAmount, accountBalance]);

  return isAmountValid;
};
