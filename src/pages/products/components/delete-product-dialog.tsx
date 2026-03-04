import { Button, buttonVariants } from '@autoria/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@autoria/components/dialog'
import { HTTP_STATUS } from '@autoria/constants/http-status'
import { QUERY_KEYS } from '@autoria/constants/query-keys'
import { cn } from '@autoria/libs/cn'
import { ProductRepository } from '@autoria/repositories/product-repository'
import { ToastService } from '@autoria/services/toast-service'
import { errorHandler } from '@autoria/utils/errorHandler'
import { TrashIcon } from '@phosphor-icons/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { PaginationHelper } from '@autoria/helpers/pagination-helper'
import type { HttpStatus } from '@autoria/constants/http-status'
import type { QueryProducts } from '@autoria/interfaces/query-data.interface'

const DELETE_PRODUCT_ERROR = {
  [HTTP_STATUS.badRequest]:
    'Erro ao deletar o produto. Tente nvamente mais tarde!',
  [HTTP_STATUS.internal]:
    'Erro ao deletar o produto. Tente nvamente mais tarde!',
} as Record<HttpStatus, string>

const DELETE_PRODUCT_SUCCESS = 'Producto deletado com sucesso!'

interface DeleteProductDialogProps {
  productId: string
}

export function DeleteProductDialog({ productId }: DeleteProductDialogProps) {
  const search = useSearch({ strict: false })

  const page = PaginationHelper.toPositiveInteger(search.page)
  const productCategoryId = search.productCategory

  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['delete-product'],
    mutationFn: ProductRepository.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.products] })
      queryClient.setQueryData(
        [QUERY_KEYS.productsForAdmin, page, productCategoryId],
        (currentData: QueryProducts) => ({
          ...currentData,
          products: currentData.products.filter(
            (product) => product.id != productId,
          ),
        }),
      )
    },
  })

  async function handleDeleteProduct() {
    try {
      await mutateAsync(productId)

      ToastService.success(DELETE_PRODUCT_SUCCESS)
    } catch (error) {
      errorHandler(error, DELETE_PRODUCT_ERROR)
    }
  }

  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ size: 'icon' }))}>
        <TrashIcon />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja deletar o produto?</DialogTitle>

          <DialogDescription>
            Esta operação não poderá ser revertida e todos os dados referentes a
            ela serão permanentemente excluídos.
          </DialogDescription>
        </DialogHeader>

        <DialogClose asChild>
          <Button
            type="button"
            isLoading={isPending}
            onClick={handleDeleteProduct}
          >
            <TrashIcon />
            Deletar produto
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
