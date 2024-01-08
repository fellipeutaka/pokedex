import request from "graphql-request";

import type { PokemonQuery } from "~/graphql/gql/graphql";
import { PokemonQueryDocument } from "~/graphql/queries/pokemon";
import { PokemonListQueryDocument } from "~/graphql/queries/pokemon-list";

const baseUrl = "https://beta.pokeapi.co/graphql/v1beta";

type GetAllPokemonProps = {
  page: number;
  query: string | null;
};

export async function getAllPokemon({ page, query }: GetAllPokemonProps) {
  return await request(baseUrl, PokemonListQueryDocument, {
    ...(query && {
      where: isNaN(Number(query))
        ? { name: { _ilike: `%${query}%` } }
        : {
            id: {
              _eq: Number(query),
            },
          },
    }),
    offset: (page - 1) * 9,
    limit: 9,
  });
}

type GetPokemonProps = {
  name: string;
};

export async function getPokemon({
  name,
}: GetPokemonProps): Promise<PokemonQuery["pokemon"][0] | null> {
  const {
    pokemon: [pokemon],
  } = await request(baseUrl, PokemonQueryDocument, {
    name,
  });

  return pokemon || null;
}
