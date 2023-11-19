/* eslint-disable @next/next/no-img-element */

"use client";

import ClientOnly from "@/components/common/shared/ClientOnly";
import SkelatonLoader from "@/components/skelaton/SkelatonLoader";
import { Error } from "@/components/ui/error-message";
import { useGetCategoriesQuery } from "@/hooks/api/category/useGetCategoriesQuery";
import { ICategory } from "@/types";
import { getErrorMessage } from "@/utils/helper";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "./CategoryCard";

const CategoriesCarousel = () => {
  const { data, isLoading,isError,error } = useGetCategoriesQuery({ limit: 15 });
  const errorMessage = useMemo(
    () => (isError ? getErrorMessage(error) : ""),
    [error, isError]
  );

  return (
    <React.Fragment>
    {isLoading ? (
      <ClientOnly>
          <SkelatonLoader />
          </ClientOnly>
        ) : isError ? (
          <Error
            message={String(errorMessage)}
          />
        ) : (
          <Swiper
      slidesPerView="auto"
      spaceBetween={11}
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
            <CategoryCard category={d}/>
          </SwiperSlide>
        );
      })}
    </Swiper>
        )

      }
      
    </React.Fragment>
    
  );
};

export default CategoriesCarousel;
