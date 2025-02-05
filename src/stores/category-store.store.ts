import { CATEGORY_LIST } from "@constants";
import { Category, CategoryStore } from "@interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const generateId = (items: { id: number }[]) =>
  items.length > 0 ? items[items.length - 1].id + 1 : 0;

const initialState: CategoryStore = {
  categories: CATEGORY_LIST,
  addCategory: () => {},
  removeCategory: () => {},
  editCategory: () => {},
};

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      ...initialState,
      addCategory: (category: Omit<Category, "id">) =>
        set((state) => {
          const lastId = generateId(state.categories);
          const newCategory = { ...category, id: lastId + 1 };
          return {
            categories: [...state.categories, newCategory],
          };
        }),
      removeCategory: (id: number) => {
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id),
        }));
      },
      editCategory: (id: number, category: Partial<Category>) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...category } : c
          ),
        }));
      },
    }),
    {
      name: "categories-storage",
    }
  )
);
