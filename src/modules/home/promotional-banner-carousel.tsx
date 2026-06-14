"use client";
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
    <div className="w-full py-2">
      <div ref={sliderRef} className="keen-slider">
        {PromotionalSlider?.map((item: PromotionalSliderType) => (
          <Link
            key={item.id}
            href={item.link}
            className={`keen-slider__slide group relative min-w-0 rounded-2xl border ${item.borderColor} bg-gradient-to-br ${item.bgGradient} p-4 md:p-5 shadow-sm hover:shadow-md h-[160px] md:h-[180px] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1`}
          >
            {/* Content Section */}
            <div className="z-20 flex flex-col justify-between h-full max-w-[65%] pr-2">
              <div>
                {item.badge && (
                  <span className={`inline-block px-2.5 py-0.5 text-[9px] md:text-[10px] font-bold tracking-wider uppercase rounded-full ${item.badgeBg} w-fit mb-2`}>
                    {item.badge}
                  </span>
                )}
                <h3 className={`text-sm md:text-base font-bold ${item.textColor} mb-1 line-clamp-1`}>
                  {item.title}
                </h3>
                <p className={`text-xs ${item.descColor} line-clamp-2 leading-relaxed`}>
                  {item.description}
                </p>
              </div>

              <div className={`flex gap-1.5 items-center text-xs md:text-sm font-bold ${item.accentColor} mt-2`}>
                <span>Shop Now</span>
                <ChevronRightIcon className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>

            {/* Image Section */}
            <div className="absolute right-2 bottom-2 w-28 md:w-32 h-28 md:h-32 z-10 flex items-end justify-end pointer-events-none">
              <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain object-right-bottom drop-shadow-md"
                  sizes="(max-width: 640px) 112px, 128px"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PromotionalBannerCarousel;
