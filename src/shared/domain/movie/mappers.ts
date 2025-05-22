import { PLACEHOLDER_POSTER_URL } from "@/shared/config";
import { MovieDto, MoviesDto, MoviesQueryDto } from "@/shared/api/types";

import { FilterQuery, Movie, Movies } from "./types";

export function mapFilterToDto(data?: FilterQuery): MoviesQueryDto {
  return {
    s: data?.search,
    page: Number.isNaN(data?.page) ? undefined : data?.page?.toString(),
  };
}

export function mapMovieFromDto(dto: MovieDto): Movie {
  return {
    slug: dto.imdbID,
    title: dto.Title,
    year: dto.Year,
    type: dto.Type,
    posterUrl: dto.Poster === "N/A" ? PLACEHOLDER_POSTER_URL : dto.Poster,
  };
}

export function mapMoviesFromDto(dto: MoviesDto): Movies {
  if (dto.Response === "True") {
    return {
      list: dto.Search.map(mapMovieFromDto),
      total: Number(dto.totalResults),
    };
  } else {
    return {
      list: [],
      total: 0,
    };
  }
}
