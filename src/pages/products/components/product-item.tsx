import { ImagesIcon, PencilIcon } from '@phosphor-icons/react'
import memoriasDeMinas from '@autoria/assets/images/memorias-de-minas.png'
import { TableCell, TableRow } from '@autoria/components/table'
import { LinkButton } from '@autoria/components/link-button'
import { APP_ROUTE } from '@autoria/constants/app-route'
import { DeleteProductDialog } from './delete-product-dialog'

interface ProductItemProps {
  product: {
    id: string
    price: string
    priceWithDiscount: string
    category: string
    name: string
    productionTime: string
    imageUrl?: string
  }
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <TableRow>
      <TableCell>
        <img
          src={product.imageUrl ? product.imageUrl : memoriasDeMinas}
          className="h-[60px] w-[60px] rounded-2xl object-cover"
          alt="logo"
        />
      </TableCell>

      <TableCell>{product.name}</TableCell>

      <TableCell>{product.category}</TableCell>

      <TableCell>{product.price}</TableCell>

      <TableCell>{product.priceWithDiscount}</TableCell>

      <TableCell>{product.productionTime}</TableCell>

      <TableCell>
        <LinkButton
          to={APP_ROUTE.private.updateProduct}
          params={{ productId: product.id }}
          size="icon"
        >
          <PencilIcon />
        </LinkButton>

        <LinkButton
          to={APP_ROUTE.private.imagesProduct}
          params={{ productId: product.id }}
          size="icon"
        >
          <ImagesIcon />
        </LinkButton>

        <DeleteProductDialog productId={product.id} />
      </TableCell>
    </TableRow>
  )
}
