import usePrice from "@/hooks/use-price";
import { fadeInOut } from "@/lib/motion/fade-in-out";
import { useCartStore } from "@/store/cart/cart.store";
import { motion } from "framer-motion";
import Image from "next/image";
import { Icons } from "../ui/icons";
import Counter from "../ui/counter";

interface CartItemProps {
  item: any;
}

const CartItem = ({ item }: CartItemProps) => {
  const { isInStock, clearItemFromCart, addItemToCart, removeItemFromCart } =
    useCartStore((state) => state);

  const { price: itemPrice } = usePrice({
    amount: item.itemTotal,
    currencyCode: "USD",
  });

  const outOfStock = !isInStock(item._id);
  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className="flex items-center justify-between py-4  text-sm border-b border-solid border-border border-opacity-75"
    >
      <div className="flex items-center gap-4 w-full">
        <div className="max-w-[120px] w-full grid place-items-center bg-gray-100">
          <Image
            src={item?.image?.img_url as string}
            alt={item?.name}
            width={80}
            height={80}
            className="w-20 h-20"
          />
        </div>
        <div className="flex flex-col justify-center w-full">
          <h4 className="text-base font-semibold text-gray-800">
            {item?.name.length > 14
              ? `${item?.name.substring(0, 14)}...`
              : item?.name}
          </h4>
          <p className="text-base text-gray-700">{itemPrice}</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <button className="px-2 py-1 bg-gray-100 "
        onClick={()=>clearItemFromCart(item._id)}
        >
          <Icons.trash className="w-4"/>
          <span className="sr-only">Remove Item</span>
        </button>
    
        <Counter
            value={item.quantity}
            onIncrement={() => addItemToCart(item, 1)}
            onDecrement={() => removeItemFromCart(item._id,1)}
            variant="single"
            disabled={outOfStock}
          />
      </div>
    </motion.div>
  );
};

export default CartItem;
