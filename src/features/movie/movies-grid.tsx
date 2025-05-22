"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { Spinner } from "@/shared/ui/spinner";
import { Movies } from "@/shared/domain/movie/types";
import { movieQueryOptions } from "@/shared/api/query-options/movie";
import { Card, CardContent, CardDescription } from "@/shared/ui/card";

import { useMoviesFilter } from "./use-movies-filter";

export type MoviesGridProps = {
  initialData: Movies;
};

export function MoviesGrid({ initialData }: MoviesGridProps) {
  const [moviesFilter] = useMoviesFilter();
  const { data, isFetching } = useQuery({
    ...movieQueryOptions.list(moviesFilter),
    initialData,
  });

  if (isFetching)
    return (
      <div className="grow w-full flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (!data.list.length) {
    return <div className="grow h-full text-center">Not Found</div>;
  }

  return (
    <ul className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {data.list?.map((movie) => (
        <Card key={movie.slug}>
          <CardContent className="flex flex-col gap-3">
            <Image
              className="w-full h-70 rounded-sm"
              width={200}
              height={300}
              src={movie.posterUrl}
              role="banner"
              alt=""
            />
            <CardDescription className="flex flex-col gap-1">
              <div>Title: {movie.title}</div>
              <div>Type: {movie.type}</div>
              <div>Year: {movie.year}</div>
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </ul>
  );
}
