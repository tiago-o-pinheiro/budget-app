import clsx from "clsx";
import { useEffect, useState } from "react";
import { Container, Text } from "@components";
import {
  activeOptionStyles,
  booleanContainerStyles,
  booleanKnobStyles,
  btnStyles,
  containerStyles,
} from "./styles";

interface SwitchButtonProps {
  handleClick: (value: string | boolean) => void;
  values: string[];
  defaultValue?: string | boolean;
  type?: "text" | "boolean";
}

const Switch = ({ handleClick, defaultValue }: SwitchButtonProps) => {
  const [active, setActive] = useState(defaultValue ?? false);

  useEffect(() => {
    if (defaultValue) {
      setActive(defaultValue);
    }
  }, []);

  const handleOptionClick = (value: string | boolean) => {
    setActive(value);
    handleClick(value);
  };

  return (
    <div onClick={() => handleOptionClick(!active)}>
      <Container styles={booleanContainerStyles(Boolean(active))} clean>
        <div className={booleanKnobStyles(Boolean(active))} />
      </Container>
    </div>
  );
};

const SwitchTextButtons = ({
  handleClick,
  values,
  defaultValue,
}: SwitchButtonProps) => {
  const [active, setActive] = useState(defaultValue ?? values[0]);

  const handleOptionClick = (value: string | boolean) => {
    setActive(value);
    handleClick(value);
  };

  return (
    <Container styles={containerStyles()}>
      <div
        className={activeOptionStyles()}
        style={{
          transform: `translateX(${active === values[0] ? "0%" : "100%"})`,
        }}
      />
      {values.map((value) => (
        <button
          key={value}
          type="button"
          className={clsx(
            btnStyles(),
            active === value ? "text-white" : "text-black"
          )}
          onClick={() => handleOptionClick(value)}
        >
          <Text value={value} styles="capitalize" />
        </button>
      ))}
    </Container>
  );
};

export const SwitchButton = ({
  handleClick,
  values,
  defaultValue,
  type = "text",
}: SwitchButtonProps) => {
  const UI = type === "boolean" ? Switch : SwitchTextButtons;

  return (
    <UI handleClick={handleClick} values={values} defaultValue={defaultValue} />
  );
};
