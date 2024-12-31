import { BellIcon, Cog6ToothIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useAccountProvider, useCurrencyFormatter } from "@hooks";
import { Text, Title } from "../Typo/Typo";

const Avatar = () => {
  return (
    <img
      src="https://avatars.githubusercontent.com/u/64702589?v=4"
      alt="avatar"
      className="w-10 h-10 rounded-full"
    />
  );
};

const iconStyles = () => {
  return clsx("w-5 h-5 text-gray-500");
};

const Profile = () => {
  const { totalBalance } = useAccountProvider();
  const formattedBalance = useCurrencyFormatter({ value: totalBalance });

  return (
    <div className="flex items-center justify-center gap-2">
      <Avatar />
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
  return (
    <header className="flex justify-between items-center bg-white  h-16 mb-2 fixed w-full top-0 left-0 right-0 z-20">
      <div className="flex items-center justify-start p-2 gap-2">
        <Profile />
      </div>
      <div className="flex items-center justify-end p-2 gap-2 px-4">
        <Cog6ToothIcon className={iconStyles()} />
        <BellIcon className={iconStyles()} />
      </div>
    </header>
  );
};
