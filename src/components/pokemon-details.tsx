"use client";

import { Fragment } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  getPokemonSprite,
  getPokemonWeakness,
  getRandomItem,
  type PokemonType,
} from "~/lib/utils";
import type { getPokemon } from "~/services/pokemon";

import { Icons } from "./icons";
import { Badge } from "./ui/badge";
import { Tooltip } from "./ui/tooltip";

type PokemonDetailsProps = {
  pokemon: NonNullable<Awaited<ReturnType<typeof getPokemon>>>;
};

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  return (
    <section className="space-y-6">
      <div className="motion-safe:animate-fade motion-safe:animate-delay-300">
        <h3 className="text-2xl font-semibold tracking-tight">Description</h3>
        <p>
          {getRandomItem(
            pokemon.species?.descriptions ?? []
          ).description.replace("\f", " ")}
        </p>
      </div>
      <div className="motion-safe:animate-fade motion-safe:animate-delay-500">
        <h3 className="text-2xl font-semibold tracking-tight">Abilities</h3>
        <ul className="ml-6 list-disc [&>li]:mt-2">
          {pokemon.abilities.map(({ ability }) => (
            <li className="capitalize" key={ability?.id}>
              {ability?.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="motion-safe:animate-fade motion-safe:animate-delay-700">
        <h3 className="text-2xl font-semibold tracking-tight">Weakness</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {getPokemonWeakness(
            pokemon.types.map(({ type }) => type?.name as PokemonType)
          )?.map(({ type, damageFactor }) => (
            <Badge key={type} type={type}>
              <span className="capitalize">{type}</span>
              {damageFactor > 200 && (
                <Tooltip>
                  <Tooltip.Trigger asChild>
                    <Icons.Alert className="ml-1 h-4 w-4" />
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    <p>Deals 4x damage</p>
                  </Tooltip.Content>
                </Tooltip>
              )}
            </Badge>
          ))}
        </div>
      </div>
      <div className="motion-safe:animate-fade motion-safe:animate-delay-1000">
        <h3 className="text-2xl font-semibold tracking-tight">Evolutions</h3>
        {pokemon.species?.evolutionChain?.species.length === 1 && (
          <p className="text-muted-foreground">This Pokémon does not evolve.</p>
        )}
        <div className="mt-4 flex max-w-[calc(100vw-4rem)] items-center gap-8 overflow-x-auto py-4 sm:py-0">
          {pokemon.species?.evolutionChain?.species.map(
            (species, index, { length }) => (
              <Fragment key={species?.id}>
                <Link
                  className="flex w-44 flex-col gap-4 rounded-md border px-6 py-4"
                  href={`/${species.name}`}
                >
                  <Image
                    src={getPokemonSprite(species.id)}
                    alt={pokemon.name}
                    width={64}
                    height={64}
                    className="self-center [image-rendering:_pixelated]"
                  />
                  <p className="text-center text-xl font-semibold capitalize leading-none tracking-tight">
                    {species.name}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    {species.pokemons[0].types.map(({ type }) => (
                      <Badge
                        className="capitalize"
                        key={type?.name}
                        type={type?.name as PokemonType}
                      >
                        {type?.name}
                      </Badge>
                    ))}
                  </div>
                </Link>
                {index !== length - 1 && (
                  <Icons.ChevronRight className="h-6 w-6" />
                )}
              </Fragment>
            )
          )}
        </div>
      </div>
    </section>
  );
}
