import {
  Description,
  Field,
  Select as StyledSelect,
  Label,
} from "@headlessui/react";

import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useFormContext } from "react-hook-form";

interface ContainerProps {
  children: React.ReactNode;
  styles?: string;
}

type DataInterface = {
  id: number | string;
  name: number | string;
  value?: number | string;
};

interface SelectProps<T extends DataInterface> {
  data?: T[];
  name: string;
  label: string;
  handleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children?: React.ReactNode;
  isRequired?: boolean;
  error?: boolean;
  isForm?: boolean;
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

const selectStyles = () => {
  return clsx(
    " block w-full appearance-none bg-transparent text-sm text-gray-600",
    "focus:outline-none"
  );
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

export const Select = <T extends DataInterface>({
  name,
  label,
  error = false,
  children,
  data = [],
  isForm = true,
  handleChange = () => {},
}: SelectProps<T>) => {
  const { register } = useFormContext();
  return (
    <Container>
      <Field className={fieldStyles()}>
        <Label className={labelStyles()} htmlFor={name}>
          {label && label}
        </Label>

        <div className="relative">
          <StyledSelect
            className={selectStyles()}
            {...(isForm ? register(name, { required: true }) : {})}
            name={name}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              handleChange(event)
            }
          >
            {data.map((item) => (
              <option key={item.id} value={item.value ?? item.id}>
                {item.name}
              </option>
            ))}
          </StyledSelect>
          <ChevronDownIcon
            className="group pointer-events-none absolute top-0 right-0 size-4 fill-white/60"
            aria-hidden="true"
          />
        </div>
        <Description className={descriptionStyles(error)}>
          This field is required
        </Description>
      </Field>
      {children && <div className="w-12 flex justify-center">{children}</div>}
    </Container>
  );
};
