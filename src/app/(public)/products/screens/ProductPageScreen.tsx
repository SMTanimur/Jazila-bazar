"use client";
import ProductCard from "@/components/cards/ProductCard";
import { ShopFilters } from "@/components/shop/shop-filter";
import SearchTopBar from "@/components/shop/top-bar";
import ProductCardLoader from "@/components/skelaton/product-card-loader";
import { useGetProductsQuery } from "@/hooks/api/product/useGetProducts";
import React from "react";
type Props = {
  searchParams: {
    category?: string;
    price?: string;
  };
};
const ProductPageScreen = ({ searchParams: { category, price } }: Props) => {


  const { data, isLoading } = useGetProductsQuery({
    limit: 12,
    category,
    price,
  });
  const prodcuts = data?.docs;
  return (
    <React.Fragment>
      <div className="flex pt-8 pb-16 lg:pb-20">
        <div className=" flex-shrink-0 pr-20  hidden lg:block w-96 pt-1 px-3   h-full border-r">
          <ShopFilters />
        </div>
        <div className="w-full pl-6">
          <SearchTopBar />
          <section className="w-full">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 md:gap-4 2xl:gap-5">
              {isLoading && !prodcuts?.length ? (
                Array.from({ length: prodcuts?.length as number }).map(
                  (_, idx) => (
                    <ProductCardLoader
                      key={`product--key-${idx}`}
                      uniqueKey={`product--key-${idx}`}
                    />
                  )
                )
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
  );
};

export default ProductPageScreen;
