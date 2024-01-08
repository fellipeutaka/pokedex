"use client";

import { Suspense } from "react";

import { usePokemonList } from "~/hooks/use-pokemon-list";
import { usePokemonListQuery } from "~/hooks/use-pokemon-list-query";

import { PokemonList } from "./pokemon-list";
import { PokemonListSkeleton } from "./pokemon-list-skeleton";
import { PokemonPagination } from "./pokemon-pagination";
import { PokemonPaginationSkeleton } from "./pokemon-pagination-skeleton";
import { PokemonSearch } from "./pokemon-search";

export function PokemonSection() {
  const { query, onChangeQuery, page, debouncedQuery } = usePokemonList();

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
  const { pokemonList, queryKey, totalPages } = usePokemonListQuery({
    query,
    page,
  });

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
