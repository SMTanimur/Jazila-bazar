"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import usePrice from "@/hooks/use-price";
import { useCartStore } from "@/store/cart/cart.store";
import Link from "next/link";
import { CartItemDetails } from "./cart-item";

const CartItemsDetails = () => {
  const { items, total } = useCartStore((state) => state);
  const { price: cartTotal } = usePrice({
    amount: total,
    currencyCode: "USD",
  });
  return (
    <div className="container flex flex-col xl:flex-row  gap-8 py-12  ">
      <div className="w-full  xl:w-[70%] whitespace-nowrap rounded-md h-auto">
        <ScrollArea className=" whitespace-nowrap rounded-md border ">
          {items?.map((item) => (
            <CartItemDetails item={item} key={item._id} />
          ))}

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className=" w-full xl:w-[30%] bg-gray-100 dark:bg-background p-5 flex flex-col space-y-6">
        <h1 className="text-xl text-gray-900 dark:text-white font-semibold">
          Cart Total
        </h1>

        <div className="border border-t" />
        <div className="flex flex-col justify-center">
          <div className="flex ">
            <h1 className=" text-gray-600 dark:text-white font-semibold">
              Subtotal
            </h1>
            <span className="ml-auto  text-gray-600 dark:text-white font-semibold">
              {cartTotal}
            </span>
          </div>
          <div className="flex ">
            <h1 className=" text-gray-600 dark:text-white font-semibold">
              Shipping
            </h1>
            <span className="ml-auto  text-gray-600 dark:text-white font-semibold">
              Cost at Checkout
            </span>
          </div>
          <div className="flex ">
            <h1 className=" text-gray-600 dark:text-white font-semibold">
              Tax
            </h1>
            <span className="ml-auto  text-gray-600 dark:text-white font-semibold">
              Cost at Checkout
            </span>
          </div>
        </div>
        <div className="border border-t" />

        <div className="flex flex-col justify-center space-y-3">
          <div className="flex ">
            <h1 className="text-lg text-gray-900 dark:text-white font-semibold">
              Total
            </h1>
            <span className="ml-auto text-lg text-primary font-semibold">
              {cartTotal}
            </span>
          </div>

          <button className="px-4 w-full py-2 bg-red-500 text-white rounded-lg">
            Process to Checkout
          </button>

          <button className="px-4 w-full py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg grid place-items-center">
            <Link href="/products">Return to Shopping</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemsDetails;
