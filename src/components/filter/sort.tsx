import { Select } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import { useFilterContext } from "./context";

import styles from "./filter.module.css";

const sortOptions = [
  {
    label: "Количество звезд",
    value: "stars",
  },
];

export const Sort = observer(() => {
  const store = useFilterContext();

  return (
    <Select
      className={styles.sort}
      options={sortOptions}
      value={store.sort}
      onChange={(_, v) => store.setSort(v as string)}
      placeholder="Сортировать по ..."
    />
  );
});
