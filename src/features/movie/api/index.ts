import { getMovies } from "@/shared/api/service";
import { queryOptions } from "@tanstack/react-query";

import { FilterQuery } from "../model/types";
import { filterMappers } from "../lib/filter-mappers";
import { moviesMappers } from "../lib/movies-mappers";

export const movieQueryOptions = {
  baseKey: ["movie"],
  list: (query: FilterQuery) =>
    queryOptions({
      queryKey: [...movieQueryOptions.baseKey, "list", query],
      queryFn: async () => {
        const response = await getMovies({
          params: filterMappers.toDto(query),
        });
        const movies = moviesMappers.fromDto(response.data);
        return movies;
      },
    }),
};
