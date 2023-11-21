"use client"

import { useCartStore } from '@/store/cart/cart.store';
import { useGlobalModalStateStore } from '@/store/modal';
import { ROUTES } from '@/configs/routes';
import usePrice from '@/hooks/use-price';
import { Icons } from '../ui/icons';
import { useRouter } from 'next/navigation';
import CartItem from './cart-item';
import { isEmpty } from 'lodash';
import Scrollbar from '../ui/scrollbar';
import EmptyCart from './empty-cart';
import Link from 'next/link';
import { cn } from '@/lib/utils';


const CartSidebarView = () => {
  const { items,  total,resetCart } = useCartStore((state)=>state);
  const globalModal = useGlobalModalStateStore((state)=>state)
  const router = useRouter();
  function handleCheckout() {
    const isRegularCheckout = items.find((item) => !Boolean(item.is_digital));
    if (isRegularCheckout) {
      router.push(ROUTES.CHECKOUT);
    } else {
      router.push(ROUTES.CHECKOUT_DIGITAL);
    }

    globalModal.closeCartState()
  }



  const { price: cartTotal } = usePrice({
    amount: total,
    currencyCode:"USD"
  });
  return (
    <div className="flex flex-col justify-between w-full h-full">
    <div className="relative flex items-center justify-between w-full px-5 py-5 border-b border-gray-base md:px-7">
      <h3 >Shoping Cart</h3>
      <div className="flex items-center">
        {!isEmpty && (
          <button
            className="flex items-center flex-shrink transition duration-150 ease-in opacity-50 text-15px focus:outline-none text-brand-dark hover:opacity-100 "
            aria-label={"clear all"}
            onClick={resetCart}
          >
            <Icons.edit className='w-4' />
            <span className="px-1 lg:pr-1">Clear all</span>
          </button>
        )}
      </div>
    </div>

    {!isEmpty ? (
      <Scrollbar className="flex-grow w-full cart-scrollbar ">
        <div className="w-full px-5 md:px-7  h-[calc(100vh_-_420px)]">
          {items?.map((item) => (
            <CartItem item={item} key={item.id}  />
          ))}
        </div>
      </Scrollbar>
    ) : (
      <EmptyCart  />
    )}

    <div className="px-5 pt-5 pb-5 border-t border-border-base md:px-7 md:pt-6 md:pb-6">
      <div className="flex pb-5 md:pb-7">
        <div className="ltr:pr-3 rtl:pl-3">
          <h3 className="mb-2.5">sub Total:</h3>
          <p className="leading-6">
           discount
          </p>
        </div>
        <div className="shrink-0 font-semibold text-base md:text-lg text-brand-dark -mt-0.5 min-w-[80px] ltr:text-right rtl:text-left">
          {cartTotal}
        </div>
      </div>
      <div className="flex flex-col" onClick={()=>globalModal.closeCartState()}>
        <Link
          href={ `/${ROUTES.CHECKOUT}`}
          className={cn(
            'w-full px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded font-semibold text-sm sm:text-15px text-brand-light bg-brand focus:outline-none transition duration-300 hover:bg-opacity-90',
            {
              'cursor-not-allowed !text-brand-dark !text-opacity-25 !bg-[#EEEEEE] hover:!bg-[#EEEEEE]':
                isEmpty,
            }
          )}
        >
          <span className="py-0.5">Checkout</span>
        </Link>
      </div>
    </div>
  </div>
  );
};

export default CartSidebarView;
