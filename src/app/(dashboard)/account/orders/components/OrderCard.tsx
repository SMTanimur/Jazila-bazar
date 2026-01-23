"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IOrder } from "@/types";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/hooks/use-price";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Package, Calendar, DollarSign, ArrowRight } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  order: IOrder;
  loading?: boolean;
}

function OrderCard(props: Props) {
  const { order, loading = false, className, ...rootProps } = props;

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "payment-success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "payment-pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "payment-failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "cash-on-delivery":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case "payment-success":
        return "Paid";
      case "payment-pending":
        return "Pending";
      case "payment-failed":
        return "Failed";
      case "cash-on-delivery":
        return "Cash on Delivery";
      default:
        return status;
    }
  };

  return (
    <Card className={cn("relative", className)} {...rootProps}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                <span className="font-semibold text-lg text-gray-900 dark:text-white">
                  Order #{order.tracking_number}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(order.created_at)}</span>
              </div>
            </div>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                getPaymentStatusColor(order.payment_status)
              )}
            >
              {getPaymentStatusLabel(order.payment_status)}
            </span>
          </div>

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500">Items</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {order.products?.length || 0} item(s)
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500">Total</span>
              <span className="font-semibold text-lg text-primary">
                {formatPrice({ amount: order.total, currencyCode: "USD" })}
              </span>
            </div>
          </div>

          {/* Payment Gateway */}
          {order.payment_gateway && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <DollarSign className="w-4 h-4" />
              <span>Payment: {order.payment_gateway}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end pt-2 border-t border-gray-200 dark:border-gray-700">
            <Link href={`/account/orders/${order._id}`}>
              <Button variant="outline" size="sm" className="gap-2">
                View Details
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderCard;
