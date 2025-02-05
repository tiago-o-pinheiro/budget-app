import { Text } from "@components";

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  styles?: string;
}

export const Section = ({ children, title, styles }: SectionProps) => {
  return (
    <section className={`p-4 ${styles}`}>
      {title && <Text value={title} size="lg" styles="font-thin" />}
      {children}
    </section>
  );
};
