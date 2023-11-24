import { z } from "zod";

export const QuestionSchema = z.object({
  question: z
    .string({
      required_error: "Question is required",
      invalid_type_error: "Question must be a valid string",
    })
    .min(5, { message: "Question is must be 5 or more characters long" }),
});
