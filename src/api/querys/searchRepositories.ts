import { useInfiniteQuery } from "@tanstack/react-query";
import { searchRepositories } from "../requests/searchRepositories";

export const useSearchRepositories = (
  query: string,
  options: { sort: string | null; order: string | null }
) =>
  useInfiniteQuery({
    queryKey: ["repositories", query, options.order, options.sort],
    queryFn: ({ queryKey, pageParam }) =>
      searchRepositories(queryKey[1] as string, { page: pageParam, per_page: 10, ...options }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => lastPageParam + 1,
    getPreviousPageParam: (firstPage, allPages, lastPageParam) => lastPageParam - 1,
    enabled: query !== "",
  });
