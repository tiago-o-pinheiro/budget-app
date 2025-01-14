import clsx from "clsx";
import { useState } from "react";
import { Text } from "@components";

interface SwitchButtonProps {
  handleClick: (value: string) => void;
  values: string[];
}

const containerStyles = () => {
  return clsx(
    "relative flex items-center justify-between w-full",
    "border rounded-3xl",
    "bg-gray-200",
    "cursor-pointer"
  );
};

const btnStyles = () => {
  return clsx(
    "z-10 flex-1 text-center rounded-3xl px-4 py-2",
    "transition-colors duration-200"
  );
};

const activeOptionStyles = (active: boolean) => {
  return clsx(
    "absolute top-0 left-0 h-full w-1/2 rounded-3xl bg-black transition-transform duration-300"
  );
};

export const SwitchButton = ({ handleClick, values }: SwitchButtonProps) => {
  const [active, setActive] = useState(values[0]);

  const handleOptionClick = (value: string) => {
    setActive(value);
    handleClick(value);
  };

  return (
    <div className={containerStyles()}>
      <div
        className={activeOptionStyles(active === values[0])}
        style={{
          transform: `translateX(${active === values[0] ? "0%" : "100%"})`,
        }}
      />
      {values.map((value) => (
        <button
          key={value}
          type="button"
          className={clsx(
            btnStyles(),
            active === value ? "text-white" : "text-black"
          )}
          onClick={() => handleOptionClick(value)}
        >
          <Text value={value} styles="capitalize" />
        </button>
      ))}
    </div>
  );
};
