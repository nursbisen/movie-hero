import { z } from "zod";

import {
  MovieDtoSchema,
  MoviesDtoSchema,
  ApiErrorDataDtoSchema,
  MoviesQueryDtoSchema,
} from "./contracts";

export type MovieDto = z.infer<typeof MovieDtoSchema>;
export type MoviesDto = z.infer<typeof MoviesDtoSchema>;
export type MoviesQueryDto = z.infer<typeof MoviesQueryDtoSchema>;

export type ApiErrorDataDto = z.infer<typeof ApiErrorDataDtoSchema>;
