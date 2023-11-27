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
import { Textarea } from "@/components/ui/textarea";
import { useCreateQuestion } from "@/hooks/api/question/createQuestion";
import { useGlobalModalStateStore } from "@/store/modal";
import { CreateQuestionInput } from "@/types";
import { QuestionSchema } from "@/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const QuestionForm = () => {
  const { createQuestion, isLoading } = useCreateQuestion();
  const { postQuestionState, setPostQuestionState } = useGlobalModalStateStore(
    (state) => state
  );
  const questionForm = useForm<CreateQuestionInput>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      question: "",
      product: "",
      shop: "",
    },
  });

  const onSubmit = (values: Pick<CreateQuestionInput, "question">) => {
    createQuestion({
      product: postQuestionState?._id as string,
      shop: postQuestionState?.shop._id as string,
      question: values.question,
    });
  };
  return (
    <Form {...questionForm}>
      <form
        className="grid gap-4 py-6"
        onSubmit={(...args) => void questionForm.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={questionForm.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Question *</FormLabel>
              <FormControl>
                <Textarea placeholder="Your Question" {...field} />
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
            onClick={() => setPostQuestionState(false, null)}
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
  );
};

export default QuestionForm;
