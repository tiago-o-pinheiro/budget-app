import {
  Description,
  Field,
  Input as StyledInput,
  Label,
} from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

import { Container } from "@components";
import { useThemeEffect } from "@hooks";

interface InputProps {
  type: "text" | "number" | "password" | "email" | "date" | "checkbox";
  name: string;
  label: string;
  error?: boolean;
  placeholder?: string;

  isForm?: boolean;
  isRequired?: boolean;
  children?: React.ReactNode;
  props?: any;
}

const containerStyles = (styles: string) => {
  return clsx(
    "p-3 bg-gray-300/50 flex flex-row-reverse rounded-3xl justify-center items-center mb-2 border border-1",
    `${styles}`
  );
};

const inputStyles = () => {
  const { theme } = useThemeEffect();
  const textColor = theme === "light" ? "text-gray-600" : "text-gray-300";

  return clsx("bg-transparent text-sm", "focus:outline-none", `${textColor}`);
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
    <Container styles={containerStyles(styles ?? "")} clean={true}>
      <div className={fieldStyles()}>{children}</div>
    </Container>
  );
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
    <Container clean={true} styles={containerStyles("")}>
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
      {children && <div className="w-12 flex justify-center">{children}</div>}
    </Container>
  );
};
