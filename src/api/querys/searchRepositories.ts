import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { searchRepositories } from "../requests/searchRepositories";
import { useEffect } from "react";
import { toast } from "sonner";
import { autorun } from "mobx";
import { resultListStore } from "@/store/list";

type SearchRepositoriesResponse = Awaited<ReturnType<typeof searchRepositories>>;

export const useSearchRepositories = (
  query: string,
  options: { sort: string | null; order: string | null }
) => {
  const queryClient = useQueryClient();
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

  useEffect(() => {
    if (q.error && q.isError) {
      if (q.error.message === "403")
        toast.error("Превышен лимит запросов.", {
          description: "Попробуйте подождать минуту и повторить запрос.",
        });

      if (q.error.message === "429")
        toast.error("Превышен лимит запросов.", {
          description: "Попробуйте подождать несколько минут и повторить запрос.",
        });
    }
  }, [q.error, q.isError]);

  const changedData = q.data
    ?.filter((item) => !resultListStore.deletedIds.has(item.id))
    .map((item) => {
      const editedItem = resultListStore.edited.find((i) => i.id === item.id);
      return editedItem ?? item;
    });

  return {
    list: changedData,
    error: q.error,
    hasNextPage: q.hasNextPage,
    isFetching: q.isFetching || q.isFetchingNextPage || q.isRefetching,
    isError: q.isError,
    isEmpty: !q.data?.length,
    fetchNextPage: q.fetchNextPage,
  };
};
