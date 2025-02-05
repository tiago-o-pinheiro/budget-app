export const usePercentage = (total: number, value: number) => {
  if (value === 0) return 0;
  const percentage = (Math.abs(value) * 100) / Math.abs(total);

  return percentage.toFixed(1);
};
