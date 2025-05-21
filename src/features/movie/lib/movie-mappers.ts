import { MovieDto } from "@/shared/api/types";

import { Movie } from "../model/types";
import { PLACEHOLDER_POSTER_URL } from "@/shared/config";

function fromDto(dto: MovieDto): Movie {
  return {
    slug: dto.imdbID,
    title: dto.Title,
    year: dto.Year,
    type: dto.Type,
    posterUrl: dto.Poster === "N/A" ? PLACEHOLDER_POSTER_URL : dto.Poster,
  };
}

// export function toDto(movie: Movie): MovieDto {
//   return {
//     imdbID: movie.slug,
//     Title: movie.title,
//     Year: String(movie.year),
//     Type: movie.type,
//     Poster: movie.posterUrl,
//   };
// }

export const movieMappers = {
  fromDto,
};
