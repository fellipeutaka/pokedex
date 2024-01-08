type PropsWithChildren<T = unknown> = T & { children: React.ReactNode };
type PropsWithOptionalChildren<T = unknown> = T & {
  children?: React.ReactNode;
};
type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
