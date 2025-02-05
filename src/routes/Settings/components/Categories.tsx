import {
  Alert,
  Button,
  ConfirmDialog,
  Container,
  Icon,
  PageHeader,
  Text,
} from "@components";
import { ICON_LIST } from "@constants";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useCategoryProvider } from "@hooks";
import { useState } from "react";
import { FaGripLines } from "react-icons/fa";
import { ManageCategory } from "./ManageCategory/ManageCategory";

interface CategoryProps {
  id: number;
  name: string;
  color: string;
  icon: string;
}

type CategoryIconProps = {
  name: string;
};

const CategoryIcon = ({ name }: CategoryIconProps) => {
  const icon = ICON_LIST.find((icon) => icon.name === name);

  const IconComponent = icon?.component || FaGripLines;

  return <IconComponent />;
};

const Category = ({ id, name, color, icon }: CategoryProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const { removeCategory } = useCategoryProvider();

  return (
    <div className="flex items-center justify-between p-4 border-b gap-2">
      <div className="w-2/12">
        <Icon size="lg" bgColor={color} styles="text-white">
          <CategoryIcon name={icon} />
        </Icon>
      </div>
      <div className="w-6/12">
        <Text value={name} size="md" styles="font-thin" />
      </div>
      <div className="w-4/12 flex justify-end gap-2">
        <Button onClick={() => setOpenForm(true)} size="sm" family="ghost">
          <PencilIcon className="size-5 text-gray-500/50" />
        </Button>
        <Button
          onClick={() => setConfirmDelete(true)}
          size="sm"
          family="danger"
        >
          <TrashIcon className="size-5 text-rose-500/50" />
        </Button>
      </div>
      {confirmDelete && (
        <ConfirmDialog
          title="Delete category?"
          text="Are you sure you want to delete this category? This action cant be undone!"
          confirmAction={() => removeCategory(id)}
          cancelAction={() => setConfirmDelete(false)}
        />
      )}
      {openForm && (
        <ManageCategory
          close={() => setOpenForm(false)}
          category={{
            id,
            name,
            color,
            icon,
          }}
        />
      )}
    </div>
  );
};

export const Categories = () => {
  const [openForm, setOpenForm] = useState(false);
  const { categories } = useCategoryProvider();

  return (
    <Container styles="mb-16">
      <PageHeader title="Categories" to="/settings" />
      <Alert
        message="Add or remove categories. It will be used to create new movements and budgets"
        type="info"
      />

      <div
        onClick={() => setOpenForm(true)}
        className="flex items-center justify-start p-4 border-dashed border-2 rounded-lg border-gray-200 gap-2 my-2"
      >
        <div className="w-2/12">
          <Icon size="lg" bgColor="gray-200" styles="text-gray-700">
            <PlusCircleIcon />
          </Icon>
        </div>
        <div className="w-10/12">
          <Text value="Add new category" size="md" styles="font-thin" />
        </div>
      </div>
      {categories.map((category) => (
        <Category key={category.id} {...category} />
      ))}

      {openForm && <ManageCategory close={() => setOpenForm(false)} />}
    </Container>
  );
};
