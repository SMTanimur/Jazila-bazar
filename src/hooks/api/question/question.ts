import { productClient } from "@/services/product.service";
import { IQuestion, PaginatorInfo } from "@/types";
import { QuestionsQueryOptionsType } from "@/types/custom.types";
import { useQuery } from "@tanstack/react-query";


export const useQuestionsQuery = (
    options: Partial<QuestionsQueryOptionsType>
  ) => {
    return useQuery<PaginatorInfo<IQuestion>, Error>(
      ["questions", options],
      productClient.getQuestions,
      {
        keepPreviousData: true,
      }
    );
  };