"use client";

import { useCartStore } from "@/store/cart/cart.store";
import { useCheckoutStore } from "@/store/checkout";
import usePrice, { formatPrice } from "@/hooks/use-price";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";


interface OrderSummaryProps {
  onPlaceOrder?: () => void;
  isLoading?: boolean;
}

const OrderSummary = ({ onPlaceOrder, isLoading = false }: OrderSummaryProps) => {
  const { items, total } = useCartStore((state) => state);
  const { 
    verified_response, 
    coupon, 
    use_wallet, 
    payable_amount,
    address,
    delivery_time,
    payment_gateway 
  } = useCheckoutStore((state) => state);

  const subtotal = total;
  const shipping = verified_response?.shipping_charge || 0;
  const tax = verified_response?.total_tax || 0;
  const discount = coupon?.amount ? parseFloat(coupon.amount.toString()) : 0;
  const walletDeduction = use_wallet && verified_response?.wallet_amount ? verified_response.wallet_amount : 0;
  
  // Calculate total
  const calculatedTotal = subtotal + shipping + tax - discount - walletDeduction;
  const finalTotal = payable_amount > 0 ? payable_amount : calculatedTotal;

  const { price: subtotalPrice } = usePrice({
    amount: subtotal,
    currencyCode: "USD",
  });

  const { price: shippingPrice } = usePrice({
    amount: shipping,
    currencyCode: "USD",
  });

  const { price: taxPrice } = usePrice({
    amount: tax,
    currencyCode: "USD",
  });

  const { price: discountPrice } = usePrice({
    amount: discount,
    currencyCode: "USD",
  });

  const { price: walletPrice } = usePrice({
    amount: walletDeduction,
    currencyCode: "USD",
  });

  const { price: totalPrice } = usePrice({
    amount: finalTotal,
    currencyCode: "USD",
  });

  const canPlaceOrder = address && delivery_time && payment_gateway && items.length > 0;

  return (
    <div className="sticky top-4 h-fit">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-shadow hover:shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Order Summary
        </h2>

        {/* Cart Items */}
        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
              <div className="relative w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item?.image?.img_url || "/placeholder.png"}
                  alt={item?.name || "Product"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {item?.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Qty: {item.quantity}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {formatPrice({ 
                    amount: item.itemTotal || item.sale_price * (item.quantity || 1), 
                    currencyCode: "USD" 
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="text-gray-900 dark:text-white font-medium">{subtotalPrice}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {shipping > 0 ? shippingPrice : "Free"}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Tax</span>
            <span className="text-gray-900 dark:text-white font-medium">{taxPrice}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
              <span>Discount</span>
              <span className="font-medium">-{discountPrice}</span>
            </div>
          )}

          {walletDeduction > 0 && (
            <div className="flex justify-between text-sm text-blue-600 dark:text-blue-400">
              <span>Wallet</span>
              <span className="font-medium">-{walletPrice}</span>
            </div>
          )}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
            <div className="flex justify-between">
              <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
              <span className="text-lg font-bold text-primary">{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <Button
          onClick={onPlaceOrder}
          disabled={!canPlaceOrder || isLoading}
          className="w-full py-6 text-base font-semibold"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </Button>

        {!canPlaceOrder && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-2 text-center">
            {!address && "Please select an address. "}
            {!delivery_time && "Please select delivery time. "}
            {!payment_gateway && "Please select payment method."}
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
