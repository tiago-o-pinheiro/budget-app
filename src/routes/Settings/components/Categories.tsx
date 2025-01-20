import { Alert, Container, PageHeader } from "@components";
import { useCategoryProvider } from "@hooks";

export const Categories = () => {
  const { categories } = useCategoryProvider();
  return (
    <Container>
      <PageHeader title="Categories" to="/settings" />
      <Alert
        message="Add or remove categories. It will be used to create new movements and budgets"
        type="info"
      />
      <div>
        {categories.map((category) => (
          <div key={category.id}>{category.name}</div>
        ))}
      </div>
    </Container>
  );
};
