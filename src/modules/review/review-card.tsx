import StarIcon from "@/components/ui/star-icon";
import { IReview } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
type ReviewCardProps = {
  review: IReview;
};
const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="flex flex-col  items-center sm:flex-row sm:items-center gap-4 py-3 px-3 sm:px-6  w-full bg-gray-100 rounded-lg dark:bg-gray-800 ">
      <div className="max-w-[80px] w-full rounded-full">
        <Image
          src={review.user.avatar}
          alt={review.user.firstName}
          width={80}
          height={80}
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col space-y-3 w-full">
        <div className="flex w-full justify-between items-center ">
          <div className="flex items-center ">
            <h6 className="text-primary text-xs sm:text-sm md:text-base">
              {review.user.firstName} {review?.user.lastName}
            </h6>
            <p className="text-xs mt-1 hidden xs:block ml-3 text-gray-600">
              {dayjs(review.createdAt).format("D MMMM, YYYY h:mm A")}
            </p>
          </div>
          <div className="flex -mx-0.5 ">
            {[...Array(5)].map((_, idx) => (
              <StarIcon
                key={idx}
                color={idx < review.rating ? "#F3B81F" : "#DFE6ED"}
                className="w-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 h-2.5 lg:h-4 mx-0.5"
              />
            ))}
          </div>
        </div>
        <p>{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
