import {
  ChevronRightIcon,
  LanguageIcon,
  MoonIcon,
  QueueListIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

interface IconProps {
  name: keyof typeof ICONS;
  size?: "sm" | "md" | "lg" | "xs";
  color?: "primary" | "secondary";
  styles?: string;
  children?: React.ReactNode;
}

const COLORS = {
  primary: "text-dark dark:text-white",
  secondary: "text-gray-500 dark:text-gray-300",
};

const SIZES = {
  xs: "size-6",
  sm: "size-7",
  md: "size-8",
  lg: "size-9",
};

const ICONS = {
  moon: <MoonIcon />,
  sun: <SunIcon />,
  "queue-list": <QueueListIcon />,
  "chevron-right": <ChevronRightIcon />,
  language: <LanguageIcon />,
  user: <UserIcon />,
};

export const Icon = ({
  size = "xs",
  color = "primary",
  name,
  styles,
  children,
}: IconProps) => {
  return (
    <div className={clsx(SIZES[size], COLORS[color ?? "primary"], styles)}>
      {children ?? ICONS[name]}
    </div>
  );
};
