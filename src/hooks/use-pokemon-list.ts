import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "usehooks-ts";
import { z } from "zod";

import { updateURLParams } from "~/lib/utils";

const searchParamsSchema = z.object({
  q: z
    .string()
    .nullable()
    .transform((value) => value ?? ""),
  page: z.coerce
    .number()
    .positive()
    .catch(1)
    .nullable()
    .transform((value) => value || 1),
});

export function usePokemonList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { page, q } = searchParamsSchema.parse({
    q: searchParams.get("q"),
    page: searchParams.get("page"),
  });

  const [query, setQuery] = useState(q);
  const debouncedQuery = useDebounce(query, 500);

  function onChangeQuery(e: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = e.target.value;
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete("page");

    updateURLParams({
      currentParams: newSearchParams,
      key: "q",
      value: newQuery,
      condition: !newQuery,
      path: "/",
      router,
    });

    setQuery(newQuery);
  }

  return {
    page,
    query,
    debouncedQuery,
    onChangeQuery,
  };
}
