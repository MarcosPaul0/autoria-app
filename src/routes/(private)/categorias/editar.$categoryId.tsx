import { UpdateCategoryPage } from '@autoria/pages/categories/update'
import { ProductCategoryRepository } from '@autoria/repositories/product-category-repository'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(private)/categorias/editar/$categoryId',
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ['product-category', params.categoryId],
      queryFn: async () =>
        ProductCategoryRepository.findById(params.categoryId),
    })
  },
})

function RouteComponent() {
  const { categoryId } = Route.useParams()

  return <UpdateCategoryPage categoryId={categoryId} />
}
