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
      // Backend returns array directly or wrapped in data property
      return Array.isArray(response) ? response : (response.data || []);
    },
    {
      keepPreviousData: true,
    }
  );
}
