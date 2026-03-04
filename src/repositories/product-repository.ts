import { API_ROUTES } from '@autoria/constants/api-routes'
import { apiClient } from '@autoria/services/api-service'
import { ITEMS_PER_PAGE } from '@autoria/constants/config'
import type {
  Pagination,
  Product,
  ProductByAdmin,
  ProductItem,
} from '@autoria/interfaces/api-responses.interface'

interface SetProductImagePayloadItem {
  productImageId?: string
  displayOrder: number
  file?: File
}

interface ListProductsParams {
  page?: number
  productCategoryId?: string
}

export class ProductRepository {
  static async findByIdForAdmin(productId: string) {
    return await apiClient.get<ProductByAdmin>(
      `${API_ROUTES.product.findByIdForAdmin}${productId}`,
    )
  }

  static async findById(productId: string) {
    return await apiClient.get<Product>(
      `${API_ROUTES.product.findById}${productId}`,
    )
  }

  static async setImages(
    productId: string,
    images: Array<SetProductImagePayloadItem>,
  ) {
    const formData = new FormData()

    images.forEach((item, index) => {
      if (item.productImageId) {
        formData.append(`images[${index}].Id`, item.productImageId)
      }

      if (item.file) {
        formData.append(`images[${index}].File`, item.file)
      }

      formData.append(
        `images[${index}].DisplayOrder`,
        item.displayOrder.toString(),
      )
    })

    return await apiClient.patch<void>(
      `${API_ROUTES.product.setImages}${productId}`,
      formData,
    )
  }

  static async listProducts(params: ListProductsParams) {
    return await apiClient.post<Pagination<ProductItem>>(
      API_ROUTES.product.findAll,
      {
        page: params.page,
        productCategoryId: params.productCategoryId,
        itemsPerPage: ITEMS_PER_PAGE,
      },
    )
  }

  static async listProductsForAdmin(params: ListProductsParams) {
    return await apiClient.post<Pagination<ProductByAdmin>>(
      API_ROUTES.product.findAllForAdmin,
      {
        page: params.page,
        productCategoryId: params.productCategoryId,
        itemsPerPage: ITEMS_PER_PAGE,
      },
    )
  }

  static async deleteProduct(productId: string) {
    await apiClient.delete(`${API_ROUTES.product.delete}${productId}`)
  }
}
