import { Order } from "./order";
import { Search } from "./search";
import { Sort } from "./sort";

import styles from "./filter.module.css";

export const Filter = () => {
  return (
    <header>
      <form className={styles.form}>
        <Search />
        <Sort />
        <Order />
      </form>
    </header>
  );
};

export { FilterProvider, useFilterContext } from "./context";
