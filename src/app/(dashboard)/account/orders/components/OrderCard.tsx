"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IOrder } from "@/types";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/hooks/use-price";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Package, Calendar, ArrowRight, CreditCard, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  order: IOrder;
  loading?: boolean;
}

function OrderCard(props: Props) {
  const { order, loading = false, className, ...rootProps } = props;

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "payment-success":
      case "success":
      case "paid":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200/50 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50";
      case "payment-pending":
      case "pending":
        return "bg-amber-50 text-amber-700 border border-amber-200/50 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50";
      case "payment-failed":
      case "failed":
        return "bg-rose-50 text-rose-700 border border-rose-200/50 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50";
      case "cash-on-delivery":
      case "cod":
        return "bg-sky-50 text-sky-700 border border-sky-200/50 dark:bg-sky-950/30 dark:text-sky-400 dark:border-sky-900/50";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200/50 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800/50";
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status?.toLowerCase()) {
      case "payment-success":
      case "success":
      case "paid":
        return "Paid";
      case "payment-pending":
      case "pending":
        return "Pending";
      case "payment-failed":
      case "failed":
        return "Failed";
      case "cash-on-delivery":
      case "cod":
        return "Cash on Delivery";
      default:
        return status ? status.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : "Unknown";
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "order-completed":
      case "completed":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200/50 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50";
      case "order-processing":
      case "processing":
        return "bg-blue-50 text-blue-700 border border-blue-200/50 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50";
      case "order-pending":
      case "pending":
        return "bg-amber-50 text-amber-700 border border-amber-200/50 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50";
      case "order-cancelled":
      case "cancelled":
        return "bg-rose-50 text-rose-700 border border-rose-200/50 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50";
      case "order-at-local-facility":
      case "at-local-facility":
      case "out-for-delivery":
        return "bg-indigo-50 text-indigo-700 border border-indigo-200/50 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/50";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200/50 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800/50";
    }
  };

  const getOrderStatusLabel = (status: string) => {
    if (!status) return "Pending";
    return status
      .replace("order-", "")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const formatPaymentGateway = (gateway?: string) => {
    if (!gateway) return "Not Provided";
    const normalized = gateway.toUpperCase();
    if (normalized === "BKASH") return "bKash";
    if (normalized === "CASH_ON_DELIVERY" || normalized === "COD") return "Cash on Delivery";
    if (normalized === "SSLCOMMERZ") return "SSLCommerz";
    if (normalized === "STRIPE") return "Stripe";
    if (normalized === "PAYPAL") return "PayPal";
    return gateway.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-md border border-slate-100 hover:border-slate-200 dark:border-slate-800/80 dark:hover:border-slate-700/80", 
        className
      )} 
      {...rootProps}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-primary-focus/80" />
      <CardContent className="p-6 pl-7">
        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-850">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                <span className="font-bold text-lg text-slate-800 dark:text-slate-100">
                  Order #{order.tracking_number}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>Placed on {formatDate(order.created_at)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border",
                  getOrderStatusColor(order.order_status)
                )}
              >
                {getOrderStatusLabel(order.order_status)}
              </span>
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border",
                  getPaymentStatusColor(order.payment_status)
                )}
              >
                {getPaymentStatusLabel(order.payment_status)}
              </span>
            </div>
          </div>

          {/* Details & Previews */}
          <div className="flex flex-col md:flex-row gap-5 items-start justify-between">
            {/* Product Thumbs */}
            {order.products && order.products.length > 0 ? (
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase">Items</span>
                <div className="flex gap-2.5 items-center overflow-x-auto py-1">
                  {order.products.slice(0, 4).map((productPivot: any, idx: number) => {
                    const product = productPivot.product_id || productPivot;
                    const name = product?.name || "Product";
                    const img = (typeof product?.image === 'string' ? product.image : product?.image?.img_url) || 
                                product?.image?.thumbnail || 
                                product?.image?.original || 
                                "/placeholder.png";
                    return (
                      <div 
                        key={idx} 
                        className="group relative w-12 h-12 rounded-lg border border-slate-100 dark:border-slate-800 overflow-hidden flex-shrink-0 bg-slate-50 dark:bg-slate-900 shadow-sm transition-transform duration-200 hover:scale-105"
                        title={name}
                      >
                        <Image 
                          src={img} 
                          alt={name} 
                          fill 
                          className="object-cover"
                          sizes="48px"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.png";
                          }}
                        />
                      </div>
                    );
                  })}
                  {order.products.length > 4 && (
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-xs font-bold text-slate-500 dark:text-slate-400 flex-shrink-0">
                      +{order.products.length - 4}
                    </div>
                  )}
                  <span className="text-sm text-slate-600 dark:text-slate-300 font-medium ml-1">
                    {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1 w-full md:w-auto">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase">Items</span>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">0 items</span>
              </div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 w-full md:w-auto text-left md:text-right border-t border-slate-50 dark:border-slate-850/50 pt-4 md:pt-0 md:border-t-0">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase flex items-center md:justify-end gap-1">
                  <CreditCard className="w-3.5 h-3.5" /> Payment Method
                </span>
                <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">
                  {formatPaymentGateway(order.payment_gateway)}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase flex items-center md:justify-end gap-1">
                  <ShoppingBag className="w-3.5 h-3.5" /> Total Amount
                </span>
                <span className="font-extrabold text-lg text-primary">
                  {formatPrice({ amount: order.total, currencyCode: "USD" })}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-850">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
              <Truck className="w-4 h-4 text-slate-400" />
              <span>Est. Delivery: {order.delivery_time || "Standard Delivery"}</span>
            </div>
            <Link href={`/account/orders/${order._id}`}>
              <Button variant="ghost" size="sm" className="gap-1.5 group font-bold hover:bg-primary/5 hover:text-primary transition-all duration-200">
                View Details
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderCard;
