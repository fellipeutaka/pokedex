import Image from "next/image";
import Link from "next/link";

import type { PokemonListQuery } from "~/graphql/gql/graphql";
import { getPokemonSprite, type PokemonType } from "~/lib/utils";

import { Icons } from "./icons";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type PokemonCardProps = {
  pokemon: PokemonListQuery["list"][number];
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="rounded-md border px-6 py-4">
      <Image
        src={getPokemonSprite(pokemon.id)}
        alt={pokemon.name}
        width={128}
        height={128}
        className="[image-rendering:_pixelated]"
        draggable={false}
      />
      <p className="text-sm text-muted-foreground">
        #{String(pokemon.id).padStart(3, "0")}
      </p>
      <p className="text-2xl font-semibold capitalize leading-none tracking-tight">
        {pokemon.name}
      </p>
      <div className="my-2 flex items-center gap-2">
        {pokemon.pokemons[0].types.map(({ type }) => (
          <Badge
            key={type?.name}
            type={type?.name as PokemonType}
            className="capitalize"
          >
            {type!.name}
          </Badge>
        ))}
      </div>
      <Button asChild>
        <Link href={`/${pokemon.name}`}>
          <Icons.Info className="mr-2 size-4" /> View Details
        </Link>
      </Button>
    </div>
  );
}
