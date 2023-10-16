"use client";

import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from "body-scroll-lock";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

import Scrollbar from "@/components/ui/scrollbar";
import { fadeInLeft } from "@/lib/motion/fade-in-left";
import { fadeInOut } from "@/lib/motion/fade-in-out";
import { fadeInRight } from "@/lib/motion/fade-in-right";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const Portal = dynamic(() => import("@reach/portal"), { ssr: false });

interface DrawerProps {
  children: any;
  open: boolean;
  variant?: "left" | "right";
  useBlurBackdrop?: boolean;
  onClose: () => void;
}
type DivElementRef = React.MutableRefObject<HTMLDivElement>;

const Drawer: React.FC<DrawerProps> = ({
  children,
  open = false,
  variant = "right",
  useBlurBackdrop,
  onClose,
}) => {
  const ref = useRef() as DivElementRef;

  useEffect(() => {
    if (ref.current) {
      const target: any =
        typeof window !== "undefined" &&
        document.querySelector(".drawer .os-viewport");
      if (open) {
        disableBodyScroll(target);
      } else {
        enableBodyScroll(target);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [open]);

  // useEffect(() => {
  //   if (ref.current) {
  //     if (open) {
  //       disableBodyScroll(ref.current);
  //     } else {
  //       enableBodyScroll(ref.current);
  //     }
  //   }
  //   return () => {
  //     clearAllBodyScrollLocks();
  //   };
  // }, [open]);

  return (
    <Portal>
      <div>
        <AnimatePresence>
          {open && (
            <motion.aside
              ref={ref}
              key="drawer"
              initial="from"
              animate="to"
              exit="from"
              variants={variant === "right" ? fadeInRight() : fadeInLeft()}
              className="fixed inset-0 z-[110] h-full overflow-hidden"
            >
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  initial="from"
                  animate="to"
                  exit="from"
                  variants={fadeInOut(0.35)}
                  onClick={onClose}
                  className={cn(
                    "absolute inset-0 bg-black bg-opacity-40",
                    useBlurBackdrop && "use-blur-backdrop"
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-y-0 flex max-w-full outline-none",
                    variant === "right" ? "right-0" : "left-0"
                  )}
                >
                  <div className="h-full w-screen max-w-md">
                    <div className="drawer flex h-full flex-col bg-slate-50 text-base shadow-xl">
                      <Scrollbar className="h-full w-full">
                        {children}
                      </Scrollbar>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </Portal>
  );
};

export default Drawer;
