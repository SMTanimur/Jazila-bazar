import { ICategory } from "@/types";
import {
  CategoriesQueryOptionsType,
  QueryParamsType,
} from "@/types/custom.types";

import { PaginatorInfo } from "@/types/utils";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { HttpClient } from "@/utils/api/http";

export const categoryClient = {
  getCategories: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;

    const {
      page,
      text,
      limit = 15,
      type,
      orderBy = "updatedAt",
      sortedBy = "desc",
    } = params as CategoriesQueryOptionsType;

    const url = `${API_ENDPOINTS.CATEGORIES}?${text ? `&search=${text}` : ""}${
      type ? `type=${type}&` : ""
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<ICategory>>(url);
  },

  getAllCategories: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;

    const {
      page,
      text,
      limit = 15,
      type,
      orderBy = "updatedAt",
      sortedBy = "desc",
    } = params as CategoriesQueryOptionsType;

    const url = `${API_ENDPOINTS.CATEGORIES}/all?${
      text ? `&search=${text}` : ""
    }${
      type ? `type=${type}&` : ""
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<ICategory>>(url);
  },

  getCategory: async (slug: string) => {
    return HttpClient.get<ICategory>(`${API_ENDPOINTS.CATEGORIES}/${slug}`);
  },
};
