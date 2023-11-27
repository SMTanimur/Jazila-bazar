import { CreateReviewInput, IReview } from "@/types";
import { QueryParamsType, ReviewsQueryOptionsType } from "@/types/custom.types";

import { PaginatorInfo } from "@/types/utils";
import { HttpClient } from "@/utils/api/http";

export interface UpdateReview {
  variables: {
    id: string;
    input: CreateReviewInput;
  };
}
export const reviewClient = {
  getReviews: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;
    const {
      page,
      limit = 15,
      product,
      shop,
      user,
      orderBy = "updatedAt",
      sortedBy = "desc",
    } = params as ReviewsQueryOptionsType;

    const url = `/reviews?${product ? `product=${product}&` : ""}${
      shop ? `&shop=${shop}` : ""
    }${
      user ? `&user=${user}` : ""
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<IReview>>(url);
  },

  getReview: async (id: string) => {
    return HttpClient.get<IReview>(`/reviews/${id}`);
  },

  createReview: async (data: CreateReviewInput) => {
    return HttpClient.post<{ message: string }>("/reviews", data);
  },

  updateReview: async ({ variables: { input, id } }: UpdateReview) => {
    return HttpClient.put<{ message: string }>(`/reviews/${id}`, input);
  },
};
