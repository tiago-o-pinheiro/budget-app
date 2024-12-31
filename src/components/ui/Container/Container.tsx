import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  styles?: string;
  clean?: boolean;
}

const containerStyles = (styles?: string, clean?: boolean) => {
  return clsx(!clean ? "p-3 mb-2 px-5" : "", `${styles}`);
};

export const Container = ({ children, styles, clean }: ContainerProps) => {
  return <div className={containerStyles(styles, clean)}>{children}</div>;
};
