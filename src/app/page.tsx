import { MoviesGrid, MoviesPagination } from "@/features/movie";
import { getMovies } from "@/shared/api/service";
import { FilterQuery } from "@/shared/domain/movie/types";
import {
  mapMoviesFromDto,
  mapFilterToDto,
} from "@/shared/domain/movie/mappers";

export default async function MoviesPage({
  searchParams,
}: {
  searchParams?: FilterQuery;
}) {
  const response = await getMovies(
    searchParams
      ? {
          params: mapFilterToDto(searchParams),
        }
      : undefined
  );
  const initialMovies = mapMoviesFromDto(response.data);

  return (
    <main className="grow max-w-300 mx-auto p-5 flex flex-col gap-5">
      <MoviesGrid initialData={initialMovies} />
      <MoviesPagination initialData={initialMovies} />
    </main>
  );
}
