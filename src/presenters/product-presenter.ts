import { FormatterHelper } from '@autoria/helpers/formatter-helper'
import type { Product } from '@autoria/interfaces/api-responses.interface'

export class ProductPresenter {
  static toUi(product: Product) {
    return {
      id: product.id,
      name: product.name,
      printDescription: product.printDescription,
      description: product.description,
      originalPrice: FormatterHelper.toReal(product.priceInCents),
      priceWithDiscount: FormatterHelper.toRealWithDiscount(
        product.priceInCents,
        product.discountPercentage,
      ),
      category: product.category,
      productImages: product.productImages,
    }
  }
}
