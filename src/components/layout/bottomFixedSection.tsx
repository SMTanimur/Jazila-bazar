"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ChevronUp } from 'lucide-react'
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import { cn } from '@/lib/utils'
import { Icons } from '../ui/icons'
import { useTheme } from 'next-themes';

const BottomFixedSection = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, theme } = useTheme()
  useEffect(() => {
    const checkShowButtonScrollToTop = () => {
      if (window.scrollY > 200) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", checkShowButtonScrollToTop);
    return () => window.removeEventListener("scroll", checkShowButtonScrollToTop);
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
    <div className='fixed bottom-14 right-6 sm:bottom-10 sm:right-14 flex gap-6 '>
       <Button className={cn('uppercase rounded-lg',!showTopBtn && 'mr-[52px]')} >
        Compare (3)
       </Button>

       <div className=' relative flex-col  gap-4'>
          <Button 
         
          className={cn( 'flex justify-center items-center', showTopBtn ? 'block' : 'hidden') }
        onClick={goToTop}
      >
        <ChevronUp className='w-5 text-center'/>
       </Button>
      

<div className={cn(showTopBtn ? 'absolute bottom-14 right-0' : 'absolute bottom-0 right-0 ')}>

<Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}

>
        <PopoverTrigger
         
        >
        {
            isOpen ? (
              <Button
          
           
          >
            <Icons.close className='w-5'/>
          </Button>
            ) : (
              <Button  
            
          >
            <Icons.settings className='w-5'/>
          </Button>
            )
          }
        </PopoverTrigger>
        <PopoverContent className='min-w-[300px] bg-gray-50 dark:bg-gray-900 rounded-md p-6 '>
          <h5  className='mb-5'>Theme</h5>
          <div className="flex justify-between gap-6 items-center">
        <Button
        className={cn(theme === "dark" ? 'bg-primary text-white' : 'bg-gray-200 text-primary hover:text-white')}
        onClick={() => setTheme("dark")}
    >
      Dark
    </Button>
    <Button
    className={cn(theme === "light" ? 'bg-primary text-white' : 'bg-gray-200 text-primary hover:text-white')}
        onClick={() => setTheme("light")}
    >
      Light
    </Button>
          </div>
        </PopoverContent>
      </Popover>
          

       </div>
       
       
       </div>

       

    </div>
  )
}

export default BottomFixedSection