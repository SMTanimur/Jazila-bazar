import { IType } from "@/types";
import { QueryParamsType, TypesQueryOptionsType } from "@/types/custom.types";

import { PaginatorInfo } from "@/types/utils";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { HttpClient } from "@/utils/api/http";

export const groupClient = {
  getGroups: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;

    const {
      page,
      text,
      limit = 15,
      orderBy = "updatedAt",
      sortedBy = "desc",
    } = params as TypesQueryOptionsType;

    const url = `types?${
      text ? `&search=${text}` : ""
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<IType>>(url);
  },

  getAllGroups: async () => {
    return HttpClient.get<IType[]>(`${API_ENDPOINTS.TYPES}/all`);
  },
  deleteGroup: async (id: string) => {
    return HttpClient.delete<{ message: string }>(`types/${id}`);
  },

  getGroup: async (slug: string) => {
    return HttpClient.get<IType>(`${API_ENDPOINTS.TYPES}/${slug}`);
  },
};
