import clsx from "clsx";
import { Text } from "@components";

type AlertType = "success" | "error" | "warning" | "info";

const containerStyles = (type: AlertType) => {
  const colors = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
  };

  return clsx("flex items-center justify-center rounded-md p-2", colors[type]);
};

interface AlertProps {
  message: string;
  type: AlertType;
}

export const Alert = ({ message, type }: AlertProps) => {
  return (
    <div className={containerStyles(type)}>
      <Text value={message} />
    </div>
  );
};
