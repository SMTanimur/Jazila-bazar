/* eslint-disable @next/next/no-img-element */
"use client";
import Carousel from "@/components/common/shared/carousel";
import { SwiperSlide } from "@/components/ui/slider";
import {
  PromotionalSlider,
  PromotionalSliderType,
} from "@/data/promotional-slider";
import Image from "next/image";


const PromotionalBannerCarousel = () => {
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
      slidesPerView: 1,
    },

    1280: {
      slidesPerView: 1,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    1700: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    2600: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  };
  return (
    <div>
      <Carousel
        breakpoints={breakpoints}
        className="-mx-1.5 md:-mx-2 xl:-mx-2.5 -mt-4"
        autoplay={true}
        prevButtonClassName="-left-4 3xl:top-auto hidden"
        nextButtonClassName="-right-4 hidden"
      >
        {
          <>
            {PromotionalSlider?.map((item: PromotionalSliderType, idx) => (
              <SwiperSlide
                key={item.id}
                className="px-1.5 md:px-2 xl:px-2.5 py-4"
              >
                <div
                  key={item.id}
                  className="relative  cursor-pointer items-center rounded border border-gray-200 bg-white hover:bg-slate-200 p-5 shadow-md space-y-4 h-[200px] overflow-hidden flex "
                >
                  <img
                    src={item.image}
                    alt={item.title}
                   
                    className=" object-fill"
                  />
                </div>
              </SwiperSlide>
            ))}

            {/* {width! > 1024 && width! < 1921 && <SwiperSlide />} */}
          </>
        }
      </Carousel>
    </div>
  );
};

export default PromotionalBannerCarousel;
