"use client"
import React from 'react'
import AddressGrid from './address-grid'
import { useMe } from '@/hooks/api/user/useMe'

const CheckoutLeftSite = () => {
  const {me}=useMe()
  
  return (
    <div className='bg-gray-100 px-4 py-3 rounded-lg'>
        <div className="w-full space-y-6 ">
            <AddressGrid
              userId={me?._id as string}
              className="bg-white p-5 shadow-700 md:p-8"
              label={"Address"}
              count={1}
              //@ts-ignore
              addresses={me?.addresses}
             
              type={"address"}
            />
            
            {/* <ScheduleGrid
              className="bg-light p-5 shadow-700 md:p-8"
              label={t('text-delivery-schedule')}
              count={4}
            /> */}
          </div>
        
    </div>
  )
}

export default CheckoutLeftSite