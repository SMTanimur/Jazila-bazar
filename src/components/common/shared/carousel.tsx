"use client";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation} from "swiper/modules"
import { SwiperOptions } from "swiper/types";
// export {
//   A11y,
//   Autoplay,
//   EffectFade,
//   FreeMode,
//   Grid,
//   Navigation,
//   Pagination,
//   Scrollbar,
//   Thumbs,
// } from "swiper/modules";




interface CarouselProps extends SwiperOptions {
  items: any[];
  children: (item: { [key: string]: any }) => React.ReactNode;
  className?: string;
}

/**
 * Common carousel
 * @param items any[]
 * @param children (item: { [key: string]: any }) => React.ReactNode
 * @param className string
 * @param rest SwiperOptions
 * @returns
 */

const Carousel = ({ items, children, className, ...rest }: CarouselProps) => {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    700: {
      slidesPerView: 3,
    },

    900: {
      slidesPerView: 4,
    },

    1100: {
      slidesPerView: 5,
    },

    1280: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 7,
      spaceBetween: 30,
    },
    1700: {
      slidesPerView: 8,
      spaceBetween: 30,
    },
    2600: {
      slidesPerView: 10,
      spaceBetween: 40,
    },
  };

  return (
    <div className={cn("relative", className)}>
      <Swiper
        id="author-card-menu"
        className="!px-3"
        modules={[Navigation]}
        navigation={{
          prevEl,
          nextEl,
          // prevEl: prevRef.current!, // Assert non-null
          // nextEl: nextRef.current!, // Assert non-null
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
        }}
        // navigation={true}
        breakpoints={breakpoints}
        // slidesPerView="auto"
        // spaceBetween={40}
        {...rest}
      >
        {items?.map((item: any, idx: number) => (
          <SwiperSlide key={idx} className="carousel-slide py-2">
            {children(item)}
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        ref={(node) => setPrevEl(node)}
        // ref={prevRef}
        className="author-slider-prev w-8 h-8 flex items-center justify-center text-heading bg-white shadow-300 outline-none rounded-full absolute top-1/2 -mt-4 z-[5] cursor-pointer  -right-3  lg:-right-4 focus:outline-none transition-colors hover:text-orange-500"
      >
        <span className="sr-only">prev</span>
        <ChevronLeftIcon className="w-5" />
      </div>
      <div
        ref={(node) => setNextEl(node)}
        // ref={nextRef}
        className="author-slider-next w-8 h-8 flex items-center justify-center text-heading bg-white shadow-300 outline-none rounded-full absolute top-1/2 -mt-4 z-[5] cursor-pointer  -left-3  lg:-left-4 focus:outline-none transition-colors hover:text-orange-500"
      >
        <span className="sr-only">next</span>
        <ChevronRightIcon className="w-5" />
      </div>
    </div>
  );
};

export default Carousel;
