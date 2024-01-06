import { forwardRef } from "react";

import { cn } from "mizuhara/utils";
import Link from "next/link";

import { type ButtonProps, ButtonStyles } from "~/components/ui/button";

import { Icons } from "../icons";

function PaginationRoot({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

const PaginationContent = forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-wrap items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  (props, ref) => <li ref={ref} {...props} />
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps<Disabled = boolean> = {
  isActive?: boolean;
  disabled?: Disabled;
} & Pick<ButtonProps, "size"> &
  React.ComponentPropsWithoutRef<typeof Link>;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  children,
  disabled,
  ...props
}: PaginationLinkProps) {
  if (disabled) {
    return (
      <div
        aria-disabled
        className={ButtonStyles({
          variant: isActive ? "outline" : "ghost",
          size,
          className,
        })}
      >
        {children}
      </div>
    );
  }

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={ButtonStyles({
        variant: isActive ? "outline" : "ghost",
        size,
        className,
      })}
      {...props}
    >
      {children}
    </Link>
  );
}
PaginationLink.displayName = "PaginationLink";

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 pl-2.5", className)}
      {...props}
    >
      <Icons.ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  );
}
PaginationPrevious.displayName = "PaginationPrevious";

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 pr-2.5", className)}
      {...props}
    >
      <span>Next</span>
      <Icons.ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <Icons.MoreHorizontal className="h-4 w-4 opacity-50" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export const Pagination = Object.assign(PaginationRoot, {
  Content: PaginationContent,
  Ellipsis: PaginationEllipsis,
  Item: PaginationItem,
  Link: PaginationLink,
  Next: PaginationNext,
  Previous: PaginationPrevious,
});
