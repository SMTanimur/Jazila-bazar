"usec client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons'
import StaticMenu from './manu/static-menu'
import { Popover, PopoverContent } from '../ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { useCategoriesQuery } from '@/hooks/api/category/useCategories'
import { useGetCategoriesQuery } from '../../hooks/api/category/useGetCategoriesQuery'
import Link from 'next/link'

const HeaderBottom = () => {
  const [open, setOpen] = useState(false);
  const {data:categories,isLoading}=useGetCategoriesQuery({limit:15})

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };
  return (
    <div className='container flex justify-between items-center mt-6'>
       
       <Popover
       open={open}
       onOpenChange={(open) => setOpen(open)}
       >
      <PopoverTrigger asChild className='duration-600 transition'
      onMouseEnter={() => handleMouseEnter}
      onMouseLeave={() => handleMouseLeave}
  
      >
      <Button className='flex gap-2 items-center'>
        <Icons.category className='w-5'/>
        All Categories
       </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 "
      align='start'
      onMouseEnter={() => handleMouseEnter}
      onMouseLeave={() => handleMouseLeave}
      >
        <div className="">
         {
          categories?.docs.map((category)=>(
            <Link className='flex justify-between items-center py-2 px-4 hover:bg-gray-100'
            href={`/collections?category=${category.slug}`}
            key={category.slug}
            >
              <div className='flex gap-2 items-center'>
                <span></span>
                <span>{category.name}</span>
              </div>
             
            </Link>
          
          ))
         }
        
        </div>
      </PopoverContent>
    </Popover>
       <div className='flex items-center gap-8'>
       <StaticMenu/>
       </div>
       
       <Button variant={'outline'} className='bg-rose-300 text-primary'>
         Deal Today
       </Button>

    </div>
  )
}

export default HeaderBottom