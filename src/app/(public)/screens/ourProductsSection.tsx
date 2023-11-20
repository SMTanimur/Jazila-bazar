"use client";
import ProductCard from "@/components/cards/ProductCard";
import { useGetProductsQuery } from "@/hooks/api/product/useGetProducts";

const OurProductsSection = () => {
  const { data, isLoading } = useGetProductsQuery({
    limit: 15,
  });
  return (
    <section className="py-5 md:py-10  container">
      <div className="flex items-center ">
        <h1 className="text-3xl font-bold font-sans ">Our Products</h1>
      </div>

      <div className="py-4  border-t-2 mt-3" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-7 md:gap-4 2xl:gap-5">
        {data?.docs.map((product) => (
          <ProductCard key={product.slug} {...{ product }} />
        ))}
      </div>
    </section>
  );
};

export default OurProductsSection;
