"use client";
import ProductCard from "@/components/cards/ProductCard";
import { CategoryFilter } from "@/components/shop/category-filter";
import { FilteredItem } from "@/components/shop/filtered-item";
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
      <div className="grid grid-cols-5">
        <div className="pt-1 px-3">
          <div className="block border-b border-gray-300 pb-7 mb-7">
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="font-semibold text-heading text-xl md:text-2xl">
                Filters
              </h2>
              <button
                className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading"
                aria-label="Clear All"
                onClick={() => {
                  push(pathname);
                }}
              >
                Clear alll
              </button>
            </div>
            <div className="flex flex-wrap -m-1">
              {Object.entries(state).map(([key, value]) => {
                if (Array.isArray(value)) {
                  return value.map((item) => (
                    <FilteredItem
                      itemKey={key ? key : " "}
                      key={item}
                      itemValue={item as any}
                      onClick={() => handleArrayUpdate(key, item)}
                    />
                  ));
                } else {
                  return (
                    <FilteredItem
                      itemKey={key ? key : " "}
                      key={key}
                      itemValue={value as any}
                      onClick={() => {
                        clearQueryParam([key]);
                      }}
                    />
                  );
                }
              })}
            </div>
          </div>
          <CategoryFilter />
        </div>
        <div className="col-span-5 md:col-span-4">
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
