import { QUERY_KEYS } from '@autoria/constants/query-keys'
import { UpdateProductPage } from '@autoria/pages/products/update'
import { ProductCategoryPresenter } from '@autoria/presenters/product-category-presenter'
import { ProductCategoryRepository } from '@autoria/repositories/product-category-repository'
import { ProductRepository } from '@autoria/repositories/product-repository'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/produtos/editar/$productId')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData({
      queryKey: [QUERY_KEYS.productCategoryOptions],
      queryFn: async () => {
        const productCategoriesResponse =
          await ProductCategoryRepository.listAll()

        return ProductCategoryPresenter.optionsToUi(productCategoriesResponse)
      },
    })

    await context.queryClient.ensureQueryData({
      queryKey: ['product-for-admin', params.productId],
      queryFn: async () =>
        await ProductRepository.findByIdForAdmin(params.productId),
    })
  },
})

function RouteComponent() {
  const { productId } = Route.useParams()

  return <UpdateProductPage productId={productId} />
}
