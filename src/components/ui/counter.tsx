import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";

type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>
) => void;

type CounterProps = {
  value: number;
  variant?: "mercury" | "cart" | "single" | "venus";
  onDecrement: ButtonEvent;
  onIncrement: ButtonEvent;
  className?: string;
  disabled?: boolean;
};

const Counter: React.FC<CounterProps> = ({
  value,
  variant = "mercury",
  onDecrement,
  onIncrement,
  className,
  disabled,
}) => {
  const size = variant === "single" ? "22" : "14";

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded overflow-hidden shrink-0 p-1",
        {
          "h-9 md:h-10 bg-primary shadow-counter rounded-3xl":
            variant === "mercury",
          "h-10 md:h-11 bg-[#f3f5f9] dark:bg-black": variant === "single",
          "inline-flex": variant === "cart",
          "bg-primary rounded-[4px] z-1 mt-[10px]": variant === "venus",
        },
        className
      )}
    >
      <button
        onClick={onDecrement}
        className={cn(
          "flex items-center justify-center shrink-0 h-full transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none",
          {
            "w-10 h-8 rounded-2xl text-heading hover:bg-[#e5eaf1]":
              variant === "mercury",
            "!w-8 !h-8 rounded-full transform scale-80 lg:scale-100 text-primary hover:bg-[#e5eaf1] ml-auto ":
              variant === "single",
            "!w-6 !h-6 pr-0 border border-border hover:bg-primary text-gray-700 hover:border-primary rounded-full hover:text-white":
              variant === "cart",
            "w-10 h-10 cursor-pointer rounded-tl-[4px] rounded-bl-[4px] transition-all bg-black/10 text-white":
              variant === "venus",
          }
        )}
      >
        <span className="sr-only">minus</span>
        <MinusIcon
          className={cn(variant === "single" ? "w-5 h-5" : "w-4 h-4")}
        />
      </button>
      <span
        className={cn(
          "font-semibold text-primary/90 flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default shrink-0",
          {
            "text-sm md:text-base w-6": variant === "mercury",
            "text-base md:text-[17px] w-12 md:w-20 xl:w-24 ":
              variant === "single",
            "text-15px w-9": variant === "cart",
            "self-center text-sm sm:text-base text-white font-semibold":
              variant === "venus",
          }
        )}
      >
        {value}
      </span>
      <button
        onClick={onIncrement}
        disabled={disabled}
        className={cn(
          "group flex items-center justify-center h-full shrink-0 transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none pr-2",
          {
            "w-10 h-8 rounded-2xl text-heading hover:bg-[#e5eaf1] !pr-0":
              variant === "mercury",
            "!w-8 !h-8 rounded-full scale-80 lg:scale-100 text-2xl hover:bg-[#e5eaf1]  ml-auto !pr-0 justify-center":
              variant === "single",
            "!w-6 !h-6 border text-brand-muted border-border hover:bg-primary hover:border-primary rounded-full hover:text-white !pr-0":
              variant === "cart",
            "w-10 h-10 cursor-pointer rounded-tl-[4px] rounded-bl-[4px] transition-all bg-black/10 text-white !pr-0":
              variant === "venus",
          }
        )}
        title={disabled ? "Out Of Stock" : ""}
      >
        <span className="sr-only">plus</span>
        <PlusIcon
          className={cn(variant === "single" ? "w-5 h-5 dark:hover:text-gray-900" : "w-4 h-4")}
          opacity="1"
        />
      </button>
    </div>
  );
};

export default Counter;
