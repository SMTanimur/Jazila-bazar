import { useQuery } from "@tanstack/react-query";
import { orderClient } from "@/services/order.service";
import { IOrder } from "@/types";

export function useGetOrder(orderId: string) {
  return useQuery<IOrder, Error>(
    ["order", orderId],
    () => orderClient.getOrder(orderId),
    {
      enabled: !!orderId,
    }
  );
}
