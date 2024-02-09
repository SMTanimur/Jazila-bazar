"use client";

import { ROUTES } from "@/configs/routes";
import usePrice from "@/hooks/use-price";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart/cart.store";
import { useGlobalModalStateStore } from "@/store/modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icons } from "../ui/icons";
import CartItem from "./cart-item";
import EmptyCart from "./empty-cart";

const CartSidebarView = () => {
  const { items, total, isEmpty } = useCartStore((state) => state);
  const globalModal = useGlobalModalStateStore((state) => state);
  const router = useRouter();
  function handleCheckout() {
    const isRegularCheckout = items.find((item) => !Boolean(item.is_digital));
    if (isRegularCheckout) {
      router.push(ROUTES.CHECKOUT);
    } else {
      router.push(ROUTES.CHECKOUT_DIGITAL);
    }

    globalModal.closeCartState();
  }

  const { price: cartTotal } = usePrice({
    amount: total,
    currencyCode: "USD",
  });
  return (
    <div className="flex flex-col justify-between w-full h-full dark:bg-[#0c0a09]">
      <div className="relative flex items-center justify-between w-full px-5 py-5 border-b border-gray-base md:px-7">
        <h3>Shoping Cart</h3>
        <button
          className="text-sm font-semibold text-heading text-primary"
          onClick={() => globalModal.closeCartState()}
        >
          <Icons.close className="w-4 h-4" />
        </button>
      </div>

      {!isEmpty ? (
        <div className="flex-grow w-full cart-scrollbar ">
          <div className="w-full px-5 md:px-7  h-[calc(100vh_-_420px)]">
            {items?.map((item) => (
              <CartItem item={item} key={item._id} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}

      <div className="px-5 pt-5 pb-5 border-t border-border-base md:px-7 md:pt-6 md:pb-6 bg-gray-100 dark:bg-black">
        <h6 className="text-sm text-gray-500 py-2">
          Shipping and taxes are calculated at checkout
        </h6>
        <div className="flex justify-between pb-5 md:pb-7">
          <div className="">
            <h3 className="mb-2.5 text-lg font-semibold text-gray-800 dark:text-white">
              Total:
            </h3>
          </div>
          <div className="shrink-0 font-semibold text-base md:text-lg text-primary -mt-0.5 min-w-[80px]  text-left">
            {cartTotal}
          </div>
        </div>
        <button
          className="flex flex-col gap-4 w-full"
          onClick={() => globalModal.closeCartState()}
          
        >
          <Link
            href={`/cart`}
            className={cn(
              "w-full px-5 py-3 md:py-4 flex items-center justify-center bg-white rounded font-semibold text-sm sm:text-15px text-primary focus:outline-none transition duration-300 hover:bg-opacity-90 border-2 border-primary dark:bg-black",
              {
                "cursor-not-allowed !text-gray-800  !bg-[#EEEEEE]  hover:!bg-[#EEEEEE]":
                  isEmpty,
              }
            )}
          >
            <span className="py-0.5">View Cart</span>
          </Link>
          <Link
            href={`${ROUTES.CHECKOUT}`}
            className={cn(
              "w-full px-5 py-3 md:py-4 flex items-center justify-center bg-primary rounded font-semibold text-sm sm:text-15px text-white focus:outline-none transition duration-300 hover:bg-opacity-90",
              {
                "cursor-not-allowed !text-brand-dark !text-opacity-25 !bg-[#EEEEEE] hover:!bg-[#EEEEEE]":
                  isEmpty,
              }
            )}
          >
            <span className="py-0.5">Checkout</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default CartSidebarView;
