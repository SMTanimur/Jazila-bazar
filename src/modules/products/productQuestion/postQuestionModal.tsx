import usePrice from "@/hooks/use-price";
import QuestionForm from "@/modules/questions/question-form";
import { useGlobalModalStateStore } from "@/store/modal";
import Image from "next/image";

const PostQuestionModal = () => {
  const { postQuestionState } = useGlobalModalStateStore((state) => state);
  const { price } = usePrice({
    amount: postQuestionState?.price as number,
    currencyCode: "USD",
  });
  return (
    <div className="p-6 flex flex-col">
      <div className="flex items-center space-x-4 bg-gray-100 p-3">
        <div className="max-w-[90px] w-full grid place-items-center bg-white">
          <Image
            src={postQuestionState?.image.img_url as string}
            alt={postQuestionState?.name as string}
            height={70}
            width={70}
            objectFit="contain"
          />
        </div>
        <div>
          <h1 className="text-lg text-gray-800 font-semibold">{postQuestionState?.name}</h1>
          <h1 className="text-sm text-gray-500 dark:text-gray-700">{price}</h1>
        </div>
    
      </div>
      <QuestionForm/>
    </div>
  );
};

export default PostQuestionModal;
