/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query PokemonList(\n    $where: pokemon_v2_pokemonspecies_bool_exp\n    $offset: Int!\n    $limit: Int!\n  ) {\n    list: pokemon_v2_pokemonspecies(\n      offset: $offset\n      limit: $limit\n      order_by: { id: asc }\n      where: $where\n    ) {\n      name\n      id\n      pokemons: pokemon_v2_pokemons {\n        height\n        weight\n        types: pokemon_v2_pokemontypes {\n          type: pokemon_v2_type {\n            id\n            name\n          }\n        }\n      }\n    }\n    aggregate: pokemon_v2_pokemonspecies_aggregate(where: $where) {\n      aggregate {\n        count\n      }\n    }\n  }\n": types.PokemonListDocument,
    "\n  query Pokemon($name: String!) {\n    pokemon: pokemon_v2_pokemon(where: { name: { _eq: $name } }) {\n      name\n      id\n      height\n      weight\n      species: pokemon_v2_pokemonspecy {\n        descriptions: pokemon_v2_pokemonspeciesflavortexts(\n          where: { pokemon_v2_language: { name: { _eq: \"en\" } } }\n        ) {\n          id\n          description: flavor_text\n        }\n\n        evolutionChain: pokemon_v2_evolutionchain {\n          species: pokemon_v2_pokemonspecies {\n            id\n            name\n            pokemons: pokemon_v2_pokemons {\n              types: pokemon_v2_pokemontypes {\n                type: pokemon_v2_type {\n                  id\n                  name\n                }\n              }\n            }\n          }\n        }\n      }\n      stats: pokemon_v2_pokemonstats {\n        stat: pokemon_v2_stat {\n          id\n          name\n        }\n        base_stat\n      }\n      abilities: pokemon_v2_pokemonabilities {\n        ability: pokemon_v2_ability {\n          id\n          name\n        }\n      }\n      types: pokemon_v2_pokemontypes {\n        type: pokemon_v2_type {\n          id\n          name\n          typeEfficacies: pokemon_v2_typeefficacies {\n            damage_factor\n            type: pokemon_v2_type {\n              name\n            }\n            target: pokemonV2TypeByTargetTypeId {\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n": types.PokemonDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PokemonList(\n    $where: pokemon_v2_pokemonspecies_bool_exp\n    $offset: Int!\n    $limit: Int!\n  ) {\n    list: pokemon_v2_pokemonspecies(\n      offset: $offset\n      limit: $limit\n      order_by: { id: asc }\n      where: $where\n    ) {\n      name\n      id\n      pokemons: pokemon_v2_pokemons {\n        height\n        weight\n        types: pokemon_v2_pokemontypes {\n          type: pokemon_v2_type {\n            id\n            name\n          }\n        }\n      }\n    }\n    aggregate: pokemon_v2_pokemonspecies_aggregate(where: $where) {\n      aggregate {\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query PokemonList(\n    $where: pokemon_v2_pokemonspecies_bool_exp\n    $offset: Int!\n    $limit: Int!\n  ) {\n    list: pokemon_v2_pokemonspecies(\n      offset: $offset\n      limit: $limit\n      order_by: { id: asc }\n      where: $where\n    ) {\n      name\n      id\n      pokemons: pokemon_v2_pokemons {\n        height\n        weight\n        types: pokemon_v2_pokemontypes {\n          type: pokemon_v2_type {\n            id\n            name\n          }\n        }\n      }\n    }\n    aggregate: pokemon_v2_pokemonspecies_aggregate(where: $where) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Pokemon($name: String!) {\n    pokemon: pokemon_v2_pokemon(where: { name: { _eq: $name } }) {\n      name\n      id\n      height\n      weight\n      species: pokemon_v2_pokemonspecy {\n        descriptions: pokemon_v2_pokemonspeciesflavortexts(\n          where: { pokemon_v2_language: { name: { _eq: \"en\" } } }\n        ) {\n          id\n          description: flavor_text\n        }\n\n        evolutionChain: pokemon_v2_evolutionchain {\n          species: pokemon_v2_pokemonspecies {\n            id\n            name\n            pokemons: pokemon_v2_pokemons {\n              types: pokemon_v2_pokemontypes {\n                type: pokemon_v2_type {\n                  id\n                  name\n                }\n              }\n            }\n          }\n        }\n      }\n      stats: pokemon_v2_pokemonstats {\n        stat: pokemon_v2_stat {\n          id\n          name\n        }\n        base_stat\n      }\n      abilities: pokemon_v2_pokemonabilities {\n        ability: pokemon_v2_ability {\n          id\n          name\n        }\n      }\n      types: pokemon_v2_pokemontypes {\n        type: pokemon_v2_type {\n          id\n          name\n          typeEfficacies: pokemon_v2_typeefficacies {\n            damage_factor\n            type: pokemon_v2_type {\n              name\n            }\n            target: pokemonV2TypeByTargetTypeId {\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Pokemon($name: String!) {\n    pokemon: pokemon_v2_pokemon(where: { name: { _eq: $name } }) {\n      name\n      id\n      height\n      weight\n      species: pokemon_v2_pokemonspecy {\n        descriptions: pokemon_v2_pokemonspeciesflavortexts(\n          where: { pokemon_v2_language: { name: { _eq: \"en\" } } }\n        ) {\n          id\n          description: flavor_text\n        }\n\n        evolutionChain: pokemon_v2_evolutionchain {\n          species: pokemon_v2_pokemonspecies {\n            id\n            name\n            pokemons: pokemon_v2_pokemons {\n              types: pokemon_v2_pokemontypes {\n                type: pokemon_v2_type {\n                  id\n                  name\n                }\n              }\n            }\n          }\n        }\n      }\n      stats: pokemon_v2_pokemonstats {\n        stat: pokemon_v2_stat {\n          id\n          name\n        }\n        base_stat\n      }\n      abilities: pokemon_v2_pokemonabilities {\n        ability: pokemon_v2_ability {\n          id\n          name\n        }\n      }\n      types: pokemon_v2_pokemontypes {\n        type: pokemon_v2_type {\n          id\n          name\n          typeEfficacies: pokemon_v2_typeefficacies {\n            damage_factor\n            type: pokemon_v2_type {\n              name\n            }\n            target: pokemonV2TypeByTargetTypeId {\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;