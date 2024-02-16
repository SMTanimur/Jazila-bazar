"use client";

import Counter from "@/components/ui/counter";
import usePrice from "@/hooks/use-price";
import { useCartStore } from "@/store/cart/cart.store";
import Image from "next/image";

interface CartItemProps {
  item: any;
}
export const CartItemDetails = ({ item }: CartItemProps) => {
  const { price, basePrice, discount } = usePrice({
    amount: item?.sale_price ? item?.sale_price : item?.price,
    baseAmount: item?.price,
    currencyCode: "USD",
  });

  const { isInStock, clearItemFromCart, addItemToCart, removeItemFromCart } =
    useCartStore((state) => state);
  const { price: itemPrice } = usePrice({
    amount: item.itemTotal,
    currencyCode: "USD",
  });

  const outOfStock = !isInStock(item._id);
  return (
    <div className="min-w-[800px] bg-gray-100 dark:bg-background px-4 py-2 border border-b">
      <div className="p-3 px-4 flex justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="max-w-[100px] w-full">
            <Image
              src={item?.image?.img_url as string}
              alt={item?.name}
              width={80}
              height={80}
              className="w-20 h-20"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-gray-600 dark:text-white w-full text-ellipsis line-clamp-1">
              {item?.name}
            </h1>
            <div className="flex flex-col mt-2">
              <div className="flex gap-1 items-center">
                <h6 className="text-gray-800 font-semibold dark:text-white">
                  Sold By :
                </h6>
                <p className=" text-gray-500">Jazila Bazar</p>
              </div>
              {item?.unit && (
                <div className="flex gap-1 items-center">
                  <h6 className="text-gray-800 font-semibold dark:text-white">
                    Unit :
                  </h6>
                  <p className="text-base text-gray-500">{item?.unit}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-gray-600 dark:text-white">Price</h1>
          <div className="flex flex-col mt-2">
            <div className="flex gap-1 items-center">
              <h6 className="text-gray-800 font-semibold dark:text-white">
                {price}
              </h6>
              <del className=" text-gray-500">{basePrice}</del>
            </div>

            <div className="flex gap-1 items-center">
              <h6 className="text-primary font-semibold ">You Save:</h6>
              <p className="text-base text-gray-500">{discount}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-gray-600 dark:text-white">Quantity</h1>
          <div className="flex flex-col mt-2">
            <Counter
              value={item.quantity}
              onIncrement={() => addItemToCart(item, 1)}
              onDecrement={() => removeItemFromCart(item._id, 1)}
              variant="cart"
              disabled={outOfStock}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-gray-600 dark:text-white">Total</h1>
          <div className="flex flex-col mt-2">
            <h3 className="text-lg text-gray-800 dark:text-white font-semibold">
              {itemPrice}
            </h3>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-gray-600 dark:text-white">Action</h1>
          <div className="flex flex-col mt-2">
            <button className="text-green-400 underline">Save for later</button>

            <button
              className="text-red-400 underline"
              onClick={() => clearItemFromCart(item._id)}
            >
              Remove Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
