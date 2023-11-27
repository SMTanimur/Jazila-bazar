import StarIcon from "@/components/ui/star-icon";
import { IReview } from "@/types";
import Image from "next/image";
import dayjs from "dayjs";
type ReviewCardProps = {
  review: IReview;
};
const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="flex items-center gap-4 py-3 px-6 w-full bg-gray-100 rounded-lg dark:bg-gray-800">
      <div className="max-w-[80px] w-full rounded-full">
        <Image
          src={review.user.avatar}
          alt={review.user.firstName}
          width={80}
          height={80}
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h6 className="text-primary">
              {review.user.firstName} {review?.user.lastName}
            </h6>
            <p className="text-xs ml-3 text-gray-600">{dayjs(review.createdAt).format("D MMMM, YYYY h:mm A")}</p>
          </div>
          <div className="flex -mx-0.5 mb-3.5">
            {[...Array(5)].map((_, idx) => (
              <StarIcon
                key={idx}
                color={idx < review.rating ? "#F3B81F" : "#DFE6ED"}
                className="w-3.5 lg:w-4 h-3.5 lg:h-4 mx-0.5"
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
