"use client";

import { forwardRef } from "react";

import { Root } from "@radix-ui/react-label";

import { LabelStyles } from "./styles";

export type LabelProps = React.ComponentPropsWithoutRef<typeof Root> & {
  htmlFor: string;
};

export const Label = forwardRef<React.ElementRef<typeof Root>, LabelProps>(
  ({ className, htmlFor, ...props }, ref) => (
    <Root
      ref={ref}
      className={LabelStyles({ className })}
      htmlFor={htmlFor}
      {...props}
    />
  ),
);
Label.displayName = "Label";
