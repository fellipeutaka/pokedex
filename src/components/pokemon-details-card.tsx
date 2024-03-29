"use client";

import Image from "next/image";
import { CountUp, useCountUp } from "use-count-up";

import { usePokemonDetailsCard } from "~/hooks/use-pokemon-details-card";
import { capitalize, getPokemonSprite, type PokemonType } from "~/lib/utils";
import type { getPokemon } from "~/services/pokemon";

import { Icons } from "./icons";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Tooltip } from "./ui/tooltip";

type PokemonDetailsCardProps = {
  pokemon: NonNullable<Awaited<ReturnType<typeof getPokemon>>>;
};

export function PokemonDetailsCard({ pokemon }: PokemonDetailsCardProps) {
  const { shiny, onShinyChange, play } = usePokemonDetailsCard({ pokemon });

  return (
    <section className="flex max-w-full flex-col rounded-lg border px-6 py-4 motion-safe:animate-fade-right motion-safe:animate-delay-150 md:max-w-lg">
      <div className="grid sm:grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">
            #{String(pokemon.id).padStart(3, "0")}
          </p>
          <h1 className="text-3xl font-extrabold capitalize tracking-tight sm:text-4xl lg:text-5xl">
            {pokemon.name}
          </h1>
          <div className="my-2 flex items-center gap-2">
            {pokemon.types.map((type) => (
              <Badge
                className="capitalize"
                key={type.type?.name}
                type={type.type?.name as PokemonType}
              >
                {type.type?.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
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
                <Icons.Volume2 className="size-4" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Play cry</Tooltip.Content>
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
        className="rendering-pixelated"
        draggable={false}
      />
      <div className="flex h-20 items-center space-x-4 text-sm">
        <div className="flex flex-col">
          <p>Height</p>
          <p className="text-xl font-semibold tracking-tight sm:text-3xl">
            <CountUp isCounting end={(pokemon.height ?? 0) / 10} /> m
          </p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col">
          <p>Weight</p>
          <p className="text-xl font-semibold tracking-tight sm:text-3xl">
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
