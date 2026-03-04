import { QUERY_KEYS } from '@autoria/constants/query-keys'
import { RegisterProductPage } from '@autoria/pages/products/register'
import { ProductCategoryPresenter } from '@autoria/presenters/product-category-presenter'
import { ProductCategoryRepository } from '@autoria/repositories/product-category-repository'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/produtos/registrar')({
  component: RegisterProductPage,
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
})
