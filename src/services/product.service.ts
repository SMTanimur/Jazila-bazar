import { CreateQuestionInput, IProduct } from "@/types";
import {
  ProductsQueryOptionsType,
  QueryParamsType,
} from "@/types/custom.types";
import { PaginatorInfo } from "@/types/utils";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { HttpClient } from "@/utils/api/http";

export const productClient = {
  getProducts: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;
    const {
      page,
      text,
      type,
      category,
      shop_id,
      status,
      limit = 15,
      orderBy = "updatedAt",
      sortedBy = "desc",
    } = params as ProductsQueryOptionsType;
    const url = `${API_ENDPOINTS.PRODUCTS}?${text ? `search=${text}` : ""}${
      type ? `&type=${type}` : ""
    }${category ? `&category=${category}` : ""}${
      shop_id ? `shop=${shop_id}` : ""
    }${
      status ? `&status=${status}` : ""
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<IProduct>>(url);
  },
  getProduct: async (slug: string) => {
    return HttpClient.get<IProduct>(`/products/${slug}`);
  },

  createQuestion: async (data: CreateQuestionInput) => {
    console.log(data,"data")
    return HttpClient.post<{ message: string }>("/questions", data);
  },

  
};
