import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as IcoIcons5 from "react-icons/io5";

const FA_ICONS = Object.keys(FaIcons)
  .filter((icon) => icon.startsWith("Fa"))
  .map((icon) => ({
    name: icon,
    component: FaIcons[icon as keyof typeof FaIcons],
  }));

const FA6_ICONS = Object.keys(Fa6Icons)
  .filter((icon) => icon.startsWith("Fa"))
  .map((icon) => ({
    name: icon,
    component: Fa6Icons[icon as keyof typeof Fa6Icons],
  }));

const ICO_ICONS_5 = Object.keys(IcoIcons5)
  .filter((icon) => icon.startsWith("Io"))
  .map((icon) => ({
    name: icon,
    component: IcoIcons5[icon as keyof typeof IcoIcons5],
  }));

export const ICON_LIST = [...FA_ICONS, ...FA6_ICONS, ...ICO_ICONS_5];
