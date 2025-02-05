export const generateRandomColor = () => {
  const getPastelValue = () => Math.floor(Math.random() * 128 + 127);

  const red = getPastelValue();
  const green = getPastelValue();
  const blue = getPastelValue();

  return `#${((1 << 24) + (red << 16) + (green << 8) + blue)
    .toString(16)
    .slice(1)}`;
};
