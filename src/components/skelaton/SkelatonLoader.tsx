"use client"
/* eslint-disable react/display-name */
import { FC, memo } from "react";
import { Skeleton } from "../ui/skeleton";

interface SkelatonLoaderProps {
  className?: string;
  isCategorySliderLoader?: boolean;
}

 const SkelatonLoader: FC<SkelatonLoaderProps> = memo(
  ({ className, isCategorySliderLoader = true }) => {
    const classNames = isCategorySliderLoader
      ? `flex flex-row items-center gap-[15px] overflow-hidden `
      : `flex flex-row flex-wrap items-center xs:gap-4 gap-[14px] justify-center ${className}`;

     
      let arrSize= 10;

      if (typeof window !== "undefined") {
         if(isCategorySliderLoader){
          arrSize = Math.floor( window.innerWidth / 170) + 1
         }else{
          arrSize = 10
         }
      }
   

    return (
      <div className={classNames}>
        {Array.from({ length: arrSize }).map((_item, index) => {
          return (
            <div
              key={index}
              className={`${!isCategorySliderLoader ? "mb-6" : ""}`}
            >
              <Skeleton className="w-[170px] h-[216px]"  />
              <div className="text-center">
                <Skeleton className="xs:mt-4 mt-3 w-[80%] " />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default SkelatonLoader;