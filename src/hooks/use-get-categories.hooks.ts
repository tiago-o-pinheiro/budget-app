import { MovementCategory } from "@config";

export const useGetCategories = () => {
  return Object.values(MovementCategory).map((category) => ({
    name: category,
    id: category,
    value: category,
  }));
};
