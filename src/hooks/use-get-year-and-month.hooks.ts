export const useGetYearAndMonth = () => {
  const today = new Date();
  return { year: today.getFullYear(), month: today.getMonth() + 1 };
};
