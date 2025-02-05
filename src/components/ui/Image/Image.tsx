import * as images from "@assets";

type ImagesType = typeof images;

interface ImageProps {
  url?: string;
  id?: keyof ImagesType;
  size?: "small" | "medium" | "large";
  alt?: string;
}

const sizes = {
  small: "w-20 h-20",
  medium: "w-40 h-40",
  large: "w-60 h-60",
};

export const Image = ({ url, alt, size, id }: ImageProps) => {
  const image = id ? images[id] : url;
  return (
    <img
      className={`object-cover ${sizes[size ?? "small"]}`}
      src={image}
      alt={alt}
    />
  );
};
