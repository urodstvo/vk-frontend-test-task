import debounce from "lodash.debounce";
import { makeAutoObservable } from "mobx";
export class FilterStore {
  query: string = "";
  sort: string | null = null;
  order: string | null = null;

  constructor() {
    makeAutoObservable(this);

    this.setQuery = debounce(this.setQuery.bind(this), 300);
  }

  setQuery(query: string) {
    this.query = query;
  }

  setSort(sort: string) {
    this.sort = sort;
  }

  setOrder(order: string) {
    this.order = order;
  }
}

export const filterStore = new FilterStore();
