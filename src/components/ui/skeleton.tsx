import { forwardRef } from "react";

import { cn } from "mizuhara/utils";

export type SkeletonProps = React.ComponentPropsWithoutRef<"div">;

export const Skeleton = forwardRef<React.ElementRef<"div">, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-md bg-muted motion-safe:animate-pulse",
          className,
        )}
        aria-busy="true"
        aria-live="polite"
        {...props}
      />
    );
  },
);
Skeleton.displayName = "Skeleton";
