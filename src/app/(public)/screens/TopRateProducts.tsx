"use client"
import ProductCard from '@/components/cards/ProductCard';
import ProductFeedLoader from '@/components/skelaton/product-feed-loader';
import { Error } from '@/components/ui/error-message';
import { useGetTopRateProductsQuery } from '@/hooks/api/product/useGetProducts';
import { IProduct } from '@/types';
import { getErrorMessage } from '@/utils/helper';
import React, { useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
const breakpoints = {
  '1921': {
    slidesPerView: 7,
  },
  '1780': {
    slidesPerView: 6,
  },
  '1536': {
    slidesPerView: 5,
  },
  '1280': {
    slidesPerView: 4,
  },
  '724': {
    slidesPerView: 3,
  },
  '470': {
    slidesPerView: 2,
  },
  '360': {
    slidesPerView: 1,
  },
  '0': {
    slidesPerView: 1,
  },
};
const TopRateProducts = () => {
  const {data,isLoading,isError,error} = useGetTopRateProductsQuery({ limit: 15 });
  const products = data?.docs
  const errorMessage = useMemo(
    () => (isError ? getErrorMessage(error) : ""),
    [error, isError]
  );
  return (
    <section className="py-5 md:py-10  container">
     <div className="flex items-center my-4 ">
        <h1 className="text-3xl font-bold font-sans ">Top Rated Products</h1>
      </div>
      <div className="py-4  border-t-2 mt-3" />

      {isLoading ? (
        <div className=' flex  flex-col md:flex-row gap-6 items-center'>
          <ProductFeedLoader limit={6} uniqueKey="search-product" />
          </div>
        ) : isError ? (
          <Error
            message={String(errorMessage)}
          />
        ) : (
          <Swiper
          breakpoints={ breakpoints}
      slidesPerView="auto"
      spaceBetween={20}
      
      // modules={[Autoplay]}
      // autoplay={{ delay: 5000, disableOnInteraction: false }}

      loop={true}
      className="mySwiper"
    >
      {products?.map((product: IProduct) => {
        return (
          <SwiperSlide
            key={product.slug}
            className="flex  flex-col xs:gap-[14px] gap-2 min-w-[190px] max-w-[400px]  rounded-lg"
          >
            <ProductCard  {...{ product }} />
          </SwiperSlide>
        );
      })}
    </Swiper>
        )

      }
    </section>
  )
}

export default TopRateProducts