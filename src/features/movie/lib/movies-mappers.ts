import { MoviesDto } from "@/shared/api/types";
import { Movies } from "../model/types";
import { movieMappers } from "./movie-mappers";

function fromDto(dto: MoviesDto): Movies {
  if (dto.Response === "True") {
    return {
      list: dto.Search.map(movieMappers.fromDto),
      total: Number(dto.totalResults),
    };
  } else {
    return {
      list: [],
      total: 0,
    };
  }
}

export const moviesMappers = {
  fromDto,
};
