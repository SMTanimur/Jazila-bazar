"use client"
import { Icons } from '../ui/icons';
import { useCartStore } from '@/store/cart/cart.store';
import { useGlobalModalStateStore } from '@/store/modal';

const CartCounterButton = () => {
  const { totalUniqueItems } = useCartStore((state)=>state);
  const globalModal = useGlobalModalStateStore((state)=>state)
  function handleCartSidebar() {
   globalModal.onCartState()
  }
  return (
    <button
      className="flex relative"
      onClick={handleCartSidebar}
    >
      <Icons.cart className="w-5" />
      {totalUniqueItems > 0 && (
        <span className="min-w-[20px] h-5 flex items-center justify-center rounded-full bg-primary text-white text-[10px] absolute left-1/2 -top-1/2">
          {totalUniqueItems}
        </span>
      )}
    </button>
  );
};

export default CartCounterButton;