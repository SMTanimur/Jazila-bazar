import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import RateInput from "@/components/ui/rate-input";
import { Textarea } from "@/components/ui/textarea";
import { useGlobalModalStateStore } from "@/store/modal";
import { CreateReviewInput } from "@/types";
import { ReviewSchema } from "@/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useCreateReview,
  useUpdateReview,
} from "../../hooks/api/review/review";

const ReviewForm = () => {
  const { reviewModalState, setReviewModalState } = useGlobalModalStateStore(
    (state) => state
  );
  const { createReview, isLoading: creating } = useCreateReview();
  const { updateReview, isLoading } = useUpdateReview();

  const reviewForm = useForm<CreateReviewInput>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      comment: "",
      product: "",
      shop: "",
    },
  });
  const onSubmit = (values: Omit<CreateReviewInput, "product" | "shop">) => {
    // @ts-ignore
    createReview({
      ...values,
      product: reviewModalState?._id as any,
      shop: reviewModalState?.shop._id as any,
    });
  };
  return (
    <div>
      <Form {...reviewForm}>
        <form
          className="grid gap-4 py-6"
          onSubmit={(...args) =>
            void reviewForm.handleSubmit(onSubmit)(...args)
          }
        >
          <div className="">
            <FormItem className="flex flex-col w-full ">
              <FormLabel >Rating</FormLabel>
              <FormControl>
                <RateInput
                
                  control={reviewForm.control}
                  name="rating"
                  defaultValue={0}
                  style={{ fontSize: 30 }}
                  allowClear={false}
                />
              </FormControl>
            </FormItem>
          </div>
          <FormField
            control={reviewForm.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Review *</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your Review" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3">
            <Button
              disabled={isLoading}
              variant={"outline"}
              className="border border-primary px-6 rounded-lg"
              onClick={() => setReviewModalState(false, null)}
            >
              Cencel
            </Button>
            <Button disabled={isLoading} className=" px-6 rounded-lg">
              {isLoading && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Submit
              <span className="sr-only">Submit</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ReviewForm;
