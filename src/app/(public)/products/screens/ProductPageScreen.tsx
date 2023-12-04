"use client";
import ProductCard from "@/components/cards/ProductCard";
import ProductCardLoader from "@/components/skelaton/product-card-loader";
import { useGetProductsQuery } from "@/hooks/api/product/useGetProducts";
import useQueryParam from "@/hooks/use-query-params";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
type Props ={
    searchParams:{
        category:string
    }
}
const ProductPageScreen = ({
  searchParams:{category}
}: Props) => {

  

 
  const { data,isLoading } = useGetProductsQuery({
    limit: 10,
    category
  });
  const prodcuts = data?.docs;
  return (
    <React.Fragment>
      <div className="grid grid-cols-5">
        <div className="col-span-1">
         Filter
        </div>
        <div className="col-span-4">
        <section className="w-full">
      <div className="flex items-center ">
        <h1 className="text-3xl font-bold font-sans ">Our Products</h1>
      </div>

      <div className="py-4  border-t-2 mt-3" />
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-7 md:gap-4 2xl:gap-5">
        {isLoading && !prodcuts?.length ? (
          Array.from({ length: prodcuts?.length as number }).map((_, idx) => (
            <ProductCardLoader
              key={`product--key-${idx}`}
              uniqueKey={`product--key-${idx}`}
            />
          ))
        ) : (
          <>
            {data?.docs.map((product) => (
              <ProductCard key={product.slug} {...{ product }} />
            ))}
          </>
        )}
      </div>
    </section>
        </div>

      </div>
    </React.Fragment>
  )
};

export default ProductPageScreen;
