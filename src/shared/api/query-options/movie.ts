import { getMovies } from "@/shared/api/service";
import { queryOptions } from "@tanstack/react-query";

import { FilterQuery } from "@/shared/domain/movie/types";
import {
  mapFilterToDto,
  mapMoviesFromDto,
} from "@/shared/domain/movie/mappers";

export const movieQueryOptions = {
  baseKey: ["movie"],
  listKey: () => [...movieQueryOptions.baseKey, "list"],
  list: (query: FilterQuery) =>
    queryOptions({
      queryKey: [...movieQueryOptions.listKey(), query],
      queryFn: async () => {
        const response = await getMovies({
          params: mapFilterToDto(query),
        });
        const movies = mapMoviesFromDto(response.data);
        return movies;
      },
    }),
};
