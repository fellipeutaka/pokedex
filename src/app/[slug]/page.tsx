import Link from "next/link";
import { notFound } from "next/navigation";

import type { GenerateMetadata } from "~/@types/metadata";
import { Icons } from "~/components/icons";
import { PokemonDetails } from "~/components/pokemon-details";
import { PokemonDetailsCard } from "~/components/pokemon-details-card";
import { Button } from "~/components/ui/button";
import { capitalize } from "~/lib/utils";
import { getPokemon } from "~/services/pokemon";

type PageProps = {
  params: {
    slug: string;
  };
};

export const generateMetadata: GenerateMetadata<PageProps> = async ({
  params: { slug },
}) => {
  return {
    title: capitalize(slug),
  };
};

export default async function Page({ params: { slug } }: PageProps) {
  const pokemon = await getPokemon({ name: slug });

  if (!pokemon) {
    notFound();
  }

  return (
    <main className="container pt-16 lg:py-28">
      <Button className="mb-4 motion-safe:animate-fade-right" asChild>
        <Link href="/">
          <Icons.ChevronLeft className="size-4" /> Back to home
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <PokemonDetailsCard pokemon={pokemon} />
        <PokemonDetails pokemon={pokemon} />
      </div>
    </main>
  );
}
