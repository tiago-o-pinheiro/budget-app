import { useGetColors } from "@hooks";

interface AvatarProps {
  value: string;
  image?: string;
  size?: "small" | "medium" | "large" | "xlarge";
}

const SIZE = {
  small: "h-8 w-8",
  medium: "h-10 w-10",
  large: "h-14 w-14",
  xlarge: "h-16 w-16",
};

export const Avatar = ({ value, image, size }: AvatarProps) => {
  const backgroundColor = useGetColors(value);
  const avatarSize = SIZE[size || "medium"];

  if (image) {
    return (
      <img src={image} className={`rounded-full ${avatarSize}`} alt={value} />
    );
  }

  return (
    <div
      className={`text-lg font-bold text-gray-800 rounded-full ${avatarSize} flex items-center justify-center`}
      style={{ backgroundColor }}
    >
      {value.charAt(0).toUpperCase()}
    </div>
  );
};
