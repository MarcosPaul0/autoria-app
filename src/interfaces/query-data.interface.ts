export interface QueryPagination {
  totalItems: number
  totalPages: number
  page: number
  hasNext: boolean
  hasPrevious: boolean
  itemsPerPage: number
}

export interface QueryProducts extends QueryPagination {
  products: Array<{
    id: string
  }>
}

export interface QueryProductCategories {
  id: string
  category: string
  createdAt: string
  productCount: number
}
