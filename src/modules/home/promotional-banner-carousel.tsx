/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import {
  PromotionalSlider,
  PromotionalSliderType,
} from "@/data/promotional-slider";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PromotionalBannerCarousel = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      breakpoints: {
        "(min-width: 240px)": {
          slides: { perView: 1, spacing: 24 },
        },
        "(min-width: 640px)": {
          slides: { perView: 2, spacing: 24 },
        },

        "(min-width: 768px)": {
          slides: { perView: 3, spacing: 32 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 4, spacing: 32 },
        },
      },
      slides: { perView: 1.4 },
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 4000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  return (
    <div>
      <div ref={sliderRef} className="keen-slider">
        {
          <>
            {PromotionalSlider?.map((item: PromotionalSliderType, idx) => (
            
                <div
                  key={item.id}
                  className="keen-slider__slide relative w-[300px] cursor-pointer items-center rounded border border-gray-200 bg-slate-200 hover:bg-slate-400 p-5 shadow-md space-x-4  h-[180px]  overflow-hidden flex flex-col justify-center   "
                >
                  <div className="w-[40%]"></div>
                  <div className="absolute left-3 top-[1/2] flex flex-col flex-1  w-[80]  z-20">
                    <h3 className="text-slate-700  transition duration-300">{item.title}</h3>
                    <h6 className="text-xl text-gray-800 font-semibold">{item.description}</h6>

                   <Button
                   size={"sm"}
                    variant={"link"}
                    className="self-start -ml-3"
                   >
                    <Link
                     href={item.link}
                     className="flex gap-1 items-center"
                    >
                   Shop Now
                    <ChevronRightIcon className="w-4 h-4 "/> 
                   
                    </Link>
                    </Button>

                  </div>
                 
                 <div className="max-w-[200px] w-full self-end flex items-end">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={200}
                      className="object-fill object-right-bottom "
                    />
                    </div>
            
                </div>
            
            ))}
          </>
        }
      </div>
    </div>
  );
};

export default PromotionalBannerCarousel;
