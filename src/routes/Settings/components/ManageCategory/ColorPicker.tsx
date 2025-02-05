import { Icon, Text } from "@components";
import { generateRandomColor } from "@config";
import { useState, useEffect } from "react";
import { PiPalette } from "react-icons/pi";

interface ColorPickerProps {
  handleClick: (color: string) => void;
  color?: string;
}

export const ColorPicker = ({ handleClick, color }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const randomColors = Array.from({ length: 20 }, () => generateRandomColor());
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (isOpen) {
      setMaxHeight("500px");
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen]);

  const handleColorPicker = (color: string) => {
    handleClick(color);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!color) {
      handleClick(randomColors[0]);
    }
  }, []);

  return (
    <div className="bg-gray-200 rounded-3xl p-4 mb-2">
      <div className="flex items-center justify-between gap-2">
        <Icon size="lg" styles="w-1/12 mx-1 text-xl">
          <PiPalette />
        </Icon>
        <div className="w-9/12">
          <Text
            value="Pick a color"
            size="md"
            styles="text-sm font-medium dark:text-white text-gray-500/70"
          />
        </div>
        <div onClick={() => setIsOpen(!isOpen)} className="w-2/12">
          <div
            className={`w-8 h-8 rounded-xl mx-auto`}
            style={{ backgroundColor: color ? color : "gray" }}
          />
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight }}
      >
        <div className="flex flex-wrap gap-2 items-center justify-center mt-2 bg-white rounded-xl p-2">
          {randomColors.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-xl border"
              style={{ backgroundColor: color }}
              onClick={() => handleColorPicker(color)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
