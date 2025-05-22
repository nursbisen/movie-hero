"use client";

import { useCallback } from "react";

import { useMoviesFilter } from "@/features/movie/use-movies-filter";

import { SearchField } from "./search-field";

export const Header = () => {
  const [moviesFilter, setMoviesFilter] = useMoviesFilter();
  const handleSearch = useCallback(
    (value: string) => {
      setMoviesFilter((prev) => ({
        ...prev,
        search: value,
      }));
    },
    [setMoviesFilter]
  );

  return (
    <header className="w-full p-5 flex gap-2 justify-between items-center">
      <h1 className="max-sm:hidden font-semibold text-lg text-nowrap">
        Movie Hero
      </h1>
      <SearchField
        className="max-w-150"
        initialValue={moviesFilter.search}
        onSearchCommit={handleSearch}
      />
      <div />
    </header>
  );
};
