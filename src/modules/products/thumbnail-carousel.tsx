import { cn } from "@/lib/utils";
import { ImageInfo } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";

interface Props {
  gallery: ImageInfo[];
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
  thumbnailClassName = "max-w-[400px] w-full",
  galleryClassName = " w-full ",
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  
  return (
    <div className="w-full flex flex-col">
      <div
        className={cn(
          "w-full mb-2.5 md:mb-3 border border-border rounded-md relative mx-auto",
          thumbnailClassName
        )}
      >
        <Swiper
          id="productGallery"
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
   
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Navigation, Thumbs,Autoplay]}
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
              className="flex items-center justify-center max-w-[400px] w-full "
            >
              <Image
                src={item?.img_url as string}
                alt={`Product gallery ${item.img_id}`}
                width={450}
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

      <div className={`shrink-0 ${galleryClassName} w-full mt-5`}>
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={5}
          watchSlidesProgress={true}
          freeMode={true}
          observer={true}
          observeParents={true}
          breakpoints={galleryCarouselBreakpoints}
        >
          {gallery?.map((item: ImageInfo) => (
            <SwiperSlide
              key={`product-thumb-gallery-${item.img_id}`}
              className="flex items-center justify-center  transition border rounded cursor-pointer border-border hover:opacity-75 min-w-[50px] max-w-[200px] w-full px-2 "
            >
              <Image
                src={item?.img_url as string}
                className="w-12 h-12 bg-black"
                alt={`Product thumb gallery ${item.img_id}`}
                width={150}
                height={150}
             
                // style={{ width: "auto" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
