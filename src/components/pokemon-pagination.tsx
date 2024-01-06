import { useSearchParams } from "next/navigation";

import { Pagination } from "./ui/pagination";

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
    <>
      <div className="flex flex-col">
        <p>Current page: {page}</p>
        <p>Total pages: {totalPages}</p>
      </div>
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
          {Array.from(
            { length: Math.min(totalPages - page + 1, 5) },
            (_, i) => (
              <Pagination.Item key={i}>
                <Pagination.Link
                  href={{
                    pathname: "/",
                    query: {
                      page: page + i,
                      ...(q && { q }),
                    },
                  }}
                  scroll={false}
                  isActive={page === page + i}
                >
                  {page + i}
                </Pagination.Link>
              </Pagination.Item>
            )
          ).concat(
            totalPages > page + 4
              ? [
                  <Pagination.Item key="ellipsis">
                    <Pagination.Ellipsis />
                  </Pagination.Item>,
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
                ]
              : []
          )}
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
    </>
  );
}
