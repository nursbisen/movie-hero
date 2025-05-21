"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { Movies } from "../model/types";
import { movieQueryOptions } from "../api";
import { Card, CardContent, CardDescription } from "@/shared/ui/card";
import Image from "next/image";

export type MoviesGridProps = {
  initialData: Movies;
};

export function MoviesGrid({ initialData }: MoviesGridProps) {
  const searchParams = useSearchParams();

  const { data, error, isLoading } = useQuery({
    ...movieQueryOptions.list({
      search: searchParams.get("search") || undefined,
      page: Number(searchParams.get("page") || 1),
    }),
    initialData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies</p>;

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {data.list?.map((movie) => (
        <Card key={movie.slug}>
          <CardContent>
            <Image
              width={200}
              height={300}
              src={movie.posterUrl}
              role="banner"
              alt=""
            />
            <CardDescription>
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
