"use client";
import ProductCard from "@/components/cards/ProductCard";
import { ProductsFilters } from "@/components/shop/products-filter";
import SearchTopBar from "@/components/shop/top-bar";
import ProductFeedLoader from "@/components/skelaton/product-feed-loader";
import Breadcrumb from "@/components/ui/breadcrumb";
import Pagination from "@/components/ui/pagination";
import { useGetProductsQuery } from "@/hooks/api/product/useGetProducts";
import { IPaginatorInfo } from "@/types";
import { useState } from "react";

type Props = {
  searchParams: {
    category?: string;
    price?: string;
  };
};
const ProductsPage = ({ searchParams: { category, price } }: Props) => {
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
  };
  const products = data?.docs;
  return (
    <div>
      <section className="  h-12 py-10  bg-gray-100 dark:bg-gray-900 flex justify-center items-center ">
        <Breadcrumb />
      </section>
      <div className="container py-5">
        <div className="flex pt-8 pb-16 lg:pb-20">
          <div className=" flex-shrink-0 pr-20  hidden lg:block w-96 pt-1 px-3   h-full border-r">
            <ProductsFilters/>
          </div>
          <div className="w-full pl-6">
            <SearchTopBar />
            <section className="w-full">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 md:gap-4 2xl:gap-5">
                {isLoading && !products?.length ? (
                  <ProductFeedLoader limit={12} uniqueKey="search-product" />
                ) : (
                  <>
                    {data?.docs.map((product) => (
                      <ProductCard key={product.slug} {...{ product }} />
                    ))}
                  </>
                )}
              </div>

              {paginateInfo && (
                <div className="flex items-center justify-between border-t border-border border-opacity-70 mt-6 py-4">
                  {!!paginateInfo?.totalDocs && (
                    <div className="text-xs text-body text-opacity-70">
                      Page {paginateInfo?.page} of{" "}
                      {Math.ceil(paginateInfo?.totalPages / paginateInfo?.page)}
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
      </div>
    </div>
  );
};

export default ProductsPage;
