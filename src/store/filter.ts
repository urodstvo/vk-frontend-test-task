import debounce from "lodash.debounce";
import { makeAutoObservable } from "mobx";
export class FilterStore {
  query: string = "";
  sort: "stars" | "updated" | "forks" | null = null;
  order: "asc" | "desc" = "desc";

  constructor() {
    makeAutoObservable(this);

    this.setQuery = debounce(this.setQuery.bind(this), 300);
  }

  setQuery(query: string) {
    this.query = query;
  }

  setSort(sort: "stars" | "updated" | "forks") {
    this.sort = sort;
  }

  setOrder(order: "asc" | "desc") {
    this.order = order;
  }
}

export const filterStore = new FilterStore();
