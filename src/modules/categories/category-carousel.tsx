/* eslint-disable @next/next/no-img-element */
"use client";
// import {
//   Navigation,
//   Swiper,
//   SwiperSlide,
// } from "@/components/common/shared/slider";
import { useGetCategoriesQuery } from "@/hooks/api/category/useGetCategoriesQuery";
import { ICategory } from "@/types";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const CategoriesCarousel = () => {
  const { data, isLoading } = useGetCategoriesQuery({ limit: 15 });

  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={20}
      // modules={[Autoplay]}
      // autoplay={{ delay: 5000, disableOnInteraction: false }}

      loop={true}
      className="mySwiper"
    >
      {data?.docs.map((d: ICategory) => {
        return (
          <SwiperSlide
            key={d.slug}
            className="flex flex-col xs:gap-[14px] gap-2 max-w-[170px]  rounded-lg"
          >
            <div className=" dark:bg-[#1f1f1f] bg-[#f5f5f5] rounded-lg relative group w-[170px] select-none xs:h-[250px] h-[216px] overflow-hidden px-5 cursor-pointer hover:bg-primary/10 transition duration-300">
              <div className="flex flex-col gap-3 mt-4">
                <h5 className="text-xl text-gray-800 font-semibold ">
                  {d.name}
                </h5>
                <p className="text-stone-600">{d.products_count} Items</p>
              </div>

              <div className="">
                <img
                  className=" w-[130px] h-[100px] object-center hover:scale-110 hover:transition-all duration-500"
                  src={d.image?.img_url}
                  alt={d.name}
                />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CategoriesCarousel;
