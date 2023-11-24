import { cn } from "@/lib/utils";
import { ImageInfo } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";

interface Props {
  gallery: ImageInfo[];
  isSingleProductPage: boolean;
  thumbnailClassName?: string;
  galleryClassName?: string;
}

// product gallery breakpoints
const galleryCarouselBreakpoints = {
  "0": {
    slidesPerView: 4,
  },
};

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ThumbnailCarousel: React.FC<Props> = ({
  gallery,
  isSingleProductPage =false,
  thumbnailClassName = "max-w-[400px] w-full",
  galleryClassName = " max-w-[120px] w-full ",
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  
  return (
    <div className="w-full flex flex-col">
      <div
        className={cn( thumbnailClassName, isSingleProductPage ? "max-w-[550px] w-full" : "max-w-[400px] w-full",
          "w-full mb-2.5 md:mb-3 border border-border rounded-md relative mx-auto",
          
        )}
      >
        <Swiper
          id="productGallery"
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
   
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Navigation, Thumbs,Autoplay,FreeMode]}
          loop={true}
          navigation={{
            prevEl: prevRef.current!, // Assert non-null
            nextEl: nextRef.current!, // Assert non-null
          }}
          {...swiperParams}
        >
          {gallery?.map((item: ImageInfo) => (
            <SwiperSlide
              key={`product-gallery-${item.img_id}`}
              className={cn("flex items-center justify-center",   isSingleProductPage ? "max-w-[550px] w-full" :"max-w-[400px] w-full")}
            >
              <Image
                src={item?.img_url as string}
                alt={`Product gallery ${item.img_id}`}
                width={500}
                height={400}
                className=" rounded-lg"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-between w-full absolute top-2/4 z-10 px-2.5 ">
          <div
            ref={prevRef}
            className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl bg-white dark:bg-black hover:bg-primary hover:text-white focus:outline-none shadow-navigation"
          >
            <ChevronLeftIcon className="w-4" />
          </div>
          <div
            ref={nextRef}
            className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl  hover:bg-primary dark:bg-black hover:text-white focus:outline-none shadow-navigation"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
      {/* End of product main slider */}

      <div className={cn(galleryClassName,isSingleProductPage ? "max-w-[500px] w-full": "max-w-[320px] w-full", "shrink-0  w-full mt-5")}>
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={20}
          watchSlidesProgress={true}
          freeMode={true}
          modules={[Navigation, Thumbs, FreeMode]}
          observer={true}
          observeParents={true}
          breakpoints={galleryCarouselBreakpoints}
        >
          {gallery?.map((item: ImageInfo) => (
            <SwiperSlide
              key={`product-thumb-gallery-${item.img_id}`}
              className={cn(isSingleProductPage ? "max-w-[200px] w-full" :"max-w-[100px] w-full","flex items-center justify-center  transition border rounded cursor-pointer border-border hover:opacity-75  px-2")}
            >
              <Image
                src={item?.img_url as string}
                className={cn(isSingleProductPage ? "max-w-[200px] w-full" :"max-w-[100px] w-full")}
                alt={`Product thumb gallery ${item.img_id}`}
                width={100}
                height={100}
             
                
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
