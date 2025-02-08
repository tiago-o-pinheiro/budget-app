import { BellIcon, Cog6ToothIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import {
  useAccountProvider,
  useCurrencyFormatter,
  useThemeEffect,
} from "@hooks";
import { Text, Title, Avatar } from "@components";
import { Link } from "react-router-dom";

const iconStyles = () => {
  return clsx("w-5 h-5 text-gray-500");
};

const Profile = () => {
  const { totalBalance } = useAccountProvider();
  const formattedBalance = useCurrencyFormatter({ value: totalBalance });

  return (
    <div className="flex items-center justify-center gap-2">
      <Avatar
        image="https://avatars.githubusercontent.com/u/64702589?v=4"
        value="Profile"
        size="small"
      />
      <div className="flex flex-col items-start gap-1">
        <Title value="Tiago Oliver" size="sm" />
        <Text
          value={`Total: ${formattedBalance}`}
          size="xs"
          color="secondary"
        />
      </div>
    </div>
  );
};

export const Header = () => {
  const { theme } = useThemeEffect();
  const bgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
  return (
    <header
      className={`flex justify-between items-center h-16 mb-2 fixed w-full top-0 left-0 right-0 z-20 ${bgColor}`}
    >
      <div className="flex items-center justify-start p-2 gap-2">
        <Profile />
      </div>
      <div className="flex items-center justify-end p-2 gap-2 px-4">
        <Link to="/settings">
          <Cog6ToothIcon className={iconStyles()} />
        </Link>
        <BellIcon className={iconStyles()} />
      </div>
    </header>
  );
};
