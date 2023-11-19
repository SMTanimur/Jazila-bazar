

import { productClient } from "@/services/product.service";
import { IProduct } from "@/types";
import { ProductsQueryOptionsType } from "@/types/custom.types";
import { PaginatorInfo } from "@/types/utils";
import { useQuery } from "@tanstack/react-query";

 export const useGetProductsQuery = (params: ProductsQueryOptionsType ,options: any = {}) => {
  return useQuery<PaginatorInfo<IProduct>, Error>(
    ["products", params],
    productClient.getProducts,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};