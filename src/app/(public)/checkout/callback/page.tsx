"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { orderClient } from "@/services/order.service";
import { IOrder } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { ROUTES } from "@/configs/routes";
import Link from "next/link";

type PaymentStatus = "processing" | "success" | "failed" | "pending";

const PaymentCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [status, setStatus] = useState<PaymentStatus>("processing");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        // Get order ID from URL params or sessionStorage
        const orderId =
          searchParams.get("orderId") ||
          searchParams.get("orderID") ||
          sessionStorage.getItem("pendingOrderId");

        if (!orderId) {
          setStatus("failed");
          setIsLoading(false);
          toast.error("Order ID not found");
          return;
        }

        // Fetch order status
        const orderData = await orderClient.getOrder(orderId);
        setOrder(orderData);

        // Determine payment status
        if (orderData.payment_status === "payment-success") {
          setStatus("success");
          sessionStorage.removeItem("pendingOrderId");
        } else if (orderData.payment_status === "payment-failed") {
          setStatus("failed");
        } else {
          // Poll for status update (webhook might be delayed)
          setTimeout(() => {
            checkPaymentStatus();
          }, 3000);
        }
      } catch (error: any) {
        console.error("Error checking payment status:", error);
        setStatus("failed");
        toast.error("Failed to check payment status");
      } finally {
        setIsLoading(false);
      }
    };

    checkPaymentStatus();
  }, [searchParams]);

  const handleRetry = () => {
    if (order) {
      router.push(`${ROUTES.CHECKOUT}?retry=${order._id}`);
    } else {
      router.push(ROUTES.CHECKOUT);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        {isLoading ? (
          <>
            <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Processing Payment
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we confirm your payment...
            </p>
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your order has been placed successfully. You will receive a confirmation email shortly.
            </p>
            {order && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Order ID: <span className="font-semibold text-gray-900 dark:text-white">{order.tracking_number || order._id}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Total: <span className="font-semibold text-gray-900 dark:text-white">${order.total?.toFixed(2)}</span>
                </p>
              </div>
            )}
            <div className="space-y-3">
              <Button
                onClick={() => router.push(`${ROUTES.ORDERS}/${order?._id}`)}
                className="w-full"
                size="lg"
              >
                View Order
              </Button>
              <Button
                onClick={() => router.push(ROUTES.HOME)}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Continue Shopping
              </Button>
            </div>
          </>
        ) : status === "failed" ? (
          <>
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Payment Failed
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your payment could not be processed. Please try again or use a different payment method.
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleRetry}
                className="w-full"
                size="lg"
              >
                Retry Payment
              </Button>
              <Button
                onClick={() => router.push(ROUTES.CHECKOUT)}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Back to Checkout
              </Button>
            </div>
          </>
        ) : (
          <>
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Payment Pending
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your payment is being processed. We will notify you once it's confirmed.
            </p>
            <Button
              onClick={() => router.push(ROUTES.ORDERS)}
              variant="outline"
              className="w-full"
              size="lg"
            >
              View Orders
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentCallbackPage;
