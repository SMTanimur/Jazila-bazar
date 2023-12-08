import { CreateQuestionInput, IProduct, IQuestion } from "@/types";
import {
  ProductsQueryOptionsType,
  QueryParamsType,
  QuestionsQueryOptionsType,
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
      price,
      status,
      limit = 15,
      orderBy = "updatedAt",
      sortedBy = "desc",
    } = params as ProductsQueryOptionsType;
    
    const url = `${API_ENDPOINTS.PRODUCTS}?${text ? `search=${text}` : ""}${
      type ? `&type=${type}` : ""
    }${price ? `&price=${price}` : ""}${
      category ? `&category=${category}` : ""
    }${shop_id ? `shop=${shop_id}` : ""}${
      status ? `&status=${status}` : ""
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<IProduct>>(url);
  },

  getTopRatedProducts: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;
    const {
      page,
      text,
      type,
      category,
      shop_id,
      price,
      status,
      limit = 15,
      orderBy = "updatedAt",
      sortedBy = "desc",
    } = params as ProductsQueryOptionsType;
    
    const url = `${API_ENDPOINTS.PRODUCTS}/top/rated?${text ? `search=${text}` : ""}${
      type ? `&type=${type}` : ""
    }${price ? `&price=${price}` : ""}${
      category ? `&category=${category}` : ""
    }${shop_id ? `shop=${shop_id}` : ""}${
      status ? `&status=${status}` : ""
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<IProduct>>(url);
  },
  getProduct: async (slug: string) => {
    return HttpClient.get<IProduct>(`/products/${slug}`);
  },

  createQuestion: async (data: CreateQuestionInput) => {
    return HttpClient.post<{ message: string }>("/questions", data);
  },

  getQuestions: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;

    const {
      page,
      limit = 15,
      shop_id,
      orderBy = "updatedAt",
      sortedBy = "desc",
      user,
      product,
    } = params as QuestionsQueryOptionsType;

    const url = `/questions?${
      shop_id ? `shop=${shop_id}` : ""
    }&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}${
      user ? `&user=${user}` : ""
    }${product ? `&product=${product}` : ""}`;
    return HttpClient.get<PaginatorInfo<IQuestion>>(url);
  },
};
