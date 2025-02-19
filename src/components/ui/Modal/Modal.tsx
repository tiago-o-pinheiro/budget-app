import { Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Title } from "../Typo/Typo";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  isOpen?: boolean; // Fix type to boolean
  close: () => void;
}

const Backdrop = () => {
  return (
    <div className="fixed inset-0 h-full w-full backdrop-blur-sm bg-white/30 bg-opacity-50 z-30 transition duration-200 ease-in data-[closed]:opacity-0"></div>
  );
};

export const Modal = ({ children, title, close }: ModalProps) => {
  const [isShowing, setIsShowing] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const body = document.body;

    if (isShowing) {
      const originalOverflow = body.style.overflow;
      body.style.overflow = "hidden";

      return () => {
        body.style.overflow = originalOverflow;
      };
    }
  }, [isShowing]);

  useEffect(() => {
    setTimeout(() => setIsShowing(true), 100);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  return (
    <div className="flex justify-center inset-0 items-center h-dvh fixed z-40">
      <Backdrop />
      <Transition show={isShowing}>
        <div
          ref={modalRef}
          className={clsx(
            "ease-in duration-200 transition duration-200 ease-in data-[closed]:opacity-0 border border-gray-200",
            "fixed left-2 right-2 bg-white rounded-3xl shadow-2xl p-4 z-40",
            "md:w-96 md:mx-auto md:left-1/2 md:top-1/2 md:right-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl"
          )}
        >
          {title && (
            <div className="pb-2 mb-2 border-b border-gray-200 text-center">
              <Title value={title} />
            </div>
          )}

          {children}
        </div>
      </Transition>
    </div>
  );
};
