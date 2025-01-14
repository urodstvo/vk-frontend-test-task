import { IconButton } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import { useFilterContext } from "./context";

import styles from "./filter.module.css";
import { Icon16SortOutline } from "@vkontakte/icons";

export const Order = observer(() => {
  const store = useFilterContext();

  return (
    <IconButton
      onClick={() => store.setOrder(store.order === "asc" ? "desc" : "asc")}
      className={styles.order}
      title="Порядок сортировки"
    >
      <Icon16SortOutline />
    </IconButton>
  );
});
