"use client";

import { cn } from "@/lib/utils";
import { Dialog, Transition } from "@headlessui/react";
import type { FC, ReactNode } from "react";
import { Fragment, useCallback } from "react";
import { Icons } from "./icons";

interface ModalProps {
  icon?: ReactNode;
  title?: ReactNode;
  footer?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  show: boolean;
  children: ReactNode[] | ReactNode;
  dataTestId?: string;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({
  icon,
  title,
  size = "sm",
  show,
  footer,
  children,
  dataTestId = "",
  onClose,
}) => {
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[100] overflow-y-auto sm:overflow-y-hidden"
        onClose={handleClose}
        data-testid={dataTestId}
      >
        <div className="flex min-h-screen items-center justify-center p-4 text-center sm:block sm:p-2 ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/75 transition-opacity dark:bg-gray-900/80" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4  sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0  sm:scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={cn(
                { "sm:max-w-5xl": size === "lg" },
                { "sm:max-w-4xl": size === "md" },
                { "sm:max-w-lg": size === "sm" },
                { "sm:max-w-sm": size === "xs" },
                "inline-block w-full scale-100 rounded-xl  bg-white text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:align-middle relative  "
              )}
            >
              {onClose ? (
                <div>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-white   fixed top-3 right-3 bg-primary z-50"
                    onClick={onClose}
                  >
                    <Icons.close className="h-5 w-5" />
                  </button>
                </div>
              ) : null}
              {title && (
                <div className="divider flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center space-x-2 font-bold">
                    {icon}
                    <div>{title}</div>
                  </div>
                  {/* {onClose ? (
                    <button
                      type='button'
                      className='rounded-full p-1 text-gray-800 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700'
                      onClick={onClose}
                    >
                      <Icons.close className='h-5 w-5' />
                    </button>
                  ) : null} */}
                </div>
              )}
              {children}

              {footer && (
                <div className="divider flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center space-x-2 font-bold">
                    <div>{footer}</div>
                  </div>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
