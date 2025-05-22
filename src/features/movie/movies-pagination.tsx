"use client";
import { useSearchParams } from "next/navigation";
import qs from "qs";
import { useQuery } from "@tanstack/react-query";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";
import { Movies } from "@/shared/domain/movie/types";
import { movieQueryOptions } from "@/shared/api/query-options/movie";

import { useMoviesFilter } from "./use-movies-filter";

const PER_PAGE = 10;

export type MoviesPaginationProps = {
  initialData: Movies;
};

export const MoviesPagination = ({ initialData }: MoviesPaginationProps) => {
  const searchParams = useSearchParams();
  const [moviesFilter] = useMoviesFilter();
  const { data } = useQuery({
    ...movieQueryOptions.list(moviesFilter),
    initialData,
  });

  if (!data?.total) {
    return null;
  }

  const currentPage = moviesFilter.page || 0;
  const totalPages = Math.ceil(data.total / PER_PAGE);

  const createPageUrl = (page: number) => {
    const queryObject = qs.parse(searchParams.toString());
    const newQuery = qs.stringify(
      { ...queryObject, page },
      { addQueryPrefix: true }
    );
    return newQuery;
  };

  return (
    <Pagination className="relative w-full overflow-auto">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            isDisabled={currentPage <= 1}
            href={createPageUrl(currentPage - 1)}
          />
        </PaginationItem>
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink href={createPageUrl(1)}>{1}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage - 1 > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={createPageUrl(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive href={createPageUrl(currentPage)}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {totalPages - currentPage > 0 && (
          <PaginationItem>
            <PaginationLink href={createPageUrl(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {totalPages - currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {totalPages - currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={createPageUrl(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            isDisabled={currentPage >= totalPages}
            href={createPageUrl(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
