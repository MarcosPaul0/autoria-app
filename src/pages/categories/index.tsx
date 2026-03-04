import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@autoria/components/table'
import { Toolbar } from '@autoria/components/toolbar'
import { LinkButton } from '@autoria/components/link-button'
import { APP_ROUTE } from '@autoria/constants/app-route'
import { PlusIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { ProductCategoryRepository } from '@autoria/repositories/product-category-repository'
import { ProductCategoryPresenter } from '@autoria/presenters/product-category-presenter'
import { QUERY_KEYS } from '@autoria/constants/query-keys'
import { CategoryItem } from './components/category-item'

export function CategoriesPage() {
  const { data: productCategoriesData } = useQuery({
    queryKey: [QUERY_KEYS.productCategories],
    queryFn: async () => {
      const productCategoriesResponse =
        await ProductCategoryRepository.listAll()

      return ProductCategoryPresenter.listToUi(productCategoriesResponse)
    },
  })

  return (
    <>
      <Toolbar page="Lista de categorias">
        <LinkButton to={APP_ROUTE.private.addCategory}>
          <PlusIcon />
          Nova categoria
        </LinkButton>
      </Toolbar>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Categoria</TableHead>

            <TableHead>Produtos</TableHead>

            <TableHead>Registro</TableHead>

            <TableHead className="w-[100px] text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {productCategoriesData?.map((productCategory) => (
            <CategoryItem
              key={productCategory.id}
              productCategory={{
                id: productCategory.id,
                category: productCategory.category,
                productsCount: productCategory.productCount,
                createdAt: productCategory.createdAt,
              }}
            />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
