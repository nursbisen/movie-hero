import qs from "qs";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useQueryState<T extends Record<string, unknown>>(
  parser: (params: URLSearchParams) => T
): [T, (value: T | ((prev: T) => T)) => void] {
  const router = useRouter();
  const searchParams = useSearchParams();

  const state = parser(searchParams);

  const setState = useCallback(
    (value: T | ((prev: T) => T)) => {
      const prev = parser(searchParams);
      const next = typeof value === "function" ? value(prev) : value;

      const merged = {
        ...qs.parse(searchParams.toString()),
        ...next,
      };

      Object.keys(merged).forEach((key) => {
        if (
          merged[key] === undefined ||
          merged[key] === null ||
          merged[key] === ""
        ) {
          delete merged[key];
        }
      });

      const newQuery = qs.stringify(merged, { encode: true });
      router.push(`?${newQuery}`);
    },
    [router, searchParams, parser]
  );

  return [state, setState];
}
