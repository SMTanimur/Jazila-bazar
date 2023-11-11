"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Icons } from '../ui/icons'

const BottomFixedSection = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const checkShowButtonScrollToTop = () => {
      if (window.scrollY > 10) {
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
    <div className='fixed bottom-10 right-16 flex gap-6 '>
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
          <Button
         
          >
            <Icons.settings className='w-5'/>
          </Button>
       </div>
       
       
       </div>

       

    </div>
  )
}

export default BottomFixedSection