import { graphql } from "../gql";

export const PokemonQueryDocument = graphql(/* GraphQL */ `
  query Pokemon($name: String!) {
    pokemon: pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      name
      id
      height
      weight
      species: pokemon_v2_pokemonspecy {
        descriptions: pokemon_v2_pokemonspeciesflavortexts(
          where: { pokemon_v2_language: { name: { _eq: "en" } } }
        ) {
          id
          description: flavor_text
        }

        evolutionChain: pokemon_v2_evolutionchain {
          species: pokemon_v2_pokemonspecies {
            id
            name
            pokemons: pokemon_v2_pokemons {
              types: pokemon_v2_pokemontypes {
                type: pokemon_v2_type {
                  id
                  name
                }
              }
            }
          }
        }
      }
      stats: pokemon_v2_pokemonstats {
        stat: pokemon_v2_stat {
          id
          name
        }
        base_stat
      }
      abilities: pokemon_v2_pokemonabilities {
        ability: pokemon_v2_ability {
          id
          name
        }
      }
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          id
          name
          typeEfficacies: pokemon_v2_typeefficacies {
            damage_factor
            type: pokemon_v2_type {
              name
            }
            target: pokemonV2TypeByTargetTypeId {
              name
            }
          }
        }
      }
    }
  }
`);
