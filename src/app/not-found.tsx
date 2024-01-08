import Image from "next/image";
import Link from "next/link";

import psyduck from "~/assets/images/psyduck.png";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid auto-cols-max grid-flow-col items-center justify-center gap-8">
      <div>
        <h2 className="text-4xl font-extrabold tracking-tight motion-safe:animate-fade-right sm:text-5xl md:text-6xl lg:text-7xl">
          Page not found!
        </h2>
        <h2 className="leading-normal motion-safe:animate-fade-right motion-safe:animate-delay-150 sm:text-xl sm:leading-8">
          Sorry! The page you're looking for is not here.
        </h2>
        <Button
          className="mt-4 w-max motion-safe:animate-fade-right motion-safe:animate-delay-300"
          asChild
        >
          <Link href="/">
            <Icons.ChevronLeft className="size-4" /> Go back home
          </Link>
        </Button>
      </div>
      <Image
        className="motion-safe:animate-fade-left motion-safe:animate-delay-500"
        src={psyduck}
        alt="Psyduck"
      />
    </div>
  );
}
