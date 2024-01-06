"use client";

import { ThemeProvider } from "next-themes";

import { QueryClientProvider } from "~/lib/react-query";

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
