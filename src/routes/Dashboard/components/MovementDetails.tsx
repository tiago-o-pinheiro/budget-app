import {
  Badge,
  Button,
  ConfirmDialog,
  Container,
  Icon,
  PageHeader,
  Text,
  Title,
} from "@components";
import { ChevronLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  useAccountProvider,
  useCategoryProvider,
  useCurrencyFormatter,
} from "@hooks";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
  }).format(new Date(date));
};

const MovementContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PageHeader title="Movement Details" />
      <Container styles="mt-10 bg-gray-100 rounded-3xl p-4 flex flex-col gap-1">
        {children}
      </Container>
    </>
  );
};

const Price = ({ value }: { value: number }) => {
  const formattedValue = useCurrencyFormatter({ value });
  return (
    <Text
      value={formattedValue}
      size="md"
      styles="font-bold"
      color={value < 0 ? "red" : "green"}
    />
  );
};

export const MovementDetails = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const accountId = searchParams.get("accountId");
  const movementId = searchParams.get("movementId");
  const { getAccount, removeMovement } = useAccountProvider();
  const account = getAccount(Number(accountId));
  const movement = account?.movements?.find((m) => m.id === Number(movementId));
  const navigate = useNavigate();
  const { getCategory } = useCategoryProvider();

  const handleDelete = () => {
    if (!movement || !account?.name) return;
    removeMovement(account.name, Number(movementId));
    navigate(-1);
    setIsOpen(false);
  };

  if (!movement)
    return (
      <MovementContainer>
        <Title value="Movement not found" size="lg" styles="mb-4 text-center" />
      </MovementContainer>
    );

  const date = formatDate(movement.date);
  const category = getCategory(movement.category);

  return (
    <Container>
      <div className="flex flex-col justify-start items-center gap-4 mb-8 bg-gray-100 absolute top-0 left-0 right-0 p-4">
        <div className="self-start gap-4" onClick={() => navigate(-1)}>
          <ChevronLeftIcon className="size-5 text-black" />
        </div>
        <div
          className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full"
          style={{ backgroundColor: category?.color }}
        >
          <Icon name={category?.icon ?? ""} size="md" />
        </div>
        <Title value={movement.name} size="lg" styles="" />
        <Badge value={category?.name ?? ""} />
      </div>

      <div className="flex justify-between items-center border-b-2 pb-4 mt-56">
        <Text value={"Account name:"} size="md" color="primary" />
        <Text
          value={account?.name ?? ""}
          size="sm"
          color="primary"
          styles="font-thin"
        />
      </div>

      <div className="flex justify-between items-center mt-4 border-b-2 pb-4">
        <Text value={"Amount:"} size="md" color="primary" />
        <Price value={movement.value} />
      </div>

      <div className="flex justify-between items-center mt-4 border-b-2 pb-4">
        <Text value={"Date:"} size="md" color="primary" />
        <Text value={date} size="sm" styles="font-thin" />
      </div>

      {movement?.frequency && (
        <div className="flex justify-between items-center mt-4 border-b-2 pb-4">
          <Text value={"Frequency:"} size="md" color="primary" />
          <Badge value={movement.frequency} />
        </div>
      )}

      {movement?.description && (
        <div className="flex justify-between items-start mt-4 pb-4 flex-col gap-2">
          <Text value={"Description:"} size="md" color="primary" />
          <Text value={movement.description} size="sm" styles="font-thin" />
        </div>
      )}

      <div className="flex justify-end items-center mt-4">
        <Button
          title="Delete"
          family="danger"
          size="md"
          onClick={() => setIsOpen(true)}
        >
          <TrashIcon className="w-5 h-5 text-red-500" />
        </Button>
      </div>

      {isOpen && (
        <ConfirmDialog
          title="Delete Movement"
          text="Are you sure you want to delete this momvent? This action can't be undone."
          cancelAction={() => setIsOpen(false)}
          confirmAction={handleDelete}
        />
      )}
    </Container>
  );
};
