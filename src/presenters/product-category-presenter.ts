import { FormatterHelper } from '@autoria/helpers/formatter-helper'
import type {
  Pagination,
  ProductCategory,
} from '@autoria/interfaces/api-responses.interface'

export class ProductCategoryPresenter {
  static optionsToUi(productCategoriesResponse: Pagination<ProductCategory>) {
    return productCategoriesResponse.items.map((productCategory) => ({
      value: productCategory.id,
      label: productCategory.category,
    }))
  }

  static toUi(productCategoryResponse: ProductCategory) {
    return {
      id: productCategoryResponse.id,
      category: productCategoryResponse.category,
      createdAt: FormatterHelper.toLongDate(productCategoryResponse.createdAt),
      productCount: productCategoryResponse.productCount,
    }
  }

  static listToUi(productCategoriesResponse: Pagination<ProductCategory>) {
    return productCategoriesResponse.items.map(this.toUi)
  }
}
