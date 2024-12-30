import { useGetColors } from "@hooks";

interface AvatarProps {
  value: string;
  image?: string;
}

export const Avatar = ({ value, image }: AvatarProps) => {
  const backgroundColor = useGetColors(value);

  if (image) {
    return <img src={image} alt="avatar" className="rounded-full h-14 w-14" />;
  }

  return (
    <div
      className="text-lg font-bold text-gray-800 rounded-full h-14 w-14 flex items-center justify-center"
      style={{ backgroundColor }}
    >
      {value.charAt(0).toUpperCase()}
    </div>
  );
};
