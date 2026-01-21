"use client"
import React from 'react'
import AddressGrid from './address-grid'
import { useMe } from '@/hooks/api/user/useMe'
import DeliverySchedule from './schedule';
import PaymentGatewayComponent from './payment-gateway';
import CouponInput from './coupon-input';

const CheckoutLeftSite = () => {
  const {me}=useMe()
  
  return (
    <div className='space-y-6'>
        <div className="w-full space-y-6 bg-gray-100 dark:bg-gray-900 px-4 py-3 rounded-lg">
            <AddressGrid
              userId={me?._id as string}
              className="bg-white dark:bg-gray-900 p-5 shadow-700 md:p-8"
              label={"Address"}
              count={1}
              //@ts-ignore
              addresses={me?.addresses}
             
              type={"address"}
            />
          </div>
          
          <div className='w-full bg-gray-100 dark:bg-gray-950 px-4 py-3 rounded-lg'>
            <DeliverySchedule/>
          </div>

          <div className='w-full bg-gray-100 dark:bg-gray-950 px-4 py-3 rounded-lg'>
            <PaymentGatewayComponent/>
          </div>

          <div className='w-full bg-gray-100 dark:bg-gray-950 px-4 py-3 rounded-lg'>
            <CouponInput/>
          </div>
    </div>
  )
}

export default CheckoutLeftSite