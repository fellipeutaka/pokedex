import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { ReadonlyURLSearchParams } from "next/navigation";

export function createUrl(
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
}

type ToggleParamsProps = {
  params: URLSearchParams | ReadonlyURLSearchParams;
  key: string;
  value: string;
  condition?: boolean;
};

export function toggleParam({
  params,
  key,
  value,
  condition,
}: ToggleParamsProps) {
  const paramsCopy = new URLSearchParams(params);
  const shouldDelete = condition ?? paramsCopy.has(key);

  if (shouldDelete) {
    paramsCopy.delete(key);
  } else {
    paramsCopy.set(key, value);
  }

  return paramsCopy;
}

type UpdateURLParamsProps = {
  key: string;
  value: string;
  condition: boolean;
  currentParams: URLSearchParams | ReadonlyURLSearchParams;
  path: string;
  router?: AppRouterInstance;
};

export function updateURLParams({
  key,
  value,
  condition,
  currentParams,
  path,
  router,
}: UpdateURLParamsProps) {
  const newParams = toggleParam({
    params: new URLSearchParams(currentParams.toString()),
    key,
    value,
    condition,
  });

  if (router) {
    router.replace(createUrl(path, newParams), { scroll: false });
  } else {
    window.history.replaceState(null, "", createUrl(path, newParams));
  }
}

export function capitalize(string: string) {
  return string.at(0)?.toUpperCase() + string.slice(1);
}

export function getRandomItem<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

