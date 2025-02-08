import { Text } from "@components";
import { useThemeEffect } from "@hooks";
import clsx from "clsx";

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  styles?: string;
  clean?: boolean;
}

const sectionStyles = (styles: string, clean: boolean) => {
  return clsx(clean ? "" : "p-4", `${styles}`);
};

export const Section = ({ children, title, styles }: SectionProps) => {
  const { theme } = useThemeEffect();
  const isDark = theme === "dark";
  return (
    <section className={`p-4 ${styles}`}>
      {title && <Text value={title} size="lg" styles="font-thin" />}
      {children}
    </section>
  );
};
