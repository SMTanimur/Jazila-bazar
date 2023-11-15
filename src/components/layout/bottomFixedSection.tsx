"use client";
import { cn } from "@/lib/utils";
import { Popover, Transition } from "@headlessui/react";
import { ChevronUp } from "lucide-react";
import { useTheme } from "next-themes";
import { Fragment, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

const BottomFixedSection = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { setTheme, theme } = useTheme();
  useEffect(() => {
    const checkShowButtonScrollToTop = () => {
      if (window.scrollY > 200) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", checkShowButtonScrollToTop);
    return () =>
      window.removeEventListener("scroll", checkShowButtonScrollToTop);
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="fixed bottom-10 right-12 sm:bottom-7 sm:right-14 z-[40] ">
      <div className="relative flex gap-6 ">
        <Button
          className={cn("uppercase rounded-lg", !showTopBtn && "mr-[52px]")}
        >
          Compare (3)
        </Button>

        <div className=" relative flex-col  gap-4">
          <Button
            className={cn(
              "flex justify-center items-center",
              showTopBtn ? "block" : "hidden"
            )}
            onClick={goToTop}
          >
            <ChevronUp className="w-5 text-center" />
          </Button>

          <div
            className={cn(
              showTopBtn
                ? " absolute bottom-14 right-0"
                : " absolute bottom-0 right-0 "
            )}
          >
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={cn(
                      open ? "text-white" : "text-white/90",
                      "group inline-flex items-center rounded-md bg-primary h-10 px-4 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 w-[] focus-visible:ring-white/75"
                    )}
                  >
                    {open ? (
                      <Icons.close className="w-5" />
                    ) : (
                      <Icons.settings className="w-5" />
                    )}
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute bottom-12 right-0 z-10 mt-3 w-[250px]  transform px-4 sm:px-0 lg:max-w-3xl">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                        <div className="bg-gray-50 dark:bg-gray-900 p-4">
                          <h5 className="mb-5">Theme</h5>
                          <div className="flex justify-between gap-6 items-center">
                            <Button
                              size={"lg"}
                              className={cn(
                                theme === "dark"
                                  ? "bg-primary text-white"
                                  : "bg-gray-200 text-primary hover:text-white",
                                "rounded-md transition duration-200"
                              )}
                              onClick={() => setTheme("dark")}
                            >
                              Dark
                            </Button>
                            <Button
                              size={"lg"}
                              className={cn(
                                theme === "light"
                                  ? "bg-primary text-white"
                                  : "bg-gray-200 text-primary hover:text-white",
                                "rounded-md transition duration-200"
                              )}
                              onClick={() => setTheme("light")}
                            >
                              Light
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomFixedSection;
