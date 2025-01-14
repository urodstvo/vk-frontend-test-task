import { createContext, ReactNode, useContext } from "react";
import { FilterStore, filterStore } from "@/store/filter";

const FilterContext = createContext<FilterStore>(filterStore);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  return <FilterContext.Provider value={filterStore}>{children}</FilterContext.Provider>;
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
