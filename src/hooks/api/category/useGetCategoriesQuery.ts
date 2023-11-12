import { categoryClient } from "@/services/category.service";
import { ICategory, IShop, IType } from "@/types";
import { CategoriesQueryOptionsType } from "@/types/custom.types";
import { PaginatorInfo } from "@/types/utils";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { useQuery } from "@tanstack/react-query";

 export const useGetCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<PaginatorInfo<ICategory>, Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    categoryClient.getCategories,
    {
      keepPreviousData: true,
    }
  );
};