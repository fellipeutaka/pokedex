import { siteConfig } from "~/config/site";

import { Icons } from "./icons";
import { Button } from "./ui/button";

export function SiteHero() {
  return (
    <main className="container space-y-6 pb-12 pt-16 text-center lg:py-28">
      <h1 className="text-balance text-4xl font-extrabold tracking-tight motion-safe:animate-fade-up sm:text-5xl md:text-6xl lg:text-7xl">
        A React{" "}
        <span className="bg-gradient-to-r from-sky-500 to-amber-500 bg-clip-text text-transparent">
          Pokédex
        </span>{" "}
        using Next.js and Tailwind CSS
      </h1>
      <h2 className="mx-auto max-w-[42rem] text-balance leading-normal text-muted-foreground motion-safe:animate-fade-up motion-safe:animate-delay-150 sm:text-xl sm:leading-8">
        Discover and learn about your favorite Pokémon. Enter the name or number
        of a Pokémon to search for, or filter by type.
      </h2>
      <div className="flex items-center justify-center gap-4 motion-safe:animate-fade-up motion-safe:animate-delay-300">
        <Button asChild>
          <a href="#list">View Pokémon's</a>
        </Button>
        <Button className="h-11 px-8" variant="outline" asChild>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.Github className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </Button>
      </div>
    </main>
  );
}
