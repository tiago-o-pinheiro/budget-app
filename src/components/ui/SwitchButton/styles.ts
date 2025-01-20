import clsx from "clsx";

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

const activeOptionStyles = () => {
  return clsx(
    "absolute top-0 left-0 h-full w-1/2 rounded-3xl bg-black transition-transform duration-300"
  );
};

const booleanContainerStyles = (active: boolean) => {
  return clsx(
    "relative w-10 h-6 rounded-full flex-shrink-0",
    "cursor-pointer transition-colors duration-200",
    active
      ? "bg-gray-400 dark:bg-indigo-800 shadow-inner"
      : "bg-gray-300 dark:bg-indigo-200"
  );
};

const booleanKnobStyles = (active: boolean) => {
  return clsx(
    "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300",
    active ? "translate-x-5" : "translate-x-0"
  );
};

export {
  containerStyles,
  btnStyles,
  activeOptionStyles,
  booleanContainerStyles,
  booleanKnobStyles,
};
