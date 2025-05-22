import { z } from "zod";

import { FilterQuerySchema, MovieSchema, MoviesSchema } from "./contracts";

export type Movie = z.infer<typeof MovieSchema>;
export type Movies = z.infer<typeof MoviesSchema>;
export type FilterQuery = z.infer<typeof FilterQuerySchema>;
