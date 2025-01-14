import { observer } from "mobx-react-lite";
import { useFilterContext } from "@/components/filter";
import { useSearchRepositories } from "@/api";
import { RepositoryCard } from "../repository-card";
import { Button, CardGrid, Spinner } from "@vkontakte/vkui";
import { useInView } from "react-intersection-observer";

import styles from "./result.module.css";
import { useEffect } from "react";

export const ResultList = observer(() => {
  const { ref, inView } = useInView({ threshold: 0 });

  const store = useFilterContext();
  const query = useSearchRepositories(store.query, { sort: store.sort, order: store.order });

  useEffect(() => {
    inView && query.hasNextPage && query.fetchNextPage();
  }, [inView, query.hasNextPage]);

  if (store.query.length === 0)
    return (
      <main style={{ paddingTop: 32, paddingBottom: 32 }} className={styles.center}>
        Введите название репозитория для отображения результатов
      </main>
    );

  return (
    <main style={{ paddingTop: 32, paddingBottom: 32 }}>
      <CardGrid size="l">
        {!query.isFetching && query.isEmpty && !query.isError && (
          <div className={styles.center}>Репозитории не найдены</div>
        )}
        {!query.isEmpty &&
          query.list?.filter(Boolean).map((repo) => <RepositoryCard key={repo.id} {...repo} />)}
      </CardGrid>

      <div className={`${styles.center} ${styles.fetchMore}`} ref={ref}>
        {query.isError || query.error ? (
          <Button onClick={() => query.fetchNextPage()}>Загрузить еще</Button>
        ) : (
          <Spinner size="m">Загрузка репозиториев, пожалуйста, подождите...</Spinner>
        )}
      </div>
    </main>
  );
});
