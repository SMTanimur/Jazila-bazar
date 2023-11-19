

import { useQuery } from "@tanstack/react-query"

import { IProduct } from "@/types"
import { productClient } from "@/services/product.service"

export const useProductQuery = (slug: string) => {
  return useQuery<IProduct, Error>(
    ["products", slug],
    () => productClient.getProduct(slug),
    {
      keepPreviousData: true,
    }
  )
}
