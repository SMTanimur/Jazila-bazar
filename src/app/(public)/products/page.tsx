import Breadcrumb from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import ProductPageScreen from "./screens/ProductPageScreen";
export const metadata: Metadata = {
  title: "Products Page",
};
type Props ={
  searchParams:{}
}
const ProductsPage = async ({searchParams}:Props) => {
  return (
    <div>
      <section className="  h-12 py-2  bg-gray-100 dark:bg-gray-900 flex justify-center items-center ">
        <Breadcrumb />
      </section>
      <div className="container py-5">
        <ProductPageScreen searchParams={searchParams} />
      </div>
    </div>
  );
};

export default ProductsPage;
