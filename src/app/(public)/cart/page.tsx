
import Breadcrumb from '@/components/ui/breadcrumb'
import React from 'react'
import CartItemsDetails from './screens/cart-items-details'
import ClientOnly from '@/components/common/shared/ClientOnly'

const CartPage = async() => {
  
  return (
    <div className=''>
      <div className='py-3 bg-gray-100 dark:bg-gray-800'>
      <Breadcrumb/>
      </div>
      <ClientOnly>
    <CartItemsDetails/>
    </ClientOnly>
    </div>
  )
}

export default CartPage