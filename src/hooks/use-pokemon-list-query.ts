import { useSuspenseQuery } from "@tanstack/react-query";

import { queryKeys } from "~/lib/react-query";
import { getAllPokemon } from "~/services/pokemon";

type UsePokemonListQueryProps = {
  page: number;
  query: string;
};

export function usePokemonListQuery({ query, page }: UsePokemonListQueryProps) {
  const queryKey = queryKeys.pokemonSearch(query, page);
  const { data: pokemonList, ...rest } = useSuspenseQuery({
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

  return {
    queryKey,
    pokemonList,
    totalPages,
    ...rest,
  };
}
