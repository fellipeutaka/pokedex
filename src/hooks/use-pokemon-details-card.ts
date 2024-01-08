import { useState } from "react";

import { useSearchParams } from "next/navigation";
import useSound from "use-sound";
import { z } from "zod";

import { getPokemonCries, updateURLParams } from "~/lib/utils";
import type { getPokemon } from "~/services/pokemon";

const searchParamsSchema = z.object({
  shiny: z
    .string()
    .nullable()
    .transform((value) => value === "true"),
});

type UsePokemonDetailsCardProps = {
  pokemon: NonNullable<Awaited<ReturnType<typeof getPokemon>>>;
};

export function usePokemonDetailsCard({ pokemon }: UsePokemonDetailsCardProps) {
  const searchParams = useSearchParams();
  const parsedSearchParams = searchParamsSchema.parse({
    shiny: searchParams.get("shiny"),
  });
  const [shiny, setShiny] = useState(parsedSearchParams.shiny);
  const [play] = useSound(getPokemonCries(pokemon.id), {
    volume: 0.5,
  });

  function onShinyChange(checked: boolean) {
    updateURLParams({
      currentParams: searchParams,
      key: "shiny",
      value: String(checked),
      condition: !checked,
      path: `/${pokemon.name}`,
    });

    setShiny(checked);
  }

  return {
    shiny,
    onShinyChange,
    play,
  };
}
