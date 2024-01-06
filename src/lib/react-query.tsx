import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export function QueryClientProvider({ children }: PropsWithChildren) {
  return <Provider client={queryClient}>{children}</Provider>;
}

export const queryKeys = {
  pokemonSearch: (q: string, page: number) =>
    ["pokemonSearch", { q, page }] as const,
} as const;
