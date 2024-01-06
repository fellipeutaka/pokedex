import { graphql } from "../gql";

export const PokemonListQueryDocument = graphql(/* GraphQL */ `
  query PokemonList(
    $where: pokemon_v2_pokemonspecies_bool_exp
    $offset: Int!
    $limit: Int!
  ) {
    list: pokemon_v2_pokemonspecies(
      offset: $offset
      limit: $limit
      order_by: { id: asc }
      where: $where
    ) {
      name
      id
      pokemons: pokemon_v2_pokemons {
        height
        weight
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            id
            name
          }
        }
      }
    }
    aggregate: pokemon_v2_pokemonspecies_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`);
