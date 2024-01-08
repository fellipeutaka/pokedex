import { useSearchParams } from "next/navigation";

import { Pagination } from "./ui/pagination";

const PAGINATION_RANGE = 5;

type PokemonPaginationProps = {
  page: number;
  totalPages: number;
};

export function PokemonPagination({
  page,
  totalPages,
}: PokemonPaginationProps) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  return (
    <Pagination>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous
            disabled={page === 1}
            href={{
              pathname: "/",
              query: {
                ...(page - 1 !== 1 && { page: page - 1 }),
                ...(q && { q }),
              },
            }}
            scroll={false}
          />
        </Pagination.Item>
        {[
          <Pagination.Item key={1}>
            <Pagination.Link
              href={{
                pathname: "/",
                query: {
                  ...(q && { q }),
                },
              }}
              scroll={false}
              isActive={page === 1}
            >
              {1}
            </Pagination.Link>
          </Pagination.Item>,
          ...(page > PAGINATION_RANGE - 1
            ? [
                <Pagination.Item key="ellipsis-1">
                  <Pagination.Ellipsis />
                </Pagination.Item>,
              ]
            : []),
          ...Array.from(
            { length: Math.min(totalPages, PAGINATION_RANGE) },
            (_, i) => {
              const pageNumber = page <= 3 ? i + 2 : page + i - 2;
              return pageNumber > 1 && pageNumber < totalPages ? (
                <Pagination.Item key={pageNumber}>
                  <Pagination.Link
                    href={{
                      pathname: "/",
                      query: {
                        page: pageNumber,
                        ...(q && { q }),
                      },
                    }}
                    scroll={false}
                    isActive={page === pageNumber}
                  >
                    {pageNumber}
                  </Pagination.Link>
                </Pagination.Item>
              ) : null;
            }
          ).filter(Boolean),
          ...(page < totalPages - 2
            ? [
                <Pagination.Item key="ellipsis-2">
                  <Pagination.Ellipsis />
                </Pagination.Item>,
              ]
            : []),
          <Pagination.Item key={totalPages}>
            <Pagination.Link
              href={{
                pathname: "/",
                query: {
                  page: totalPages,
                  ...(q && { q }),
                },
              }}
              scroll={false}
              isActive={page === totalPages}
            >
              {totalPages}
            </Pagination.Link>
          </Pagination.Item>,
        ]}
        <Pagination.Item>
          <Pagination.Next
            disabled={page === totalPages}
            href={{
              pathname: "/",
              query: {
                page: page + 1,
                ...(q && { q }),
              },
            }}
            scroll={false}
          />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
