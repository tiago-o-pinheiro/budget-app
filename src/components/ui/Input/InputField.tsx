import {
  Description,
  Field,
  Input as StyledInput,
  Label,
} from "@headlessui/react";
import clsx from "clsx";

interface FieldProps {
  type: "text" | "number" | "password" | "email" | "date" | "checkbox";
  name: string;
  label: string;
  error?: boolean;
  placeholder?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  defaultValue?: string | number;
  props?: any;
}

interface ContainerProps {
  children: React.ReactNode;
  styles?: string;
}

const containerStyles = (styles: string) => {
  return clsx(
    "p-3 bg-gray-300/50 flex flex-row-reverse rounded-3xl justify-center items-center mb-2",
    `${styles}`
  );
};

const Container = ({ children, styles }: ContainerProps) => {
  const defaultStyles = containerStyles(styles || "");
  return <div className={defaultStyles}>{children}</div>;
};

const inputStyles = () => {
  return clsx("bg-transparent text-sm text-gray-600", "focus:outline-none");
};

const labelStyles = () => {
  return clsx("text-sm/6 font-medium dark:text-white text-gray-500/70");
};

const descriptionStyles = (error: boolean) => {
  return clsx(
    "text-xs/6 dark:text-white/50 text-rose-600/75",
    `${error ? "" : "hidden"}`
  );
};

const fieldStyles = () => {
  return clsx("flex flex-col w-full px-2");
};

export const InputWrapper = ({
  styles,
  children,
}: {
  children: React.ReactNode;
  styles?: string;
}) => {
  return (
    <Container styles={containerStyles(styles ?? "")}>
      <div className={fieldStyles()}>{children}</div>
    </Container>
  );
};

export const InputField = ({
  type,
  name,
  label,
  placeholder,
  error = false,
  children,
  defaultValue,
  props,
  handleChange,
}: FieldProps) => {
  return (
    <Container>
      <Field className={fieldStyles()}>
        <Label className={labelStyles()} htmlFor={name}>
          {label && label}
        </Label>
        <StyledInput
          name={name}
          type={type}
          placeholder={placeholder}
          className={inputStyles()}
          step={0.01}
          onChange={handleChange}
          defaultValue={defaultValue}
          {...props}
        />
        <Description className={descriptionStyles(error)}>
          This field is required
        </Description>
      </Field>
      {children && <div className="w-12 flex justify-center">{children}</div>}
    </Container>
  );
};
