import { PencilIcon } from '@phosphor-icons/react'
import { TableCell, TableRow } from '@autoria/components/table'
import { LinkButton } from '@autoria/components/link-button'
import { APP_ROUTE } from '@autoria/constants/app-route'
import { DeleteProductCategoryDialog } from './delete-product-category'

interface CategoryItemProps {
  productCategory: {
    id: string
    category: string
    productsCount: number
    createdAt: string
  }
}

export function CategoryItem({ productCategory }: CategoryItemProps) {
  return (
    <TableRow>
      <TableCell>{productCategory.category}</TableCell>

      <TableCell>{productCategory.productsCount}</TableCell>

      <TableCell>{productCategory.createdAt}</TableCell>

      <TableCell>
        <LinkButton
          to={APP_ROUTE.private.updateCategory}
          params={{ categoryId: productCategory.id }}
          size="icon"
        >
          <PencilIcon />
        </LinkButton>

        <DeleteProductCategoryDialog productCategoryId={productCategory.id} />
      </TableCell>
    </TableRow>
  )
}
