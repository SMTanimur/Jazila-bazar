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
    
    const queryParams: string[] = [];
    
    if (text) {
      queryParams.push(`search=${encodeURIComponent(text)}`);
    }
    if (type) {
      queryParams.push(`type=${type}`);
    }
    if (price) {
      queryParams.push(`price=${price}`);
    }
    if (category) {
      queryParams.push(`category=${category}`);
    }
    if (shop_id) {
      queryParams.push(`shop=${shop_id}`);
    }
    if (status) {
      queryParams.push(`status=${status}`);
    }
    
    queryParams.push(`searchJoin=and`);
    queryParams.push(`limit=${limit}`);
    queryParams.push(`page=${page}`);
    queryParams.push(`orderBy=${orderBy}`);
    queryParams.push(`sortedBy=${sortedBy}`);
    
    const url = `${API_ENDPOINTS.PRODUCTS}?${queryParams.join('&')}`;
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
    
    const queryParams: string[] = [];
    
    if (text) {
      queryParams.push(`search=${encodeURIComponent(text)}`);
    }
    if (type) {
      queryParams.push(`type=${type}`);
    }
    if (price) {
      queryParams.push(`price=${price}`);
    }
    if (category) {
      queryParams.push(`category=${category}`);
    }
    if (shop_id) {
      queryParams.push(`shop=${shop_id}`);
    }
    if (status) {
      queryParams.push(`status=${status}`);
    }
    
    queryParams.push(`searchJoin=and`);
    queryParams.push(`limit=${limit}`);
    queryParams.push(`page=${page}`);
    queryParams.push(`orderBy=${orderBy}`);
    queryParams.push(`sortedBy=${sortedBy}`);
    
    const url = `${API_ENDPOINTS.PRODUCTS}/top/rated?${queryParams.join('&')}`;
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
