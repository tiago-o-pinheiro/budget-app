import { useNavigate } from "react-router-dom";
import { Button, Title } from "@components";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PageHeaderProps {
  title: string;
  to?: string;
}

export const PageHeader = ({ title, to = "" }: PageHeaderProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex justify-start items-center mb-4 border-b border-gray-200 h-14">
      <div className="flex-none w-20">
        <Button title="Back" onClick={goBack} family="nav">
          <ArrowLeftIcon className="size-4 text-black" />
        </Button>
      </div>
      <div className="grow w-full text-center">
        <Title value={title} size="lg" />
      </div>
      <div className="flex-none w-20"></div>
    </div>
  );
};
