
import Breadcrumb from "@/components/ui/breadcrumb";
import CheckoutLeftSite from "@/modules/checkout/CheckoutLeftSite";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};
const CheckoutPage = async () => {
  return (
    <div>
      <section className="  h-12 py-10  bg-gray-100 dark:bg-gray-900 flex justify-center items-center ">
        <Breadcrumb />
      </section>

      <div className="grid grid-cols-3 mt-6 gap-8 container"> 
         <div className=" col-span-3 md:col-span-2 ">
            <CheckoutLeftSite/>
         </div>
         <div className="col-span-3 md:col-span-1">
            <div className="bg-gray-100 px-4 py-3 rounded-lg">
              Order Summary
            </div>  
         </div>
      </div>
      
    </div>
  );
};

export default CheckoutPage;
