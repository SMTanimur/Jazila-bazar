/* eslint-disable @next/next/no-img-element */

import CategoriesCarousel from "@/modules/categories/category-carousel";
import PromotionalBannerCarousel from "@/modules/home/promotional-banner-carousel";
import Image from "next/image";
import Link from "next/link";
import OurProductsSection from "./screens/ourProductsSection";
import TopRateProducts from "./screens/TopRateProducts";
import { MultiProgressBar, ProgressBar } from "@/components/ui/progress";
export default async function IndexPage() {
  return (
    <div className="py-3">
      <Image
        width={1920}
        height={500}
        src="https://res.cloudinary.com/smtanimur/image/upload/v1700110058/samples/fruite-Banner_c2mrgn.jpg"
        alt="Fruite Banner"
        className="w-full h-auto "
      />
      <div className="py-10 container">
        <div className="overflow-hidden">
          <PromotionalBannerCarousel />
        </div>
      </div>

      <div className="py-5 md:py-10  container">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold font-sans ">Shop By Categories</h1>
          <Link href={"/products"}>All Categories</Link>
        </div>

        <div className="py-4  border-t-2 mt-3">
          <CategoriesCarousel />
        </div>
      </div>
      <OurProductsSection />
      <TopRateProducts/>
      <div className=" ">
      
          <div className="space-y-3 w-[400px]">
          <ProgressBar value={10} />
          <ProgressBar value={25} color="green" animated />
          <ProgressBar value={50} color="blue" />
          <ProgressBar value={75} color="yellow" animated />
          <ProgressBar value={100} color="orange" />
          </div>
         
         <div className="w-[800px]">
         <MultiProgressBar
            bars={[
              { value: 10 },
              { value: 80, color: "rose", animated: true },
              { value: 20, color: "indigo" },
              { value: 20, color: "rose", animated: true },
            ]}
          />
         </div>
         
        </div>
    </div>
  );
}
