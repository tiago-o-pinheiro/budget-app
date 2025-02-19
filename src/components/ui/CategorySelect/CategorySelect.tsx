import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { Icon, Text } from "@components";

const optionStyles = (isOpen: boolean, styles?: string) => {
  return clsx(
    "absolute z-40 w-full shadow-lg transition-all duration-200 ease-in-out max-h-60 overflow-y-auto",
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
    "h-11",
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
    "flex items-center gap-2",
    "cursor-pointer min-h-10",
    "px-4 py-2",
    "hover:bg-blue-100 active:bg-blue-200 focus:outline-none focus-visible:bg-blue-100"
  );
};

type Category<T> = T & {
  id: number;
  name: string;
  icon: string;
  color: string;
};
type Styles = Record<
  "optionsStyles" | "selectedStyles" | "containerStyles",
  string
>;

const STYLES = {
  optionsStyles: "",
  selectedStyles: "",
  containerStyles: "",
};

export const CategorySelect = <T extends Record<string, any>>({
  categories,
  onClick,
  defaultValue,
  styles = STYLES,
}: {
  categories: Category<T>[];
  onClick: (value: number) => void;
  defaultValue?: Category<T>;
  styles?: Styles;
}) => {
  const [active, setActive] = useState<Category<T>>(
    defaultValue ?? categories[0]
  );

  const [isOpen, setIsOpen] = useState(false);

  const showOptionsList = categories.length > 1;

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
      setActive(categories[0]);
      onClick(categories[0].id);
    }
  }, [categories]);

  return (
    <div className={containerStyles(isOpen, styles["containerStyles"])}>
      <div
        className={selectedStyles(isOpen, styles["selectedStyles"])}
        onClick={handleChange}
        style={{ backgroundColor: active?.color, color: "white" }}
      >
        <Icon name={active?.icon} />
        <Text
          value={active?.name}
          size="md"
          styles="flex-1 text-center"
          color="white"
          ellipsis
        />
        {!isOpen ? (
          <ChevronDownIcon className="h-4 w-4 text-white" />
        ) : (
          <ChevronUpIcon className="h-4 w-4 text-white" />
        )}
      </div>

      <ul className={optionStyles(isOpen, styles["optionsStyles"])}>
        {categories
          .filter((category) => category.id !== active?.id)
          .map((category) => (
            <li
              key={category.id}
              onClick={() => {
                setActive(category);
                onClick(category.id);
                setIsOpen(false);
              }}
              className={listSyles()}
              style={{ backgroundColor: category.color, color: "white" }}
            >
              <Icon name={category?.icon} />
              <Text value={category.name} size="md" color="white" ellipsis />
            </li>
          ))}
      </ul>
    </div>
  );
};
