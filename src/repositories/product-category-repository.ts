import { API_ROUTES } from '@autoria/constants/api-routes'
import { apiClient } from '@autoria/services/api-service'
import type {
  Pagination,
  ProductCategory,
} from '@autoria/interfaces/api-responses.interface'

export class ProductCategoryRepository {
  static async listAll() {
    return await apiClient.get<Pagination<ProductCategory>>(
      API_ROUTES.productCategory.findAll,
    )
  }

  static async findById(productCategoryId: string) {
    return await apiClient.get<ProductCategory>(
      `${API_ROUTES.productCategory.findById}${productCategoryId}`,
    )
  }

  static async delete(productCategoryId: string) {
    await apiClient.delete(
      `${API_ROUTES.productCategory.delete}${productCategoryId}`,
    )
  }
}
