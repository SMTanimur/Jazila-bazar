"use client";
import ProductCard from "@/components/cards/ProductCard";
import { ShopFilters } from "@/components/shop/shop-filter";
import SearchTopBar from "@/components/shop/top-bar";
import ProductCardLoader from "@/components/skelaton/product-card-loader";
import Pagination from "@/components/ui/pagination";
import { useGetProductsQuery } from "@/hooks/api/product/useGetProducts";
import { IPaginatorInfo } from "@/types";
import React, { useState } from "react";
type Props = {
  searchParams: {
    category?: string;
    price?: string;
  };
};
const ProductPageScreen = ({ searchParams: { category, price } }: Props) => {

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetProductsQuery({
    limit: 12,
    page,
    category,
    price,
  });
  function onPagination(current: number) {
    setPage(current);
  }
  const paginateInfo: IPaginatorInfo = {
    hasNextPage: data?.hasNextPage!,
    hasPrevPage: data?.hasPrevPage!,
    limit: data?.limit!,
    nextPage: data?.nextPage!,
    page: data?.page!,
    pagingCounter: data?.pagingCounter!,
    prevPage: data?.prevPage!,
    totalDocs: data?.totalDocs!,
    totalPages: data?.totalPages!,
  }
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
                    
                      {paginateInfo && (
                        <div className="flex items-center justify-between border-t border-border border-opacity-70 py-4">
                          {!!paginateInfo?.totalDocs && (
                            <div className="text-xs text-body text-opacity-70">
                              Page {paginateInfo?.page} of{" "}
                              {Math.ceil(
                                paginateInfo?.totalPages / paginateInfo?.page
                              )}
                            </div>
                          )}

                          {!!paginateInfo?.totalDocs && (
                            <div className="mb-2 flex items-center">
                              <Pagination
                                total={paginateInfo?.totalDocs}
                                current={paginateInfo?.pagingCounter}
                                pageSize={paginateInfo?.limit as number}
                                onChange={onPagination}
                              />
                            </div>
                          )}
                        </div>
                      )}
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductPageScreen;
