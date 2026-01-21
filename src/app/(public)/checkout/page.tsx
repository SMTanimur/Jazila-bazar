"use client";

import Breadcrumb from "@/components/ui/breadcrumb";
import CheckoutLeftSite from "@/modules/checkout/CheckoutLeftSite";
import OrderSummary from "@/modules/checkout/order-summary";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart/cart.store";
import { useCheckoutStore } from "@/store/checkout";
import { orderClient } from "@/services/order.service";
import { PaymentGateway } from "@/types";
import { toast } from "sonner";
import { ROUTES } from "@/configs/routes";

const CheckoutPage = () => {
  const router = useRouter();
  const { items, total, resetCart } = useCartStore((state) => state);
  const {
    address,
    delivery_time,
    payment_gateway,
    customer_contact,
    verified_response,
    coupon,
    use_wallet,
  } = useCheckoutStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!address || !delivery_time || !payment_gateway) {
      toast.error("Please complete all required fields");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsLoading(true);

    try {
      const subtotal = total;
      const shipping = verified_response?.shipping_charge || 0;
      const tax = verified_response?.total_tax || 0;
      const discount = coupon?.amount ? parseFloat(coupon.amount.toString()) : 0;
      const walletDeduction = use_wallet && verified_response?.wallet_amount ? verified_response.wallet_amount : 0;
      const finalTotal = subtotal + shipping + tax - discount - walletDeduction;

      // Map cart items to order products format
      // Handle variations: if productId exists, use it; otherwise use _id
      // Extract MongoDB ObjectId (remove variation suffix if present)
      const products = items.map((item) => {
        // Get the actual product ID (handle variations)
        let productId = item.productId || item._id;
        let variationOptionId = item.variationId || undefined;
        
        // If _id contains a dot (variation format: "productId.variationId"), extract both parts
        if (typeof productId === 'string' && productId.includes('.')) {
          const parts = productId.split('.');
          productId = parts[0];
          if (!variationOptionId && parts[1]) {
            variationOptionId = parts[1];
          }
        }
        
        // Ensure it's a string and valid MongoDB ObjectId format
        productId = String(productId);
        
        return {
          product_id: productId,
          order_quantity: item.quantity || 1,
          unit_price: item.sale_price,
          subtotal: item.itemTotal || item.sale_price * (item.quantity || 1),
          ...(variationOptionId && { variation_option_id: String(variationOptionId) }),
        };
      });

      const orderData = {
        customer_contact: customer_contact || address.phone,
        amount: subtotal,
        sales_tax: tax,
        total: finalTotal,
        payment_gateway: payment_gateway,
        delivery_time: delivery_time.description || `${delivery_time.title}`,
        delivery_fee: shipping,
        discount: discount > 0 ? discount : undefined,
        address: {
          name: address.name,
          country: address.country,
          street: address.street,
          city: address.city,
          state: address.state,
          postcode: address.postcode,
          phone: address.phone,
          email: address.email,
        },
        products,
        coupon: coupon?.id,
        use_wallet: use_wallet,
      };

      const response = await orderClient.createOrder(orderData);

      // If bKash or Rocket payment, redirect to payment URL
      if (
        (payment_gateway === PaymentGateway.BKASH || payment_gateway === PaymentGateway.ROCKET) &&
        response.payment_url
      ) {
        // Store order ID in sessionStorage for callback page
        sessionStorage.setItem("pendingOrderId", response.order._id);
        window.location.href = response.payment_url;
        return;
      }

      // For other payment methods, redirect to order confirmation
      toast.success("Order placed successfully!");
      resetCart();
      router.push(`${ROUTES.ORDERS || "/orders"}/${response.order._id}`);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to place order. Please try again.";
      toast.error(errorMessage);
      console.error("Order creation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className="h-12 py-10 bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
        <Breadcrumb />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-8 container pb-12">
        <div className="col-span-1 lg:col-span-2">
          <CheckoutLeftSite />
        </div>
        <div className="col-span-1">
          <OrderSummary onPlaceOrder={handlePlaceOrder} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
