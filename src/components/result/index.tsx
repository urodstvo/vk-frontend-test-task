import { observer } from "mobx-react-lite";
import { useFilterContext } from "@/components/filter";
import { useSearchRepositories } from "@/api";
import { RepositoryCard } from "../repository-card";
import { Button, CardGrid, Spinner } from "@vkontakte/vkui";

import styles from "./result.module.css";
import { useEffect, useRef, useState } from "react";

export const ResultList = observer(() => {
  const fetchMoreRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entities) => {
        const target = entities[0];
        setInView(target.isIntersecting);
      },
      { threshold: 0.0 }
    );

    if (fetchMoreRef.current) observer.observe(fetchMoreRef.current);
  }, []);

  const store = useFilterContext();
  const query = useSearchRepositories(store.query, { sort: store.sort, order: store.order });

  useEffect(() => {
    inView && query.hasNextPage && !query.isError && query.fetchNextPage();
  }, [inView, query.hasNextPage, query.isError]);

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

      <div className={`${styles.center} ${styles.fetchMore}`} ref={fetchMoreRef}>
        {query.isError || query.error ? (
          <Button onClick={() => query.fetchNextPage()}>Загрузить еще</Button>
        ) : (
          <Spinner size="m">Загрузка репозиториев, пожалуйста, подождите...</Spinner>
        )}
      </div>
    </main>
  );
});
