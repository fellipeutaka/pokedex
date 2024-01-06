"use client";

import { createContext, forwardRef, useContext } from "react";

import { TextFieldStyles } from "./styles";

const TextFieldContext = createContext({
  hasRoot: false,
});

const useTextFieldContext = () => {
  return useContext(TextFieldContext);
};

export type TextFieldRootProps = React.ComponentPropsWithoutRef<"div">;

const TextFieldRoot = forwardRef<HTMLDivElement, TextFieldRootProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={TextFieldStyles.Root({ className })}
        ref={ref}
        onPointerDown={(event) => {
          props.onPointerDown?.(event);

          const target = event.target as HTMLElement;
          if (target.closest("input, button, a")) return;

          const input = event.currentTarget.querySelector("input");
          if (!input) return;

          const position = input.compareDocumentPosition(target);
          const targetIsBeforeTextFieldInput =
            (position & Node.DOCUMENT_POSITION_PRECEDING) !== 0;
          const cursorPosition = targetIsBeforeTextFieldInput
            ? 0
            : input.value.length;

          requestAnimationFrame(() => {
            input.setSelectionRange(cursorPosition, cursorPosition);
            input.focus();
          });
        }}
      >
        <TextFieldContext.Provider value={{ hasRoot: true }}>
          {props.children}
        </TextFieldContext.Provider>
      </div>
    );
  },
);

TextFieldRoot.displayName = "TextFieldRoot";

export type TextFieldSlotProps = React.ComponentPropsWithoutRef<"div"> & {
  children: React.ReactNode;
};

const TextFieldSlot = forwardRef<HTMLDivElement, TextFieldSlotProps>(
  ({ className, ...props }, ref) => {
    if (!props.children) return null;

    return (
      <div
        className={TextFieldStyles.Slot({ className })}
        ref={ref}
        {...props}
      />
    );
  },
);

TextFieldSlot.displayName = "TextFieldSlot";

export type TextFieldInputProps = React.ComponentPropsWithoutRef<"input">;

export const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputProps>(
  ({ className, type = "text", ...props }, ref) => {
    const { hasRoot } = useTextFieldContext();

    if (type === "file")
      throw new Error("TextField does not support type=file");

    const input = (
      <>
        <input
          type={type}
          spellCheck="false"
          className={TextFieldStyles.Input({ className })}
          ref={ref}
          {...props}
        />
        <div className={TextFieldStyles.Chrome()} />
      </>
    );

    return hasRoot ? input : <TextFieldRoot>{input}</TextFieldRoot>;
  },
);

TextFieldInput.displayName = "TextFieldInput";

export const TextField = Object.assign(TextFieldInput, {
  Root: Object.assign(TextFieldRoot, {
    displayName: "TextField.Root",
  }),
  Slot: Object.assign(TextFieldSlot, {
    displayName: "TextField.Slot",
  }),
  Input: Object.assign(TextFieldInput, {
    displayName: "TextField.Input",
  }),
});

TextField.displayName = "TextField";
