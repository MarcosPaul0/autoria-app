import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@autoria/components/pagination'
import type { Pagination as PaginationResponse } from '@autoria/interfaces/api-responses.interface'

type ListPaginationState = Pick<
  PaginationResponse<unknown>,
  'page' | 'totalPages' | 'hasNext' | 'hasPrevious'
>

interface ListPaginationProps {
  pagination: ListPaginationState
  onPageChange: (page: number) => void
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages: Array<number | 'ellipsis-left' | 'ellipsis-right'> = []
  const showLeftEllipsis = currentPage > 3
  const showRightEllipsis = currentPage < totalPages - 2

  pages.push(1)

  if (showLeftEllipsis) {
    pages.push('ellipsis-left')
  }

  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  for (let page = start; page <= end; page++) {
    pages.push(page)
  }

  if (showRightEllipsis) {
    pages.push('ellipsis-right')
  }

  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return [...new Set(pages)]
}

export function ListPagination({
  pagination,
  onPageChange,
}: ListPaginationProps) {
  if (pagination.totalPages <= 1) {
    return null
  }

  const pages = getVisiblePages(pagination.page, pagination.totalPages)

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            text="Anterior"
            className={
              !pagination.hasPrevious ? 'pointer-events-none opacity-50' : ''
            }
            aria-disabled={!pagination.hasPrevious}
            onClick={(event) => {
              event.preventDefault()

              if (!pagination.hasPrevious) {
                return
              }

              onPageChange(pagination.page - 1)
            }}
          />
        </PaginationItem>

        {pages.map((page) => {
          if (typeof page !== 'number') {
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={pagination.page === page}
                onClick={(event) => {
                  event.preventDefault()
                  onPageChange(page)
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            text="Próxima"
            className={
              !pagination.hasNext ? 'pointer-events-none opacity-50' : ''
            }
            aria-disabled={!pagination.hasNext}
            onClick={(event) => {
              event.preventDefault()

              if (!pagination.hasNext) {
                return
              }

              onPageChange(pagination.page + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
