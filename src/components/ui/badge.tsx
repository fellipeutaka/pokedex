import { forwardRef } from "react";

import { tv, type VariantProps } from "mizuhara/utils";

export const BadgeStyles = tv({
  base: [
    "inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold outline-none transition-colors",
    "focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ],
  variants: {
    type: {
      normal: "bg-stone-500 text-zinc-50",
      fire: "bg-orange-500 text-zinc-950",
      water: "bg-sky-500 text-zinc-950",
      grass: "bg-green-600 text-zinc-950",
      electric: "bg-yellow-400 text-zinc-950",
      ice: "bg-blue-300 text-zinc-950",
      fighting: "bg-red-500 text-zinc-950",
      poison: "bg-fuchsia-600 text-zinc-50",
      ground: "bg-orange-300 text-zinc-950",
      flying: "bg-violet-300 text-zinc-950",
      psychic: "bg-pink-600 text-white",
      bug: "bg-lime-500 text-zinc-950",
      rock: "bg-stone-600 text-zinc-50",
      ghost: "bg-violet-400 text-zinc-950",
      dark: "bg-stone-800 text-zinc-50",
      dragon: "bg-violet-600 text-zinc-50",
      steel: "bg-slate-400 text-zinc-950",
      fairy: "bg-pink-300 text-zinc-950",
    },
  },
});

export type BadgeProps = React.ComponentPropsWithoutRef<"div"> &
  Required<VariantProps<typeof BadgeStyles>>;

export const Badge = forwardRef<React.ElementRef<"div">, BadgeProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div ref={ref} className={BadgeStyles({ type, className })} {...props} />
    );
  },
);
Badge.displayName = "Badge";
