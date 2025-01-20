export const usePercentage = (total: number, value: number) => {
  if (value === 0) return 0;
  const percentage = (value * 100) / total;
  return percentage.toFixed(1);
};
