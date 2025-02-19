import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { Text } from "@components";

const optionStyles = (isOpen: boolean, styles?: string) => {
  return clsx(
    "absolute z-40 w-full shadow-lg overflow-hidden transition-all duration-200 ease-in-out ",
    "rounded-b-3xl",
    "bg-gray-200",
    isOpen ? "opacity-100" : "hidden opacity-0",
    styles
  );
};

const selectedStyles = (isOpen: boolean, styles?: string) => {
  return clsx(
    "cursor-pointer transition-all duration-200",
    "flex justify-between items-center gap-2",
    "border rounded-3xl border-gray-200",
    "bg-gray-200",
    "px-4 py-2 ",
    isOpen ? "border-b-0 rounded-b-none" : "",
    styles
  );
};

const containerStyles = (isOpen: boolean, styles?: string) => {
  return clsx(
    "relative transition-shadow duration-200 ease-in-out w-full h-full",
    "rounded-t-3xl",
    isOpen ? "shadow-lg bg-gray-200" : "",
    styles
  );
};

const listSyles = () => {
  return clsx(
    "cursor-pointer min-h-10",
    "px-4 py-2",
    "hover:bg-blue-100 active:bg-blue-200 focus:outline-none focus-visible:bg-blue-100"
  );
};

type Option<T> = T & { id: number; name: string };
type Styles = Record<
  "optionsStyles" | "selectedStyles" | "containerStyles",
  string
>;

const STYLES = {
  optionsStyles: "",
  selectedStyles: "",
  containerStyles: "",
};

const Arrows = ({
  isOpen,
  isSingle,
}: {
  isOpen: boolean;
  isSingle: boolean;
}) => {
  if (isSingle) return null;
  if (!isOpen) {
    return <ChevronDownIcon className="h-4 w-4 text-black" />;
  }

  return <ChevronUpIcon className="h-4 w-4 text-black" />;
};

export const ListSelect = <T extends Record<string, any>>({
  options,
  onClick,
  defaultValue,
  styles = STYLES,
}: {
  options: Option<T>[];
  onClick: (value: number) => void;
  defaultValue?: Option<T>;
  styles?: Styles;
}) => {
  const [active, setActive] = useState<Option<T>>(defaultValue ?? options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const showOptionsList = options.length > 1;

  const handleChange = () => {
    if (!showOptionsList) return;
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (defaultValue) {
      setActive(defaultValue);
    }
  }, []);

  useEffect(() => {
    if (!showOptionsList) {
      setActive(options[0]);
      onClick(options[0].id);
    }
  }, [options]);

  return (
    <div className={containerStyles(isOpen, styles["containerStyles"])}>
      <div
        className={selectedStyles(isOpen, styles["selectedStyles"])}
        onClick={handleChange}
      >
        <Text
          value={active?.name}
          size="md"
          styles="flex-1 text-center capitalize"
        />
        <Arrows isOpen={isOpen} isSingle={!showOptionsList} />
      </div>

      <ul className={optionStyles(isOpen, styles["optionsStyles"])}>
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
              className={listSyles()}
            >
              <Text value={option.name} size="md" styles="capitalize" />
            </li>
          ))}
      </ul>
    </div>
  );
};
