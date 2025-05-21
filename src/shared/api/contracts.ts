import { z } from "zod";

export const ApiErrorDataDtoSchema = z.object({
  Error: z.string(),
  Response: z.literal("False"),
});

export const MovieDtoSchema = z.object({
  Title: z.string(),
  Year: z.string(),
  imdbID: z.string(),
  Type: z.enum(["movie", "series", "game"]),
  Poster: z.string().url().or(z.literal("N/A")),
});

export const MoviesDtoSchema = z.union([
  z.object({
    Search: z.array(MovieDtoSchema),
    totalResults: z.string().regex(/^\d+$/),
    Response: z.literal("True"),
  }),
  ApiErrorDataDtoSchema,
]);

export const MoviesQueryDtoSchema = z
  .object({
    page: z.string().regex(/^\d+$/),
    s: z.string(),
  })
  .partial();
