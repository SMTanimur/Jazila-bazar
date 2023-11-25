import { cn } from "@/lib/utils";
import { IQuestion } from "@/types";
import dayjs from "dayjs";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
type Props = {
  question: IQuestion;
};
const QuestionCard = ({ question }: Props) => {
  return (
    <div className="border-t border-border border-opacity-70 py-7 first:border-t-0">
      <p className="mb-2.5 text-base font-semibold  flex items-center gap-2">
        <span className="inline-block uppercase  ml-1 bg-gray-100 border py-1 px-3">
          Q
        </span>
        {question?.question}
      </p>
      {question?.answer && (
        <p className="text-base flex items-center gap-2">
          <span className="inline-block font-semibold uppercase bg-primary text-white py-1 px-3 ml-1">
            A
          </span>
          <span className="text-gray-600">{question?.answer}</span>
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="mt-5 text-xs text-gray-400">
          Date: {dayjs(question?.createdAt).format("D MMMM, YYYY")}
        </div>

        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <button
            className="flex items-center text-xs tracking-wider text-gray-400 transition"
            // disabled={my_feedback?.positive}
            // onClick={() => feedback({ positive: true })}
          >
            <ThumbsUpIcon className={cn("h-4 w-4 mr-1.5 ")} />
            {question?.positive_feedbacks_count}
          </button>
          <button
            className="flex items-center text-xs tracking-wider text-gray-400 transition"
            // onClick={() => feedback({ negative: true })}
            // disabled={my_feedback?.negative}
          >
            <ThumbsDownIcon className={cn("h-4 w-4 mr-1.5 ")} />
            {question?.negative_feedbacks_count}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
