import { z } from "zod";

export const QuestionSchema = z.object({
  question: z
    .string({
      required_error: "Question is required",
      invalid_type_error: "Question must be a valid string",
    })
    .min(5, { message: "Question is must be 5 or more characters long" }),
});

export const ReviewSchema = z.object({
  comment: z
    .string({
      required_error: "Review is required",
      invalid_type_error: "Review must be a valid string",
    })
    .min(3, { message: "Review is must be 3 or more characters long" }),
  rating: z
    .number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a valid number",
    })
    .min(1, { message: "Rating must be 1 or more" })
    .max(5, { message: "Rating must be 5 or less" }),
});

