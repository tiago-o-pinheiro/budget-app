import { useWindowSize } from "@hooks";
import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  styles?: string;
  clean?: boolean;
  full?: boolean;
}

const containerStyles = (styles?: string, clean?: boolean) => {
  return clsx(!clean ? "py-1 px-2" : "", `${styles}`);
};

export const Container = ({
  children,
  styles,
  clean,
  full,
}: ContainerProps) => {
  const { height } = useWindowSize();

  return (
    <div
      className={containerStyles(styles, clean)}
      style={{ height: full ? height : "auto" }}
    >
      {children}
    </div>
  );
};
