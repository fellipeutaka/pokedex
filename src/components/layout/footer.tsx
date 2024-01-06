import { siteConfig } from "~/config/site";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col md:h-24">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {year} Pokémon. © 1995 - {year} Nintendo/Creatures Inc./GAME FREAK
          inc. TM, ® Nintendo.
        </p>
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            fellipeutaka
          </a>
          . The source code is available on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
