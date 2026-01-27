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
    <div className="w-full">
      <div ref={sliderRef} className="keen-slider">
        {PromotionalSlider?.map((item: PromotionalSliderType) => (
          <div
            key={item.id}
            className="keen-slider__slide relative min-w-0 cursor-pointer rounded-lg border border-gray-200 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-700 dark:hover:to-slate-800 p-4 md:p-5 shadow-md h-[160px] md:h-[180px] overflow-hidden flex items-center transition-all duration-300"
          >
            {/* Content Section */}
            <div className="flex-1 z-20 pr-2 md:pr-4 min-w-0">
              <h3 className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-100 mb-1 line-clamp-1">
                {item.title}
              </h3>
              <h6 className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2 md:mb-3 line-clamp-2">
                {item.description}
              </h6>
              <Button
                size="sm"
                variant="link"
                className="p-0 h-auto self-start -ml-1 md:-ml-2"
              >
                <Link
                  href={item.link}
                  className="flex gap-1 items-center text-xs md:text-sm font-medium text-primary hover:text-primary/80"
                >
                  Shop Now
                  <ChevronRightIcon className="w-3 h-3 md:w-4 md:h-4" />
                </Link>
              </Button>
            </div>

            {/* Image Section */}
            <div className="flex-shrink-0 w-24 md:w-32 lg:w-40 h-full flex items-end justify-end">
              <div className="relative w-full h-full max-h-[140px] md:max-h-[160px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain object-right-bottom"
                  sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionalBannerCarousel;
