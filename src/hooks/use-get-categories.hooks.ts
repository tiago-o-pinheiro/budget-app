import { MovementCategory } from "@config";

export const useGetCategories = () => {
  return Object.values(MovementCategory).map((category) => ({
    label: category,
    value: category,
  }));
};
