import { observer } from "mobx-react-lite";

import { Button, Spinner } from "@vkontakte/vkui";

import { useSearchRepositories } from "@/api";
import { useFilterContext } from "@/components/filter";
import { RepositoryCard } from "@/components/repository-card";

import styles from "./result.module.css";
import { InfiniteList } from "@/components/infinite-list";

export const ResultList = observer(() => {
  const store = useFilterContext();
  const query = useSearchRepositories(store.query, { sort: store.sort, order: store.order });

  if (store.query.length === 0)
    return (
      <main style={{ paddingTop: 32, paddingBottom: 32 }} className={styles.center}>
        Введите название репозитория для отображения результатов
      </main>
    );

  return (
    <main style={{ paddingTop: 32, paddingBottom: 32 }}>
      {!query.isFetching && query.isEmpty && !query.isError && (
        <div className={styles.center}>Репозитории не найдены</div>
      )}
      {!query.isEmpty && query.list && (
        <InfiniteList
          height={"calc(100vh - 112px)"}
          itemHeight={87}
          gap={16}
          list={query.list}
          itemRenderer={(props) => <RepositoryCard key={props.item.id} {...props.item} />}
          fetchMoreRenderer={({ ref, fn }) => (
            <div className={`${styles.center} ${styles.fetchMore}`} ref={ref}>
              {query.isError || query.error ? (
                <Button onClick={fn}>Загрузить еще</Button>
              ) : (
                <Spinner size="m">Загрузка репозиториев, пожалуйста, подождите...</Spinner>
              )}
            </div>
          )}
          fetchMoreFunction={() => query.fetchNextPage()}
        />
      )}
    </main>
  );
});
