import Breadcrumb from "@/components/ui/breadcrumb";
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

      <div className="grid grid-cols-3"> 

      </div>
      
    </div>
  );
};

export default CheckoutPage;
