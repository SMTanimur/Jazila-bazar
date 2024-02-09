import { PhoneIcon } from 'lucide-react'
import React from 'react'

const TopBar = () => {
  return (
    <section className='bg-primary py-3'>
     <div className='container flex justify-between items-center'>
        <div className='flex items-center text-xs text-white gap-2'>
          <PhoneIcon className='w-4'/>
          <span>We are available 24/7, Need help?</span>
          <span className='text-primary'>+8801648138404</span>
        </div>
        <div className='flex gap-4'>
          
        </div>
     </div>
    </section>
  )
}

export default TopBar