/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Navigation,
  Swiper,
  SwiperSlide,
} from "@/components/common/shared/slider";
import { useGetCategoriesQuery } from "@/hooks/api/category/useGetCategoriesQuery";
import { ICategory } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const offerSliderBreakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1024: {
    slidesPerView: 6,
    spaceBetween: 16,
  },
  1920: {
    slidesPerView: 8,
    spaceBetween: 24,
  },
};
const CategoriesCarousel = () => {
  const { data, isLoading } = useGetCategoriesQuery({ limit: 15 });

  return (
    <div className="border-t border-border-200 p-4 ">
      <div className="relative">
        <Swiper
          id="offer"
          //TODO: need discussion
          // loop={true}
          breakpoints={offerSliderBreakpoints}
          modules={[Navigation]}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
        >
          {data?.docs.map((d: ICategory) => (
            <SwiperSlide key={d.slug}>
              <div className=" w-[260px] sm:w-[220px] h-[250px] bg-gray-100 px-10 justify-center py-4 hover:bg-primary/10 hover:transition duration-300 cursor-pointer">
                <div className="flex flex-col gap-3 mt-4">
                  <h5>{d.name}</h5>
                  <p>{d.products_count} Items</p>
                </div>
                <div className=" flex items-center relative w-full">
                  <div className="absolute top-10 left-6 sm:left-0  ">
                    <img
                      className=" w-[130px] h-[100px] object-center"
                      src={d.image?.img_url}
                      alt={d.name}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="prev absolute top-2/4 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border border-opacity-70 bg-white  shadow-xl transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white -left-4  md:-mt-5 md:h-9 md:w-9 md:-left-5 "
          role="button"
        >
          <span className="sr-only">prev</span>
          <ChevronRightIcon width={18} height={18} />
        </div>
        <div
          className="next absolute top-2/4 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border border-opacity-70 bg-white text-heading shadow-xl transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white -right-4  md:-mt-5 md:h-9 md:w-9 md:-right-5"
          role="button"
        >
          <span className="sr-only">next</span>
          <ChevronLeftIcon className="w-4" />
        </div>
      </div>
    </div>
  );
};

export default CategoriesCarousel;
