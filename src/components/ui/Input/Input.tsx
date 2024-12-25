import {
  Description,
  Field,
  Input as StyledInput,
  Label,
} from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

interface InputProps {
  type: "text" | "number" | "password" | "email" | "date";
  name: string;
  label: string;
  error?: boolean;
  placeholder?: string;

  isForm?: boolean;
  isRequired?: boolean;
  children?: React.ReactNode;
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

export const Input = ({
  type,
  name,
  label,
  placeholder,
  isForm = true,
  isRequired = false,
  error = false,
  children,
  props,
}: InputProps) => {
  const { register } = useFormContext();

  return (
    <Container>
      <Field className={fieldStyles()}>
        <Label className={labelStyles()} htmlFor={name}>
          {label && label}
        </Label>

        {isForm ? (
          <StyledInput
            {...register(name, {
              required: isRequired,
              valueAsNumber: type === "number",
            })}
            className={inputStyles()}
            placeholder={placeholder}
            type={type}
            step={0.01}
            {...props}
          />
        ) : (
          <StyledInput
            name={name}
            type={type}
            placeholder={placeholder}
            className={inputStyles()}
            step={0.01}
            {...props}
          />
        )}
        <Description className={descriptionStyles(error)}>
          This field is required
        </Description>
      </Field>
      <div className="w-12 flex justify-center">{children}</div>
    </Container>
  );
};
