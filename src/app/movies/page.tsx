import { filterMappers } from "@/features/movie/lib/filter-mappers";
import { moviesMappers } from "@/features/movie/lib/movies-mappers";
import { FilterQuery } from "@/features/movie/model/types";
import { MoviesGrid } from "@/features/movie/ui/MoviesList";
import { getMovies } from "@/shared/api/service";

export default async function MoviesPage({
  searchParams,
}: {
  searchParams?: FilterQuery;
}) {
  const response = await getMovies(
    searchParams
      ? {
          params: filterMappers.toDto(searchParams),
        }
      : undefined
  );
  const initialMovies = moviesMappers.fromDto(response.data);

  return (
    <main className="max-w-300 mx-auto">
      <MoviesGrid initialData={initialMovies} />
    </main>
  );
}
