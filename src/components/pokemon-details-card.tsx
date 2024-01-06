"use client";

import { useState } from "react";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CountUp, useCountUp } from "use-count-up";
import useSound from "use-sound";
import { z } from "zod";

import {
  capitalize,
  getPokemonCries,
  getPokemonSprite,
  updateURLParams,
} from "~/lib/utils";
import type { getPokemon } from "~/services/pokemon";

import { Icons } from "./icons";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Tooltip } from "./ui/tooltip";

const searchParamsSchema = z.object({
  shiny: z
    .string()
    .nullable()
    .transform((value) => value === "true"),
});

type PokemonDetailsCardProps = {
  pokemon: NonNullable<Awaited<ReturnType<typeof getPokemon>>>;
};

export function PokemonDetailsCard({ pokemon }: PokemonDetailsCardProps) {
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

  return (
    <section className="flex max-w-full flex-col rounded-lg border px-6 py-4 motion-safe:animate-fade-right motion-safe:animate-delay-150 md:max-w-lg">
      <div className="grid grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">
            #{String(pokemon.id).padStart(3, "0")}
          </p>
          <h1 className="text-4xl font-extrabold capitalize tracking-tight lg:text-5xl">
            {pokemon.name}
          </h1>
          <div className="my-2 flex items-center gap-2">
            {pokemon.types.map((type) => (
              <Badge
                className="capitalize"
                key={type.type?.name}
                type={type.type?.name as never}
              >
                {type.type?.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="shiny">Shiny</Label>
            <Switch
              id="shiny"
              checked={shiny}
              onCheckedChange={onShinyChange}
            />
          </div>
          <Tooltip delayDuration={300}>
            <Tooltip.Trigger asChild>
              <Button size="icon" variant="outline" onClick={() => play()}>
                <Icons.Volume2 className="h-4 w-4" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content sideOffset={4}>Play cry</Tooltip.Content>
          </Tooltip>
        </div>
      </div>
      <Image
        src={getPokemonSprite(pokemon.id, shiny)}
        alt={
          shiny
            ? `${capitalize(pokemon.name)} (shiny)`
            : capitalize(pokemon.name)
        }
        width={256}
        height={256}
        priority
        className="[image-rendering:_pixelated]"
        draggable={false}
      />
      <div className="flex h-20 items-center space-x-4 text-sm">
        <div className="flex flex-col">
          <p>Height</p>
          <p className="text-3xl font-semibold tracking-tight">
            <CountUp isCounting end={(pokemon.height ?? 0) / 10} /> m
          </p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col">
          <p>Weight</p>
          <p className="text-3xl font-semibold tracking-tight">
            <CountUp isCounting end={(pokemon.weight ?? 0) / 10} /> kg
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {pokemon.stats.map(({ base_stat, stat }, index) => (
          <div key={index}>
            <p className="capitalize">
              {stat?.name} : <CountUp isCounting end={base_stat} />
            </p>
            <StatsBar value={base_stat} />
          </div>
        ))}
      </div>
    </section>
  );
}

type StatsBarProps = {
  value: number;
};

function StatsBar({ value }: StatsBarProps) {
  const { value: animateValue } = useCountUp({
    isCounting: true,
    end: value,
    easing: "easeOutCubic",
  });

  return <Progress value={(Number(animateValue) / 255) * 100} />;
}