const typeChart: Record<PokemonType, Record<PokemonType, number>> = {
  normal: {
    normal: 100,
    fire: 100,
    water: 100,
    electric: 100,
    grass: 100,
    ice: 100,
    fighting: 200,
    poison: 100,
    ground: 100,
    flying: 100,
    psychic: 100,
    bug: 100,
    rock: 100,
    ghost: 0,
    dragon: 100,
    dark: 100,
    steel: 100,
    fairy: 100,
  },
  fire: {
    normal: 100,
    fire: 50,
    water: 200,
    electric: 100,
    grass: 50,
    ice: 50,
    fighting: 100,
    poison: 100,
    ground: 200,
    flying: 100,
    psychic: 100,
    bug: 50,
    rock: 200,
    ghost: 100,
    dragon: 100,
    dark: 100,
    steel: 50,
    fairy: 50,
  },
  water: {
    normal: 100,
    fire: 50,
    water: 50,
    electric: 200,
    grass: 100,
    ice: 50,
    fighting: 100,
    poison: 100,
    ground: 100,
    flying: 100,
    psychic: 100,
    bug: 100,
    rock: 100,
    ghost: 100,
    dragon: 100,
    dark: 100,
    steel: 50,
    fairy: 100,
  },
  electric: {
    normal: 100,
    fire: 100,
    water: 100,
    electric: 50,
    grass: 100,
    ice: 100,
    fighting: 100,
    poison: 100,
    ground: 200,
    flying: 50,
    psychic: 100,
    bug: 100,
    rock: 100,
    ghost: 100,
    dragon: 100,
    dark: 100,
    steel: 50,
    fairy: 100,
  },
  grass: {
    normal: 100,
    fire: 200,
    water: 50,
    electric: 50,
    grass: 50,
    ice: 200,
    fighting: 100,
    poison: 200,
    ground: 50,
    flying: 200,
    psychic: 100,
    bug: 200,
    rock: 100,
    ghost: 100,
    dragon: 100,
    dark: 100,
    steel: 100,
    fairy: 100,
  },
  ice: {
    normal: 100,
    fire: 200,
    water: 100,
    electric: 100,
    grass: 100,
    ice: 50,
    fighting: 200,
    poison: 100,
    ground: 100,
    flying: 100,
    psychic: 100,
    bug: 100,
    rock: 200,
    ghost: 100,
    dragon: 100,
    dark: 100,
    steel: 200,
    fairy: 100,
  },
  fighting: {
    normal: 100,
    fire: 100,
    water: 100,
    electric: 100,
    grass: 100,
    ice: 100,
    fighting: 100,
    poison: 100,
    ground: 100,
    flying: 200,
    psychic: 200,
    bug: 100,
    rock: 100,
    ghost: 100,
    dragon: 100,
    dark: 50,
    steel: 100,
    fairy: 200,
  },
  poison: {
    normal: 100,
    fire: 100,
    water: 100,
    electric: 100,
    grass: 50,
    ice: 100,
    fighting: 50,
    poison: 50,
    ground: 200,
    flying: 100,
    psychic: 200,
    bug: 50,
    rock: 100,
    ghost: 100,
    dragon: 100,
    dark: 100,
    steel: 100,
    fairy: 50,
  },
  ground: {
    normal: 100,
    fire: 100,
    water: 200,
    electric: 0,
    grass: 200,
    ice: 200,
    fighting: 100,
    poison: 50,
    ground: 100,
    flying: 100,
    psychic: 100,
    bug: 100,
    rock: 50,
    ghost: 100,
    dragon: 100,
    dark: 100,
    steel: 100,
    fairy: 100,
  },
  flying: {
    normal: 100,
    fire: 100,
    water: 100,
    electric: 200,
    grass: 50,
    ice: 200,
    fighting: 50,
    poison: 100,
    ground: 0,
    flying: 100,
    psychic: 100,
    bug: 50,
    rock: 200,
    ghost: 100,
    dragon: 100,
    dark: 100,
    steel: 100,
    fairy: 100,
  },
  psychic: {
    normal: 100,
    fire: 100,
    water: 100,
    electric: 100,
    grass: 100,
    ice: 100,
    fighting: 50,
    poison: 100,
    ground: 100,
    flying: 100,
    psychic: 50,
    bug: 200,
    rock: 100,
    ghost: 200,
    dragon: 100,
    dark: 200,
    steel: 100,
    fairy: 100,
  },
  bug: {
    normal: 100,
    fire: 200,
    water: 100,
    electric: 100,
    grass: 50,
    ice: 100,
    fighting: 50,
    poison: 100,
    ground: 50,
    flying: 200,
    psychic: 100,
    bug: 100,
    rock: 200,
    ghost: 100,
    dragon: 100,
    dark: 100,
    steel: 100,
    fairy: 100,
  },
  rock: {
    normal: 50,
    fire: 50,
    water: 200,
    electric: 100,
    grass: 200,
    ice: 100,
    fighting: 200,
    poison: 50,
    ground: 200,
    flying: 50,
    psychic: 100,
    bug: 100,
    rock: 100,
    ghost: 100,
    dragon: 100,
    dark: 100,
    steel: 200,
    fairy: 100,
  },
  ghost: {
    normal: 0,
    fire: 100,
    water: 100,
    electric: 100,
    grass: 100,
    ice: 100,
    fighting: 0,
    poison: 50,
    ground: 100,
    flying: 100,
    psychic: 100,
    bug: 50,
    rock: 100,
    ghost: 200,
    dragon: 100,
    dark: 200,
    steel: 100,
    fairy: 100,
  },
  dragon: {
    normal: 100,
    fire: 50,
    water: 50,
    electric: 50,
    grass: 50,
    ice: 200,
    fighting: 100,
    poison: 100,
    ground: 100,
    flying: 100,
    psychic: 100,
    bug: 100,
    rock: 100,
    ghost: 100,
    dragon: 200,
    dark: 100,
    steel: 100,
    fairy: 200,
  },
  dark: {
    normal: 100,
    fire: 100,
    water: 100,
    electric: 100,
    grass: 100,
    ice: 100,
    fighting: 200,
    poison: 100,
    ground: 100,
    flying: 100,
    psychic: 0,
    bug: 200,
    rock: 100,
    ghost: 50,
    dragon: 100,
    dark: 50,
    steel: 100,
    fairy: 200,
  },
  steel: {
    normal: 50,
    fire: 200,
    water: 100,
    electric: 100,
    grass: 50,
    ice: 50,
    fighting: 200,
    poison: 0,
    ground: 200,
    flying: 50,
    psychic: 50,
    bug: 50,
    rock: 50,
    ghost: 100,
    dragon: 50,
    dark: 100,
    steel: 50,
    fairy: 50,
  },
  fairy: {
    normal: 100,
    fire: 100,
    water: 100,
    electric: 100,
    grass: 100,
    ice: 100,
    fighting: 50,
    poison: 200,
    ground: 100,
    flying: 100,
    psychic: 100,
    bug: 50,
    rock: 100,
    ghost: 100,
    dragon: 0,
    dark: 50,
    steel: 200,
    fairy: 100,
  },
};

type TypeDamageFactor = {
  type: PokemonType;
  damageFactor: number;
};

const getTypeDamageFactors = (
  attackingTypes: PokemonType[],
  defendingType: PokemonType
): TypeDamageFactor[] => {
  const result: TypeDamageFactor[] = [];

  for (const attackingType of attackingTypes) {
    const damageFactor = typeChart[attackingType][defendingType];
    result.push({ type: defendingType, damageFactor });
  }

  return result;
};

export const getPokemonWeakness = (
  types: PokemonType[]
): TypeDamageFactor[] => {
  const result: TypeDamageFactor[] = [];

  for (const defendingType of types) {
    const effectiveTypes = types.filter(
      (attackingType) => attackingType !== defendingType
    );
    const damageFactors = getTypeDamageFactors(effectiveTypes, defendingType);
    result.push(...damageFactors);
  }

  return result;
};

export function getPokemonSprite(id: number, isShiny = false) {
  return isShiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function getPokemonCries(id: number) {
  return `https://pokemoncries.com/cries/${id}.mp3`;
}
