import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { Text } from "@components";

const optionStyles = (isOpen: boolean) => {
  return clsx(
    "bg-white border border-gray-300 absolute z-10 w-full rounded-b-lg shadow-lg overflow-hidden transition-all duration-200 ease-in-out ",
    isOpen ? "opacity-100" : "opacity-0"
  );
};

const selectedStyles = (isOpen: boolean) => {
  return clsx(
    "px-4 py-2 cursor-pointer flex justify-between items-center gap-2 w-full border rounded-lg border-gray-300 transition-all duration-200",
    isOpen ? "border-b-0 rounded-b-none" : ""
  );
};

const containerStyles = (isOpen: boolean) => {
  return clsx(
    "relative w-full transition-shadow duration-200",
    isOpen ? "shadow-lg" : ""
  );
};

type Option<T> = T & { id: number; name: string };

export const ListSelect = <T extends Record<string, any>>({
  options,
  onClick,
  defaultValue,
}: {
  options: Option<T>[];
  onClick: (value: number) => void;
  defaultValue?: Option<T>;
}) => {
  const [active, setActive] = useState<Option<T>>(defaultValue ?? options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const showOptionsList = options.length > 1;

  const handleChange = () => {
    if (!showOptionsList) return;
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!showOptionsList) {
      setActive(options[0]);
      onClick(options[0].id);
    }
  }, [options]);

  return (
    <div className={containerStyles(isOpen)}>
      <div className={selectedStyles(isOpen)} onClick={handleChange}>
        <Text value={active?.name} size="md" styles="flex-1 text-center" />
        {!isOpen ? (
          <ChevronDownIcon className="h-4 w-4 text-black" />
        ) : (
          <ChevronUpIcon className="h-4 w-4 text-black" />
        )}
      </div>

      <ul className={optionStyles(isOpen)}>
        {options
          .filter((option) => option.id !== active?.id)
          .map((option) => (
            <li
              key={option.id}
              onClick={() => {
                setActive(option);
                onClick(option.id);
                setIsOpen(false);
              }}
              className="px-4 py-2 cursor-pointer min-h-10 hover:bg-blue-100 active:bg-blue-200 focus:outline-none focus-visible:bg-blue-100"
            >
              <Text value={option.name} size="md" />
            </li>
          ))}
      </ul>
    </div>
  );
};
