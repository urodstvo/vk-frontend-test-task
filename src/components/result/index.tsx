import { observer } from "mobx-react-lite";
import { useFilterContext } from "@/components/filter";
import { useSearchRepositories } from "@/api";
import { RepositoryCard } from "../repository-card";
import { CardGrid } from "@vkontakte/vkui";

export const ResultList = observer(() => {
  const store = useFilterContext();
  const query = useSearchRepositories(store.query, { sort: store.sort, order: store.order });

  return (
    <main style={{ paddingTop: 32, paddingBottom: 32 }}>
      <CardGrid size="l">
        {query.data?.pages?.map((page) =>
          page.items.map((item) => <RepositoryCard key={item.id} {...item} />)
        )}
      </CardGrid>
    </main>
  );
});
