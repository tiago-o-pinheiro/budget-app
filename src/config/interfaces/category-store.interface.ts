export type Category = {
  id: number;
  name: string;
  color: string;
  icon: string;
};

export interface CategoryStore {
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => void;
  removeCategory: (id: number) => void;
  editCategory: (id: number, category: Partial<Category>) => void;
}
