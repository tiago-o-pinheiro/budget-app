import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Title } from "../Typo/Typo";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  isOpen?: Boolean;
}

const Backdrop = () => {
  return (
    <div className="fixed inset-0 h-full w-full bg-black bg-opacity-50 z-30 transition duration-200 ease-in data-[closed]:opacity-0"></div>
  );
};

export const Modal = ({ children, title }: ModalProps) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsShowing(true), 100);
  }, []);

  return (
    <div className="flex justify-center inset-0 items-center h-screen fixed z-40">
      <Backdrop />
      <Transition show={isShowing}>
        <div
          className={clsx(
            "ease-in duration-200 transition duration-200 ease-in data-[closed]:opacity-0",
            "fixed left-2 right-2  bg-white rounded-3xl shadow-lg p-4 z-40",
            "md:w-96 md:mx-auto md:left-1/2 md:top-1/2 md:right-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl "
          )}
        >
          <div className="pb-2 mb-2 border-b border-gray-200 text-center">
            <Title value={title ?? ""} />
          </div>
          {children}
        </div>
      </Transition>
    </div>
  );
};
