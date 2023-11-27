import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { useGlobalModalStateStore } from "@/store/modal";
import Image from "next/image";
import React from "react";
import StarIcon from "../../components/ui/star-icon";
import ReviewForm from "./review-form";

const ReviewFormView = () => {
  const { reviewModalState } = useGlobalModalStateStore((state) => state);
  const rating = reviewModalState?.rating as number;
  return (
    <React.Fragment>
      <div className="p-4 ">
        <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg">
          <div className="max-w-[90px] w-full grid place-items-center bg-white">
            <Image
              src={reviewModalState?.image.img_url as string}
              alt={reviewModalState?.name as string}
              height={70}
              width={70}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg text-gray-800 font-semibold">
              {reviewModalState?.name}
            </h1>
            <div className="flex items-center gap-3">
              <p>Rating</p>
              <div className="flex -mx-0.5 ">
                {[...Array(5)].map((_, idx) => (
                  <StarIcon
                    key={idx}
                  
                    color={idx < rating ? '#F3B81F' : '#DFE6ED'}
                    className={cn(
                      "w-3.5 lg:w-4 h-3.5 lg:h-4 mx-0.5 "
                   
                    )}
                  />
                ))}
              </div>
              <p>({reviewModalState?.ratings})</p>
            </div>
          </div>
        </div>
        <ReviewForm/>
      </div>
    </React.Fragment>
  );
};

export default ReviewFormView;
