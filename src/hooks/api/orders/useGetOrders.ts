import { useQuery } from "@tanstack/react-query";
import { orderClient } from "@/services/order.service";
import { IOrder } from "@/types";

export function useGetOrders(params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  return useQuery<IOrder[], Error>(
    ["orders", params],
    async () => {
      const response = await orderClient.getOrders(params);
      
      if (Array.isArray(response)) {
        return response;
      }
      
      if (response) {
        // @ts-ignore
        if (Array.isArray(response.docs)) {
          // @ts-ignore
          return response.docs;
        }
        // @ts-ignore
        if (Array.isArray(response.data)) {
          // @ts-ignore
          return response.data;
        }
        // @ts-ignore
        if (response.data && Array.isArray(response.data.docs)) {
          // @ts-ignore
          return response.data.docs;
        }
      }
      
      return [];
    },
    {
      keepPreviousData: true,
    }
  );
}
