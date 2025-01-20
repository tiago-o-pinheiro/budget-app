export type Category = {
  id: number;
  name: string;
  color: string;
  icon: string;
};

export interface CategoryStore {
  categories: Category[];
  addCategory: (category: Category) => void;
  removeCategory: (id: number) => void;
  editCategory: (id: number, category: Partial<Category>) => void;
}
