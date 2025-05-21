import { AxiosRequestConfig } from "axios";

import { api } from "./instance";
import { responseContract } from "./lib";
import { MoviesQueryDto } from "./types";
import { MoviesDtoSchema } from "./contracts";

const defaultMoviesQuery: MoviesQueryDto = {
  s: "game",
  page: "1",
};

export function getMovies(
  config?: AxiosRequestConfig & { params: MoviesQueryDto }
) {
  return api
    .get("", {
      ...config,
      params: { ...defaultMoviesQuery, ...config?.params },
    })
    .then(responseContract(MoviesDtoSchema));
}
