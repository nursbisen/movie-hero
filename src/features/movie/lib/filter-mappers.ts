import { MoviesQueryDto } from "@/shared/api/types";

import { FilterQuery } from "../model/types";

export function toDto(data?: FilterQuery): MoviesQueryDto {
  return {
    s: data?.search,
    page: Number.isNaN(data?.page) ? undefined : data?.page?.toString(),
  };
}

export const filterMappers = {
  toDto,
};
