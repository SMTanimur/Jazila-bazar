"use client";

import { useGetOrder } from "@/hooks/api/orders/useGetOrder";
import { useParams } from "next/navigation";
import { 
  Package, MapPin, Phone, Mail, Calendar, 
  DollarSign, Receipt, CreditCard, Clock, Truck, ShoppingBag, ShieldCheck,
  ClipboardList, PackageOpen, Warehouse, CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatPrice } from "@/hooks/use-price";
import { formatDate, cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderDetailsSkeleton } from "./OrderDetailsSkeleton";
import InvoiceModal from "./InvoiceModal";
import { useState, useEffect } from "react";

const OrderDetails = () => {
  const params = useParams();
  const orderId = params?.id as string;
  const { data: order, isLoading, error } = useGetOrder(orderId);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (order) {
      const getActiveStepIndex = (status: string) => {
        const norm = status?.toLowerCase() || "";
        if (norm.includes("completed")) return 4;
        if (norm.includes("out-for-delivery")) return 3;
        if (norm.includes("at-local-facility")) return 2;
        if (norm.includes("processing")) return 1;
        return 0; // pending
      };
      const activeIdx = getActiveStepIndex(order.order_status);
      const timer = setTimeout(() => {
        setProgress((activeIdx / 4) * 100);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [order]);

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  if (error || !order) {
    return (
      <Card className="border-slate-100 dark:border-slate-800">
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center text-rose-500">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Order Not Found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              We couldn't retrieve the details for this order. It might have been archived or does not exist.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

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

  const getStepIcon = (key: string, isCompleted: boolean, isActive: boolean) => {
    const iconClass = cn(
      "w-5 h-5 transition-colors duration-300",
      isActive ? "text-white" : isCompleted ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"
    );

    switch (key) {
      case "pending":
        return <ClipboardList className={iconClass} />;
      case "processing":
        return <PackageOpen className={iconClass} />;
      case "at-local-facility":
        return <Warehouse className={iconClass} />;
      case "out-for-delivery":
        return <Truck className={iconClass} />;
      case "completed":
        return <CheckCircle className={iconClass} />;
      default:
        return <Package className={iconClass} />;
    }
  };

  // Timeline Steps matching OrderStatus
  const timelineSteps = [
    { key: "pending", label: "Pending", desc: "Order placed" },
    { key: "processing", label: "Processing", desc: "Preparing items" },
    { key: "at-local-facility", label: "Sorting Facility", desc: "Arrived at local hub" },
    { key: "out-for-delivery", label: "Out for Delivery", desc: "Courier is on the way" },
    { key: "completed", label: "Delivered", desc: "Package received" }
  ];

  const getActiveStepIndex = (status: string) => {
    const norm = status?.toLowerCase() || "";
    if (norm.includes("completed")) return 4;
    if (norm.includes("out-for-delivery")) return 3;
    if (norm.includes("at-local-facility")) return 2;
    if (norm.includes("processing")) return 1;
    return 0; // pending
  };

  const activeIndex = getActiveStepIndex(order.order_status);
  const isCancelled = order.order_status?.toLowerCase().includes("cancelled");
  const isFailed = order.order_status?.toLowerCase().includes("failed");
  const isRefunded = order.order_status?.toLowerCase().includes("refunded");

  const address = order.address || (order as any).billing_address;

  const subtotal = order.amount > 0 
    ? order.amount 
    : order.products?.reduce((sum: number, productPivot: any) => {
        const pivot = productPivot.product_id ? productPivot : productPivot.pivot;
        const pivotSubtotal = productPivot.subtotal || 
          (productPivot.unit_price || 0) * (productPivot.order_quantity || pivot?.order_quantity || 1);
        return sum + (pivotSubtotal || 0);
      }, 0) || 0;

  return (
    <div className="space-y-6">
      {/* Order Header Card */}
      <Card className="relative overflow-hidden border border-slate-100 hover:border-slate-200 dark:border-slate-800/80 dark:hover:border-slate-700/80 transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-primary-focus/80" />
        <CardHeader className="p-6 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl text-slate-800 dark:text-slate-100">
                  Order #{order.tracking_number}
                </span>
                <Badge className={getPaymentStatusColor(order.payment_status)}>
                  {getPaymentStatusLabel(order.payment_status)}
                </Badge>
              </div>
              <p className="text-sm text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> Placed on {formatDate(order.created_at)}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button 
                onClick={() => setInvoiceOpen(true)}
                variant="outline" 
                size="sm" 
                className="font-bold gap-2 text-slate-700 border-slate-200 hover:bg-slate-50 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800 shadow-sm w-full sm:w-auto"
              >
                <Receipt className="w-4 h-4 text-primary" />
                Invoice Receipt
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-2 border-t border-slate-50 dark:border-slate-850">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="space-y-1 bg-slate-50/50 dark:bg-slate-900/30 p-3.5 rounded-xl border border-slate-100/50 dark:border-slate-850/50">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase flex items-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5" /> Total Items
              </span>
              <p className="font-extrabold text-lg text-slate-700 dark:text-slate-200">
                {order.products?.length || 0} item(s)
              </p>
            </div>

            <div className="space-y-1 bg-slate-50/50 dark:bg-slate-900/30 p-3.5 rounded-xl border border-slate-100/50 dark:border-slate-850/50">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> Total Amount
              </span>
              <p className="font-black text-lg text-primary">
                {formatPrice({ amount: order.total, currencyCode: "USD" })}
              </p>
            </div>

            <div className="space-y-1 bg-slate-50/50 dark:bg-slate-900/30 p-3.5 rounded-xl border border-slate-100/50 dark:border-slate-850/50">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5" /> Payment Method
              </span>
              <p className="font-extrabold text-sm text-slate-700 dark:text-slate-200 pt-0.5">
                {formatPaymentGateway(order.payment_gateway)}
              </p>
            </div>

            <div className="space-y-1 bg-slate-50/50 dark:bg-slate-900/30 p-3.5 rounded-xl border border-slate-100/50 dark:border-slate-850/50">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Delivery Status
              </span>
              <p className="font-extrabold text-sm text-slate-700 dark:text-slate-200 pt-0.5 flex items-center gap-1.5">
                <span className={cn(
                  "w-2 h-2 rounded-full",
                  isCancelled || isFailed ? "bg-red-500" : isRefunded ? "bg-amber-500" : activeIndex === 4 ? "bg-green-500" : "bg-blue-500"
                )} />
                {getOrderStatusLabel(order.order_status)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Tracking Timeline */}
      {!isCancelled && !isFailed && !isRefunded ? (
        <Card className="border-slate-100 dark:border-slate-800">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes bobble {
              0% { transform: translateY(-50%) scale(1); }
              50% { transform: translateY(-50%) translateY(-2px) scale(1.05); }
              100% { transform: translateY(-50%) scale(1); }
            }
            .animate-bobble {
              animation: bobble 1.5s ease-in-out infinite;
            }
          `}} />
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-primary" /> Delivery Tracker
            </CardTitle>
            <CardDescription>
              Follow the journey of your package in real-time.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            {/* Desktop Horizontal Tracker */}
            <div className="relative hidden md:block py-6">
              
              {/* Sleek Line Background & Progress Fill */}
              <div className="absolute top-[28px] left-[84px] right-[84px] h-1 bg-slate-100 dark:bg-slate-800/80 rounded-full z-0">
                {/* Progress Road Fill */}
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(244,63,94,0.3)]"
                  style={{ width: `${progress}%` }}
                />

                {/* Seeker Animated Truck Badge */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out z-25"
                  style={{ left: `calc(${progress}% - 20px)` }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-white shadow-lg shadow-primary/30 border-2 border-white dark:border-slate-900 flex items-center justify-center animate-bobble">
                    <Truck className="w-5 h-5 fill-white/10" />
                  </div>
                </div>
              </div>

              {/* Checkpoint Circles Row */}
              <div className="relative flex justify-between z-10 px-14">
                {timelineSteps.map((step, idx) => {
                  const isCompleted = idx <= activeIndex;
                  const isActive = idx === activeIndex;

                  return (
                    <div key={step.key} className="relative flex flex-col items-center">
                      {/* Pulse effect for active station */}
                      {isActive && (
                        <div className="absolute -inset-1.5 rounded-full bg-primary/20 animate-ping" />
                      )}
                      
                      {/* Station Badge Circle */}
                      <div className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-sm z-30",
                        isActive 
                          ? "bg-primary border-primary-focus text-white scale-110 shadow-primary/25" 
                          : isCompleted 
                            ? "bg-emerald-50 border-emerald-500/80 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-400" 
                            : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400"
                      )}>
                        {getStepIcon(step.key, isCompleted, isActive)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Labels & Descriptions Row */}
              <div className="relative flex justify-between px-14 mt-4">
                {timelineSteps.map((step, idx) => {
                  const isCompleted = idx <= activeIndex;
                  const isActive = idx === activeIndex;

                  return (
                    <div key={step.key} className="flex flex-col items-center text-center w-14 overflow-visible">
                      <div className="w-32 flex flex-col items-center">
                        <span className={cn(
                          "text-xs font-extrabold tracking-tight transition-colors",
                          isActive ? "text-primary text-sm" : isCompleted ? "text-slate-800 dark:text-slate-200" : "text-slate-400"
                        )}>
                          {step.label}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5 leading-tight">
                          {step.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Mobile Vertical Tracker */}
            <div className="flex gap-4 relative min-h-[400px] md:hidden p-2">
              {/* Vertical Tracker Progress Line */}
              <div className="absolute left-[28px] top-[28px] bottom-[28px] w-1 bg-slate-100 dark:bg-slate-800 rounded-full z-0">
                {/* Progress Fill */}
                <div 
                  className="absolute top-0 left-0 right-0 bg-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ height: `${progress}%` }}
                />

                {/* Seeker Animated Truck Badge */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out z-20"
                  style={{ top: `calc(${progress}% - 20px)` }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-white shadow-lg shadow-primary/30 border-2 border-white dark:border-slate-900 flex items-center justify-center animate-bobble">
                    <Truck className="w-5 h-5 rotate-90 fill-white/10" />
                  </div>
                </div>
              </div>

              {/* Vertical Checklist Items */}
              <div className="flex flex-col justify-between flex-1 pl-14 py-4 min-h-[380px] relative z-10">
                {timelineSteps.map((step, idx) => {
                  const isCompleted = idx <= activeIndex;
                  const isActive = idx === activeIndex;

                  return (
                    <div key={step.key} className="flex items-center gap-4 py-1 relative">
                      {/* Station Circle (Absolute offset to align over vertical line) */}
                      <div className="absolute -left-[70px] flex items-center justify-center w-14 h-14 z-30">
                        {isActive && (
                          <div className="absolute -inset-1 rounded-full bg-primary/20 animate-ping" />
                        )}
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-sm",
                          isActive 
                            ? "bg-primary border-primary-focus text-white scale-110 shadow-primary/20" 
                            : isCompleted 
                              ? "bg-emerald-50 border-emerald-500/80 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-400" 
                              : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400"
                        )}>
                          {getStepIcon(step.key, isCompleted, isActive)}
                        </div>
                      </div>

                      {/* Text Details */}
                      <div className="flex flex-col">
                        <span className={cn(
                          "text-xs font-extrabold tracking-tight transition-colors",
                          isActive ? "text-primary font-bold text-sm" : isCompleted ? "text-slate-800 dark:text-slate-200" : "text-slate-400"
                        )}>
                          {step.label}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold leading-tight mt-0.5">
                          {step.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-red-100 bg-red-50/10 dark:border-red-950/30 dark:bg-red-950/5">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/20 flex items-center justify-center text-red-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-red-800 dark:text-red-400">
                Order {isRefunded ? 'Refunded' : 'Cancelled / Failed'}
              </h4>
              <p className="text-xs text-red-600/80 dark:text-red-400/80 mt-0.5">
                {isRefunded 
                  ? "This order has been returned and refunded. The money will be returned to your original payment gateway." 
                  : "This order was cancelled and will not be processed further. If payment was made, refunds will be initiated."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Items List */}
      <Card className="border-slate-100 dark:border-slate-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-1.5">
            <Package className="w-4 h-4 text-primary" /> Order Items
          </CardTitle>
          <CardDescription>
            You ordered the following items from the store.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <div className="grid gap-3">
            {order.products?.map((productPivot: any, index: number) => {
              const product = productPivot.product_id || productPivot;
              const pivot = productPivot.product_id ? productPivot : productPivot.pivot;
              
              const productName = product?.name || `Product ${productPivot.product_id || 'Unknown'}`;
              const productImage = 
                (typeof product?.image === 'string' ? product.image : product?.image?.img_url) ||
                product?.image?.thumbnail || 
                product?.image?.original || 
                "/placeholder.png";
              const quantity = productPivot.order_quantity || pivot?.order_quantity || 1;
              const unitPrice = productPivot.unit_price || pivot?.unit_price || 0;
              const subtotal = productPivot.subtotal || pivot?.subtotal || (unitPrice * quantity);

              return (
                <div
                  key={productPivot._id || index}
                  className="flex gap-4 p-4 border border-slate-100 hover:border-slate-200 dark:border-slate-850 dark:hover:border-slate-800/80 rounded-xl transition-all duration-200 bg-slate-50/20 dark:bg-slate-900/10"
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden shadow-sm">
                    <Image
                      src={productImage}
                      alt={productName}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.png";
                      }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 truncate text-sm sm:text-base">
                      {productName}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium">
                      <span>
                        Quantity: <span className="font-bold text-slate-600 dark:text-slate-300">{quantity}</span>
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span>
                        Unit Price: <span className="font-bold text-slate-600 dark:text-slate-300">{formatPrice({ amount: unitPrice, currencyCode: "USD" })}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center text-right font-extrabold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                    {formatPrice({ amount: subtotal, currencyCode: "USD" })}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Grid: Shipping Address & Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Address */}
        {address ? (
          <Card className="border-slate-100 dark:border-slate-800 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" /> Delivery Details
              </CardTitle>
              <CardDescription>
                Shipping address and contact details for delivery.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-2 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100/50 dark:border-slate-850/50 space-y-3.5">
                <div>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">{address.name}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                    {address.street}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    {address.city}, {address.state} {address.postcode}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 font-semibold text-xs mt-0.5">
                    {address.country}
                  </p>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-850 pt-3 space-y-2 text-xs">
                  {address.phone && (
                    <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span>{address.phone}</span>
                    </div>
                  )}
                  {address.email && (
                    <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="truncate">{address.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {order.delivery_time && (
                <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50/20 dark:bg-slate-900/10 flex items-center gap-2.5 text-xs">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Scheduled delivery: <span className="font-bold text-slate-700 dark:text-slate-300">{order.delivery_time}</span>
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ) : null}

        {/* Order Summary */}
        <Card className="border-slate-100 dark:border-slate-800 h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-primary" /> Cost Summary
            </CardTitle>
            <CardDescription>
              Calculation of totals, taxes, and discounts.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100/50 dark:border-slate-850/50 space-y-3.5 text-sm">
              <div className="flex justify-between text-slate-500 dark:text-slate-450 font-medium">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {(() => {
                    return formatPrice({ amount: subtotal, currencyCode: "USD" });
                  })()}
                </span>
              </div>
              
              {order.discount && order.discount > 0 ? (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>Discount</span>
                  <span>-{formatPrice({ amount: order.discount, currencyCode: "USD" })}</span>
                </div>
              ) : null}

              {order.delivery_fee && order.delivery_fee > 0 ? (
                <div className="flex justify-between text-slate-500 dark:text-slate-450 font-medium">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {formatPrice({ amount: order.delivery_fee, currencyCode: "USD" })}
                  </span>
                </div>
              ) : null}

              {order.sales_tax && order.sales_tax > 0 ? (
                <div className="flex justify-between text-slate-500 dark:text-slate-450 font-medium">
                  <span>Sales Tax</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {formatPrice({ amount: order.sales_tax, currencyCode: "USD" })}
                  </span>
                </div>
              ) : null}

              <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between font-black text-slate-800 dark:text-slate-100 text-base">
                <span>Grand Total</span>
                <span className="text-primary text-lg font-black">
                  {formatPrice({ amount: order.total, currencyCode: "USD" })}
                </span>
              </div>

              {order.paid_total > 0 ? (
                <div className="flex justify-between text-emerald-600 font-extrabold border-t border-dashed border-slate-200 dark:border-slate-800 pt-3 text-xs uppercase tracking-wider">
                  <span>Amount Paid</span>
                  <span>
                    {formatPrice({ amount: order.paid_total, currencyCode: "USD" })}
                  </span>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Modal Popup */}
      <InvoiceModal 
        order={order}
        open={invoiceOpen}
        onOpenChange={setInvoiceOpen}
      />
    </div>
  );
};

export default OrderDetails;
