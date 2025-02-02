import { Button } from "@components";
import { ICON_LIST } from "@constants";
import { useState, useEffect } from "react";
import { FaIcons, FaQuestion } from "react-icons/fa";
import { HiMiniArrowPath } from "react-icons/hi2";

interface IconPickerProps {
  handleClick: (icon: string) => void;
  icon?: string;
}

export const IconPicker = ({ handleClick, icon }: IconPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [randomIcons, setRandomIcons] = useState(ICON_LIST.slice(0, 20));
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredIcons, setFilteredIcons] = useState(ICON_LIST.slice(0, 20));

  const generateRandomIcons = () => {
    const shuffledIcons = [...ICON_LIST].sort(() => Math.random() - 0.5);
    setRandomIcons(shuffledIcons.slice(0, 20));
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredIcons(randomIcons);
    } else {
      const results = ICON_LIST.filter((icon) =>
        icon.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 20);
      setFilteredIcons(results);
    }
  }, [searchQuery, randomIcons]);

  const handleIconPicker = (selectedIcon: string) => {
    handleClick(selectedIcon);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!icon) {
      handleClick("FaQuestion");
    }
  }, []);

  const SelectedIcon = ICON_LIST.find((item) => item.name === icon);

  return (
    <div className="bg-gray-200 rounded-3xl p-4 mb-2">
      <div className="flex items-center justify-between gap-2">
        <div className="w-1/12 mx-1 text-xl">
          <FaIcons />
        </div>
        <div className="w-9/12">
          <p className="text-sm font-medium dark:text-white text-gray-500/70">
            Choose an icon
          </p>
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-2/12 cursor-pointer"
        >
          {SelectedIcon ? (
            <SelectedIcon.component className="text-xl text-gray-500" />
          ) : (
            <FaQuestion className="text-xl text-gray-500" />
          )}
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="mt-4 p-2 bg-white rounded-xl">
          <div className="flex items-center gap-2 justify-center mb-4">
            <input
              type="text"
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-2xl text-sm pl-4"
            />
          </div>

          <div
            className={`flex flex-wrap gap-2 items-center justify-center transition-all duration-300 ease-in-out ${
              filteredIcons.length > 5 ? "min-h-[100px]" : "min-h-[50px]"
            }`}
          >
            {filteredIcons.map((icon, index) => (
              <div
                key={index}
                className="w-8 h-8 cursor-pointer"
                onClick={() => handleIconPicker(icon.name)}
              >
                <icon.component className="text-xl" />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button onClick={generateRandomIcons} title="Refresh" type="button">
              <HiMiniArrowPath />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
