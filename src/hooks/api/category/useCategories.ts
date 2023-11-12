import { categoryClient } from "@/services/category.service";
import { CategoryQueryOptions, ICategory, IPaymentInfo, PaginatorInfo } from "@/types";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { useInfiniteQuery } from "@tanstack/react-query";


export function useCategoriesQuery(options?: Partial<CategoryQueryOptions>) {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<PaginatorInfo<ICategory>, Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    ({ queryKey, pageParam }) =>
      categoryClient.getCategories(Object.assign({}, queryKey[1], pageParam)),
    {
      getNextPageParam: ({ page }) => ({ page: page + 1 }),
    }
  );

  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    categories: data?.pages.flatMap((page) => page.docs) ?? [],
    paginatorInfo: data?.pages[0] ?? {},
    isLoading,
    error,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: handleLoadMore,
    hasMore: Boolean(hasNextPage),
  };
}