import { QUERY_KEYS } from '@autoria/constants/query-keys'
import { PaginationHelper } from '@autoria/helpers/pagination-helper'
import { StorePage } from '@autoria/pages/store'
import { ProductCategoryPresenter } from '@autoria/presenters/product-category-presenter'
import { ProductCategoryRepository } from '@autoria/repositories/product-category-repository'
import { createFileRoute } from '@tanstack/react-router'

export interface ProductSearch {
  page?: string
  productCategory?: string
}

export const Route = createFileRoute('/(public)/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: [QUERY_KEYS.productCategoryOptions],
      queryFn: async () => {
        const productCategoriesResponse =
          await ProductCategoryRepository.listAll()

        return ProductCategoryPresenter.optionsToUi(productCategoriesResponse)
      },
    })
  },
  validateSearch: (search): ProductSearch => {
    const page = search.page
    const productCategory = search.productCategory

    const validatedSearch: ProductSearch = {}

    if (typeof page === 'string' && PaginationHelper.isIntegerString(page)) {
      validatedSearch.page = page
    }

    if (typeof productCategory === 'string') {
      validatedSearch.productCategory = productCategory
    }

    return validatedSearch
  },
  component: StorePage,
})
