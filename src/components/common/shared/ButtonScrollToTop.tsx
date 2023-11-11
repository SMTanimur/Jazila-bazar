"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";


const ButtonScrollToTop = () => {
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
  if (!showTopBtn) return null;
  return (
      <Button 
      onClick={goToTop}
      >
        <ChevronUp className='w-5'/>
       </Button>
  );
};
export default ButtonScrollToTop;