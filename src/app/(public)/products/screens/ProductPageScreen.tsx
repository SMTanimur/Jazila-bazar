"use client";
import ProductCard from "@/components/cards/ProductCard";
import { CategoryFilter } from "@/components/shop/category-filter";
import { FilteredItem } from "@/components/shop/filtered-item";
import { ShopFilters } from "@/components/shop/shop-filter";
import SearchTopBar from "@/components/shop/top-bar";
import ProductCardLoader from "@/components/skelaton/product-card-loader";
import { useGetProductsQuery } from "@/hooks/api/product/useGetProducts";
import useQueryParam from "@/hooks/use-query-params";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
type Props = {
  searchParams: {
    category: string;
  };
};
const ProductPageScreen = ({ searchParams: { category } }: Props) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { clearQueryParam, updateQueryparams } = useQueryParam(pathname ?? "/");
  const [state, setState] = useState({});

  useEffect(() => {
    setState({});
    searchParams?.forEach((value, key) => {
      if (value.includes(",")) {
        setState((prev) => {
          return { ...prev, [key]: value.split(",") };
        });
      } else {
        setState((prev) => {
          return { ...prev, [key]: value };
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function handleArrayUpdate(key: string, item: string) {
    let o = searchParams?.get(key)?.split(",");
    if (o?.includes(item)) {
      updateQueryparams(key, o.filter((i) => i !== item).join(","));
    }
  }
  const { data, isLoading } = useGetProductsQuery({
    limit: 12,
    category,
  });
  const prodcuts = data?.docs;
  return (
    <React.Fragment>
      <div className="flex pt-8 pb-16 lg:pb-20">
        <div className=" flex-shrink-0 pr-20  hidden lg:block w-96 pt-1 px-3   h-full border-r">
        <ShopFilters/>
        </div>
        <div className="w-full pl-3">
        <SearchTopBar />
          <section className="w-full">
            <div className="flex items-center ">
              <h1 className="text-3xl font-bold font-sans ">Our Products</h1>
            </div>

            <div className="py-4  border-t-2 mt-3" />
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
