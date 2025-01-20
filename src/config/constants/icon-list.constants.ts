import * as FaIcons from "react-icons/fa";

export const ICON_LIST = Object.keys(FaIcons)
  .filter((icon) => icon.startsWith("Fa"))
  .map((icon) => ({
    name: icon,
    component: FaIcons[icon as keyof typeof FaIcons],
  }));
