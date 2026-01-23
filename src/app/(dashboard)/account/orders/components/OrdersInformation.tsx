"use client";

import { useGetOrders } from "@/hooks/api/orders/useGetOrders";
import OrderCard from "./OrderCard";
import { Loader2, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const OrdersInformation = () => {
  const { data: orders, isLoading, error } = useGetOrders();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-gray-500">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <Package className="w-12 h-12 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">
              Failed to load orders. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center gap-3 text-center min-h-[400px]">
            <Package className="w-16 h-16 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              No orders yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              You haven&apos;t placed any orders yet. Start shopping to see your
              orders here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </section>
  );
};

export default OrdersInformation;
