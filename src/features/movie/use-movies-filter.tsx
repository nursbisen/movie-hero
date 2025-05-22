import { FilterQuery } from "@/shared/domain/movie/types";
import { useQueryState } from "@/shared/lib/hooks/use-query-state";
import { useRef } from "react";

export const useMoviesFilter = () => {
  const prevSearchRef = useRef<string | null>(null);

  return useQueryState<FilterQuery>((params) => {
    const newSearch = params.get("search");
    let page =
      Number(params.get("page")) > 0 ? Number(params.get("page")) : undefined;

    if (prevSearchRef.current !== newSearch && page) {
      page = 1;
      prevSearchRef.current = newSearch;
    }

    return {
      search: newSearch || undefined,
      page,
    };
  });
};
