"use client";
import { useState } from "react";

import { Input } from "@/shared/ui/input";
import { useDebouncedCallback } from "@/shared/lib/hooks/use-debounced-callback";

const SEARCH_DELAY = 500; //ms

export type SearchFieldProps = {
  className?: string;
  initialValue?: string;
  onSearchCommit: (value: string) => void;
};

export const SearchField = ({
  className,
  initialValue,
  onSearchCommit,
}: SearchFieldProps) => {
  const [value, setValue] = useState(initialValue);
  const debouncedSearch = useDebouncedCallback(onSearchCommit, SEARCH_DELAY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  return (
    <Input
      className={className}
      placeholder="Search..."
      value={value}
      onChange={handleChange}
    />
  );
};
