import React from 'react'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons'
import StaticMenu from './manu/static-menu'

const HeaderBottom = () => {
  return (
    <div className='container flex justify-between items-center mt-6'>
       <Button className='flex gap-2 items-center'>
        <Icons.category className='w-5'/>
        All Categories
       </Button>
       <div className='flex items-center gap-4'>
       <StaticMenu/>
       </div>
       
       <Button variant={'outline'} className='bg-rose-300 text-primary'>
         Deal Today
       </Button>

    </div>
  )
}

export default HeaderBottom