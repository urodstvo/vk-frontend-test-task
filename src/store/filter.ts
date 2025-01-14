import { makeAutoObservable } from "mobx";
export class FilterStore {
  query: string = "";
  sort: string | null = null;
  order: string | null = null;

  constructor() {
    makeAutoObservable(this);
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
