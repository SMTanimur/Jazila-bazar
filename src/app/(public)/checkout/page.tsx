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
    </div>
  );
};

export default CheckoutPage;
