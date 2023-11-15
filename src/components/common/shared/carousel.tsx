"use client";

import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useRef } from "react";
import "swiper/css/autoplay";
import "swiper/css/grid";
import "swiper/css/pagination";
import {
  Autoplay,
  Grid,
  Navigation,
  Pagination,
  Swiper,
} from "../../ui/slider";

type CarouselPropsType = {
  className?: string;
  buttonGroupClassName?: string;
  prevActivateId?: string;
  nextActivateId?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  buttonSize?: "default" | "small";
  centeredSlides?: boolean;
  loop?: boolean;
  slidesPerColumn?: number;
  breakpoints?: {} | any;
  pagination?: {} | any;
  navigation?: {} | any;
  autoplay?: {} | any;
  grid?: {} | any;
};

export default function Carousel({
  children,
  className = "",
  buttonGroupClassName = "",
  prevActivateId = "",
  nextActivateId = "",
  prevButtonClassName = "-left-3.5 -right-3.5 lg:-right-4 xl:-right-5",
  nextButtonClassName = "-right-3.5 -left-3.5  lg:-left-4 xl:-left-5",
  buttonSize = "default",
  breakpoints,
  navigation = true,
  pagination = false,
  loop = false,
  grid,
  autoplay,
  ...props
}: React.PropsWithChildren<CarouselPropsType>) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  let nextButtonClasses = cn(
    "w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded-full bg-primary absolute transition duration-300 hover:bg-primary hover:text-white focus:outline-none transform shadow-navigation",
    { "3xl:text-2xl": buttonSize === "default" },
    nextButtonClassName
  );
  let prevButtonClasses = cn(
    "w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded-full bg-primary absolute transition duration-300 hover:bg-primary hover:text-white focus:outline-none transform shadow-navigation",
    { "3xl:text-2xl": buttonSize === "default" },
    prevButtonClassName
  );
  return (
    <div
      className={`carouselWrapper relative ${className} ${
        pagination ? "dotsCircle" : "dotsCircleNone"
      }`}
    >
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Grid]}
        autoplay={autoplay}
        breakpoints={breakpoints}
        pagination={pagination}
        grid={grid}
        navigation={
          navigation
            ? {
                prevEl: prevActivateId.length
                  ? `#${prevActivateId}`
                  : prevRef.current!, // Assert non-null
                nextEl: nextActivateId.length
                  ? `#${nextActivateId}`
                  : nextRef.current!, // Assert non-null
              }
            : {}
        }
        {...props}
      >
        {children}
      </Swiper>
      {Boolean(navigation) && (
        <div
          className={`flex items-center w-full absolute top-2/4 z-10 ${buttonGroupClassName}`}
        >
          {prevActivateId.length > 0 ? (
            <div className={prevButtonClasses} id={prevActivateId}>
              <ChevronLeftIcon className="w-5" />
            </div>
          ) : (
            <div ref={prevRef} className={prevButtonClasses}>
              <ChevronLeftIcon className="w-5" />
            </div>
          )}

          {nextActivateId.length > 0 ? (
            <div className={nextButtonClasses} id={nextActivateId}>
              <ChevronRightIcon className="w-5" />
            </div>
          ) : (
            <div ref={nextRef} className={nextButtonClasses}>
              <ChevronRightIcon className="w-5" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
