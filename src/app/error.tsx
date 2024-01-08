"use client";

import Image from "next/image";

import psyduck from "~/assets/images/psyduck.png";
import { Button } from "~/components/ui/button";

export default function Error({ reset }: ErrorPageProps) {
  return (
    <div className="grid auto-cols-max grid-flow-col items-center justify-center gap-8">
      <div>
        <h2 className="text-4xl font-extrabold tracking-tight motion-safe:animate-fade-right sm:text-5xl md:text-6xl lg:text-7xl">
          Unexpected error!
        </h2>
        <h2 className="leading-normal motion-safe:animate-fade-right motion-safe:animate-delay-150 sm:text-xl sm:leading-8">
          Sorry! Something went wrong. Please try again.
        </h2>
        <Button
          className="mt-4 w-max motion-safe:animate-fade-right motion-safe:animate-delay-300"
          onClick={() => reset()}
        >
          Try again
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
