import { useGlobalModalStateStore } from "@/store/modal";
import { IProduct } from "@/types";


const PostQuestionModal = () => {
    const {postQuestionState} =useGlobalModalStateStore((state)=>state)
  return (
    <div className="p-6 flex flex-col">
        
        <div className="flex items-center bg-gray-100 p-3">
            <h1>{postQuestionState?.name}</h1>
         
        </div>
     
    </div>
  );
};

export default PostQuestionModal;
