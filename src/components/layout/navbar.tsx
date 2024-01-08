import Link from "next/link";

import { siteConfig } from "~/config/site";

import { Icons } from "../icons";
import { ModeToggle } from "../mode-toggle";
import { ButtonStyles } from "../ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-full max-w-screen-2xl items-center justify-between">
        <Link href="/">
          <Icons.Logo className="h-6 w-auto" />
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={ButtonStyles({
              variant: "ghost",
              size: "icon",
            })}
          >
            <Icons.Github className="size-4" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className={ButtonStyles({
              variant: "ghost",
              size: "icon",
            })}
          >
            <Icons.Twitter className="size-4" />
            <span className="sr-only">Twitter</span>
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
