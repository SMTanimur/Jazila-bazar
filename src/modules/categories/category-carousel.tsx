"use client";
import {
  Navigation,
  Swiper,
  SwiperSlide,
} from "@/components/common/shared/slider";
import { useGetCategoriesQuery } from "@/hooks/api/category/useGetCategoriesQuery";
import { ICategory } from "@/types";
import { ChevronRightIcon, ChevronsLeftIcon } from "lucide-react";
import Image from "next/image";

const offerSliderBreakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1920: {
    slidesPerView: 4,
    spaceBetween: 24,
  },
};
const CategoriesCarousel = () => {
  const { data, isLoading } = useGetCategoriesQuery({ limit: 15 });

  return (
    <div className="border-t border-border-200  px-6 py-5 md:p-8">
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
              <div className="w-[250px] h-[300px] bg-gray-100 flex items-center relative">
                <div className="absolute bottom-9 left-1/2 -translate-x-1/2">
                  <Image
                    className="bg-transparent object-fill object-right-bottom w-full"
                    src={d.image?.img_url}
                    alt={d.name}
                    width={100}
                    height={100}
                  />
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
          <ChevronsLeftIcon className="w-4" />
        </div>
      </div>
    </div>
  );
};

export default CategoriesCarousel;
