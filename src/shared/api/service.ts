import { AxiosRequestConfig } from "axios";

import { api } from "./instance";
import { responseContract } from "./lib";
import { MoviesQueryDto } from "./types";
import { MoviesDtoSchema } from "./contracts";

export function getMovies(
  config?: AxiosRequestConfig & { params: MoviesQueryDto }
) {
  return api.get("", config).then(responseContract(MoviesDtoSchema));
}
