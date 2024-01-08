"use client";

import { Suspense, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "usehooks-ts";
import { z } from "zod";

import { queryKeys } from "~/lib/react-query";
import { updateURLParams } from "~/lib/utils";
import { getAllPokemon } from "~/services/pokemon";

import { PokemonList } from "./pokemon-list";
import { PokemonListSkeleton } from "./pokemon-list-skeleton";
import { PokemonPagination } from "./pokemon-pagination";
import { PokemonPaginationSkeleton } from "./pokemon-pagination-skeleton";
import { PokemonSearch } from "./pokemon-search";

export const searchParamsSchema = z.object({
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

export function PokemonSection() {
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

  return (
    <section
      className="container space-y-6 pb-12 pt-16 motion-safe:animate-fade-up motion-safe:animate-delay-700 lg:py-28"
      id="list"
    >
      <PokemonSearch query={query} onChange={onChangeQuery} />
      <Suspense fallback={<PokemonSectionContentSkeleton />}>
        <PokemonSectionContent page={page} query={debouncedQuery} />
      </Suspense>
    </section>
  );
}

type PokemonSectionContentProps = {
  query: string;
  page: number;
};

export function PokemonSectionContent({
  query,
  page,
}: PokemonSectionContentProps) {
  const queryKey = queryKeys.pokemonSearch(query, page);
  const { data: pokemonList } = useSuspenseQuery({
    queryKey,
    queryFn: async () =>
      await getAllPokemon({
        page,
        query,
      }),
  });

  const totalPages = Math.ceil(
    (pokemonList?.aggregate.aggregate?.count ?? 1) / 9
  );

  return (
    <>
      <PokemonList data={pokemonList} key={JSON.stringify(queryKey)} />
      <PokemonPagination page={page} totalPages={totalPages} />
    </>
  );
}

function PokemonSectionContentSkeleton() {
  return (
    <>
      <PokemonListSkeleton />
      <PokemonPaginationSkeleton />
    </>
  );
}
