import { z } from "zod";

export const MovieSchema = z.object({
  slug: z.string(),
  title: z.string(),
  year: z.string(),
  type: z.enum(["movie", "series", "game"]),
  posterUrl: z.string().url(),
});

export const MoviesSchema = z.object({
  list: z.array(MovieSchema),
  total: z.number(),
});

export const FilterQuerySchema = z.object({
  page: z.number().optional(),
  search: z.string().optional(),
});
