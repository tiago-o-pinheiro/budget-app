import { CategoryStore } from "@interfaces";
import { useCategoryStore } from "@stores";

export const useCategoryProvider = () => {
  const categories = useCategoryStore(
    (state: CategoryStore) => state.categories
  );
  const addCategory = useCategoryStore((state) => state.addCategory);
  const removeCategory = useCategoryStore((state) => state.removeCategory);
  const editCategory = useCategoryStore((state) => state.editCategory);
  const getCategory = (id: number) => {
    const parsedId = Number(id);
    return categories.find((category) => category.id === parsedId);
  };

  return { categories, addCategory, removeCategory, editCategory, getCategory };
};
