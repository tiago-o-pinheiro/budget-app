import { useNavigate } from "react-router-dom";
import { Title } from "@components";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

interface PageHeaderProps {
  title: string;
  to?: string;
}

export const PageHeader = ({ title, to = "/" }: PageHeaderProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex justify-start items-center mb-4 h-14">
      <div className="flex-none pr-4">
        <div title="Back" onClick={goBack}>
          <ChevronLeftIcon className="size-5 text-black" />
        </div>
      </div>
      <div className="grow w-full text-left">
        <Title value={title} size="md" color="secondary" />
      </div>
    </div>
  );
};
