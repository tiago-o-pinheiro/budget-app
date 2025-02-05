import { Button, Container, Icon, Input, Modal } from "@components";
import { generateRandomColor } from "@config";
import { Category } from "@interfaces";
import { FormProvider, useForm } from "react-hook-form";
import { HiBars4 } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { IconPicker } from "./IconPicker";
import { ColorPicker } from "./ColorPicker";
import { useCategoryProvider } from "@hooks";

type CategoryForm = Omit<Category, "id">;

interface ManageCategoryProps {
  category?: Category;
  close: () => void;
}

const DEFAULT_FORM_STATE = {
  name: "",
  color: "",
  icon: "",
};

export const ManageCategory = ({ category, close }: ManageCategoryProps) => {
  const [color, setColor] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const { addCategory, editCategory } = useCategoryProvider();
  const methods = useForm<CategoryForm>({
    defaultValues: category || DEFAULT_FORM_STATE,
  });

  const { handleSubmit } = methods;

  const submitForm = (data: CategoryForm) => {
    if (category) {
      editCategory(category.id, data);
      return handleClose();
    }
    addCategory(data);
    handleClose();
  };

  const handleClose = () => {
    close();
  };

  useEffect(() => {
    if (!category) {
      return setColor(generateRandomColor());
    }

    if (category) {
      setColor(category.color);
      return setIcon(category.icon);
    }
  }, []);

  const handlePickColor = (color: string) => {
    setColor(color);
    methods.setValue("color", color);
  };

  const handleIconPicker = (icon: string) => {
    setIcon(icon);
    methods.setValue("icon", icon);
  };

  return (
    <Container>
      <Modal title="Manage Category" close={handleClose}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submitForm)}>
            <Input
              name="name"
              label="Name"
              type="text"
              placeholder="Enter a category name"
            >
              <Icon size="lg" styles="text-xl">
                <HiBars4 />
              </Icon>
            </Input>
            <ColorPicker handleClick={handlePickColor} color={color} />
            <IconPicker handleClick={handleIconPicker} icon={icon} />
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" title="Cancel" onClick={handleClose} />
              <Button type="submit" title="Save" />
            </div>
          </form>
        </FormProvider>
      </Modal>
    </Container>
  );
};
