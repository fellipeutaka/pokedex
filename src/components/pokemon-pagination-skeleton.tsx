import { Pagination } from "./ui/pagination";

export function PokemonPaginationSkeleton() {
  return (
    <Pagination>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous disabled href="/" />
        </Pagination.Item>
        {Array.from({ length: 5 }).map((_, i) => (
          <Pagination.Item key={i}>
            <Pagination.Link href="/" disabled>
              {i + 1}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link disabled href="/">
            10
          </Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next disabled href="/" />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
