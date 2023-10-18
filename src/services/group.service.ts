import { IType } from "@/types";
import { QueryParamsType, TypesQueryOptionsType } from "@/types/custom.types";

import { PaginatorInfo } from "@/types/utils";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { HttpClient } from "@/utils/api/http";

export const groupClient = {

  getAllGroups: async () => {
    return HttpClient.get<IType[]>(`${API_ENDPOINTS.TYPES}/all`);
  },
 

  getGroup: async (slug: string) => {
    return HttpClient.get<IType>(`${API_ENDPOINTS.TYPES}/${slug}`);
  },
};
