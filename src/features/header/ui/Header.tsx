"use client";

import qs from "qs";
import { useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { SearchField } from "./SearchField";

export const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSearch = useCallback(
    (value: string) => {
      const params = qs.parse(searchParams.toString());

      if (value) {
        params.search = value;
      } else {
        delete params.search;
      }

      const newParams = qs.stringify(params, { encode: true });

      console.log(params);
      console.log(newParams);

      router.push(`?${newParams}`);
    },
    [router, searchParams]
  );

  return (
    <header className="w-full p-5 flex gap-6 justify-between">
      <SearchField initialValue={search} onSearchCommit={handleSearch} />
    </header>
  );
};
