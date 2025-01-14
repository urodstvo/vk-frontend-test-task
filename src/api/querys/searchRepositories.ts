import { useInfiniteQuery } from "@tanstack/react-query";
import { searchRepositories } from "../requests/searchRepositories";

type SearchRepositoriesResponse = Awaited<ReturnType<typeof searchRepositories>>;

export const useSearchRepositories = (
  query: string,
  options: { sort: string | null; order: string | null }
) => {
  const q = useInfiniteQuery({
    queryKey: ["repositories", query, options.order, options.sort],
    queryFn: ({ queryKey, pageParam }) =>
      searchRepositories(queryKey[1] as string, { page: pageParam, per_page: 10, ...options }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => lastPageParam + 1,
    getPreviousPageParam: (firstPage, allPages, lastPageParam) => lastPageParam - 1,
    enabled: query.length > 0,
    select: (data) =>
      data.pages.reduce(
        (acc, page) => acc.concat(page.items),
        [] as SearchRepositoriesResponse["items"]
      ),
    staleTime: 60000,
  });

  return {
    list: q.data,
    error: q.error,
    hasNextPage: q.hasNextPage,
    isFetching: q.isFetching || q.isFetchingNextPage || q.isRefetching,
    isError: q.isError,
    isEmpty: !q.data?.length,
    fetchNextPage: q.fetchNextPage,
  };
};
