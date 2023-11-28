import { cn } from "@/lib/utils";
import { Icons } from "./icons";

type RatingProgressProps = {
  ratingId?: number;
  ratingProgressItem: any;
  totalReviews: number;
  colorClassName?: string;
};

export default function RatingProgressBar({
  ratingId = 0,
  ratingProgressItem,
  totalReviews,
  colorClassName = 'bg-primary',
}: RatingProgressProps) {
  return (
    <div className="flex items-center text-sm w-full ">
      <div className="flex w-11 shrink-0 items-center space-x-1 font-semibold space-x-reverse">
        <span className="text-base font-semibold ">{ratingId}</span>{' '}
        <Icons.starIcon className="h-4 w-4 ml-2 " />
      </div>
      <div className="relative h-[9px] w-full overflow-hidden rounded-md bg-[#F1F1F1]">
        <div
          className={cn('absolute h-full  rounded-md ', colorClassName)}
          style={{
            width: `${(ratingProgressItem?.total / totalReviews) * 100}%`,
          }}
        />
      </div>
      <div className="shrink-0 ml-2 pr-5">
        {ratingProgressItem?.total ?? 0}
      </div>
    </div>
  );
}
