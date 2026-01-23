"use client";

import { useGetOrder } from "@/hooks/api/orders/useGetOrder";
import { useParams } from "next/navigation";
import { Package, MapPin, Phone, Mail, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/hooks/use-price";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { OrderDetailsSkeleton } from "./OrderDetailsSkeleton";

const OrderDetails = () => {
  const params = useParams();
  const orderId = params?.id as string;
  const { data: order, isLoading, error } = useGetOrder(orderId);

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  if (error || !order) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <Package className="w-12 h-12 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">
              Order not found or failed to load.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
    <div className="space-y-6">
      {/* Order Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Order #{order.tracking_number}</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Placed on {formatDate(order.created_at)}
              </p>
            </div>
            <Badge className={getPaymentStatusColor(order.payment_status)}>
              {getPaymentStatusLabel(order.payment_status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Items</p>
                <p className="font-semibold">{order.products?.length || 0} item(s)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-semibold text-primary">
                  {formatPrice({ amount: order.total, currencyCode: "USD" })}
                </p>
              </div>
            </div>
            {order.payment_gateway && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-semibold">{order.payment_gateway}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.products?.map((productPivot: any, index: number) => {
              // Handle both ProductPivot structure and direct Product structure
              const product = productPivot.product_id || productPivot;
              const pivot = productPivot.product_id ? productPivot : productPivot.pivot;
              
              const productName = product?.name || `Product ${productPivot.product_id || 'Unknown'}`;
              // Image can be accessed via img_url (ImageInfo type) or as a string
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
                  className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                    {productImage && productImage !== "/placeholder.png" ? (
                      <Image
                        src={productImage}
                        alt={productName}
                        fill
                        className="object-cover rounded"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          (e.target as HTMLImageElement).src = "/placeholder.png";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {productName}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Quantity: {quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Unit Price: {formatPrice({
                        amount: unitPrice,
                        currencyCode: "USD"
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">
                      {formatPrice({
                        amount: subtotal,
                        currencyCode: "USD"
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="font-medium">
                {(() => {
                  // Calculate subtotal from products if amount is 0 or missing
                  const subtotal = order.amount > 0 
                    ? order.amount 
                    : order.products?.reduce((sum: number, productPivot: any) => {
                        const pivotSubtotal = productPivot.subtotal || 
                          (productPivot.unit_price || 0) * (productPivot.order_quantity || 1);
                        return sum + (pivotSubtotal || 0);
                      }, 0) || 0;
                  
                  return formatPrice({ amount: subtotal, currencyCode: "USD" });
                })()}
              </span>
            </div>
            {order.discount && order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{formatPrice({ amount: order.discount, currencyCode: "USD" })}</span>
              </div>
            )}
            {order.delivery_fee && order.delivery_fee > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                <span className="font-medium">
                  {formatPrice({ amount: order.delivery_fee, currencyCode: "USD" })}
                </span>
              </div>
            )}
            {order.sales_tax && order.sales_tax > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="font-medium">
                  {formatPrice({ amount: order.sales_tax, currencyCode: "USD" })}
                </span>
              </div>
            )}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-semibold text-lg text-primary">
                {formatPrice({ amount: order.total, currencyCode: "USD" })}
              </span>
            </div>
            {order.paid_total > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Paid</span>
                <span className="font-medium">
                  {formatPrice({ amount: order.paid_total, currencyCode: "USD" })}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      {(order.address || (order as any).billing_address) && (
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(() => {
                const address = order.address || (order as any).billing_address;
                if (!address) return null;
                
                return (
                  <>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {address.name}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {address.street}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {address.city}, {address.state} {address.postcode}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {address.country}
                        </p>
                      </div>
                    </div>
                    {address.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {address.phone}
                        </span>
                      </div>
                    )}
                    {address.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {address.email}
                        </span>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delivery Time */}
      {order.delivery_time && (
        <Card>
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                {order.delivery_time}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderDetails;
