import { Search as UISearch } from "@vkontakte/vkui";
import { Icon16SearchOutline } from "@vkontakte/icons";
import { useFilterContext } from "./context";
import { observer } from "mobx-react-lite";

import styles from "./filter.module.css";

export const Search = observer(() => {
  const store = useFilterContext();

  return (
    <UISearch
      className={styles.search}
      placeholder="Поиск по репозиториям Github"
      value={store.query}
      onChange={(e) => store.setQuery(e.target.value)}
      before={<Icon16SearchOutline />}
    />
  );
});
