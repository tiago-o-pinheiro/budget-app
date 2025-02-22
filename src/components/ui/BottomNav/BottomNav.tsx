import clsx from "clsx";
import {
  HomeIcon,
  SparklesIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  {
    label: "home",
    path: "/",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "accounts",
    path: "/accounts",
    icon: <WalletIcon className="w-6 h-6" />,
  },
  {
    label: "insights",
    path: "/insights",
    icon: <SparklesIcon className="w-6 h-6" />,
  },
];

const iconStyles = (isActive: boolean) => {
  return clsx(
    isActive ? "text-white dark:text-black" : "text-black dark:text-white",
    "p-1"
  );
};

const iconContainerStyles = (isActive: boolean) => {
  return clsx(
    isActive ? "bg-black dark:bg-white" : "bg-white dark:bg-black",
    "w-12 h-12 flex justify-center items-center rounded-xl p-4 border border-transparent"
  );
};

const URL_LIST = ["accounts", "insights"];

const checkPath = (path: string, location: string) => {
  const pathArray = path.split("/").filter(Boolean);

  if (location === "home") {
    return !pathArray.some((segment) => URL_LIST.includes(segment));
  }

  return pathArray.includes(location);
};

const NavItem = ({
  label,
  path,
  icon,
}: {
  label: string;
  path: string;
  icon: React.ReactNode;
}) => {
  const { pathname } = useLocation();
  const isActive = checkPath(pathname, label);
  const buttonStyle = iconStyles(isActive);
  const containerStyle = iconContainerStyles(isActive);

  return (
    <NavLink to={path}>
      <div className="flex flex-col items-center justify-center">
        <div className={containerStyle}>
          <span className={buttonStyle}>{icon}</span>
        </div>
      </div>
    </NavLink>
  );
};

const ALLOWED_PATHS = ["/", "/accounts", "/insights"];

const shouldRender = (pathname: string) => {
  return ALLOWED_PATHS.includes(pathname);
};

export const BottomNav = () => {
  const { pathname } = useLocation();
  const showNav = shouldRender(pathname);

  if (!showNav) {
    return null;
  }
  return (
    <div className="fixed bottom-1 left-0 right-0 z-10 w-auto">
      <div className="flex justify-center gap-2 p-2 w-fit mx-auto bg-white dark:bg-black shadow-xl dark:shadow-lg rounded-xl">
        {NAV_ITEMS.map(({ label, path, icon }) => (
          <NavItem key={label} label={label} path={path} icon={icon} />
        ))}
      </div>
    </div>
  );
};
