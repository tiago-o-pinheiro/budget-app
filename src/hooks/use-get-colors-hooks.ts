export const useGetColors = (value: string) => {
  if (!value) return "hsl(0, 0%, 70%)";

  const hash = value
    .split("")
    .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 85%)`;
};
