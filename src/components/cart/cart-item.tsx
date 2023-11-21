
import { motion } from 'framer-motion';
import Counter from '@/components/ui/counter';
import { useCartStore } from '@/store/cart/cart.store';
import usePrice from '@/hooks/use-price';
import { fadeInOut } from '@/lib/motion/fade-in-out';
import Image from 'next/image';
import { Icons } from '../ui/icons';

interface CartItemProps {
  item: any;
}

const CartItem = ({ item }: CartItemProps) => {

  const { isInStock, clearItemFromCart, addItemToCart, removeItemFromCart } =
    useCartStore((state)=>state);

  const { price } = usePrice({
    amount: item.price,
    currencyCode:"USD"
  });
  const { price: itemPrice } = usePrice({
    amount: item.itemTotal,
    currencyCode: "USD"
  });
  function handleIncrement(e: any) {
    e.stopPropagation();
    addItemToCart(item, 1);
  }
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(item._id);
  };
  const outOfStock = !isInStock(item._id);
  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className="flex items-center py-4 px-4 sm:px-6 text-sm border-b border-solid border-border border-opacity-75"
    >
      <div className="flex-shrink-0">
        <Counter
          value={item.quantity}
          onDecrement={handleRemoveClick}
          onIncrement={handleIncrement}
          variant="venus"
          disabled={outOfStock}
        />
      </div>

      <div className="w-10 sm:w-16 h-10 sm:h-16 flex items-center justify-center overflow-hidden bg-gray-100 mx-4 shrink-0 relative">
        <Image
          src={item?.image.img_url as string}
          alt={item.name}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div>
        {/* <h3 className="font-bold text-heading">{item.name}</h3> */}
        <h3 className="font-bold text-heading">{item?.name} </h3>
        <p className="my-2.5 font-semibold text-accent">{price}</p>
        <span className="text-xs text-body">
          {item?.quantity} X {item?.unit}
        </span>
      </div>
      <span className=" mr-auto font-bold text-heading">
        {itemPrice}
      </span>
      <button
        className="w-7 h-7  mr-3  -ml-2 flex items-center justify-center shrink-0 rounded-full text-muted transition-all duration-200 focus:outline-none hover:bg-gray-100 focus:bg-gray-100 hover:text-red-600 focus:text-red-600"
        onClick={() => clearItemFromCart(item._id)}
      >
        <span className="sr-only">close</span>
        <Icons.close className="w-3 h-3" />
      </button>
    </motion.div>
  );
};

export default CartItem;
