import { FormatterHelper } from "@autoria/helpers/formatter-helper";
import type {
	Pagination,
	ProductCategory,
	ProductCategoryForAdmin,
} from "@autoria/interfaces/api-responses.interface";

function productCategoryToUiOptions(
	productCategoriesResponse:
		| Pagination<ProductCategoryForAdmin>
		| Pagination<ProductCategory>,
) {
	return productCategoriesResponse.items.map((productCategory) => ({
		value: productCategory.id,
		label: productCategory.category,
	}));
}

function productCategoryToUi(productCategoryResponse: ProductCategory) {
	return {
		id: productCategoryResponse.id,
		category: productCategoryResponse.category,
		createdAt: FormatterHelper.toLongDate(productCategoryResponse.createdAt),
	};
}

function productCategoryListToUi(
	productCategoriesResponse: Pagination<ProductCategory>,
) {
	return productCategoriesResponse.items.map(productCategoryToUi);
}

function productCategoryForAdminToUi(
	productCategoryResponse: ProductCategoryForAdmin,
) {
	return {
		id: productCategoryResponse.id,
		category: productCategoryResponse.category,
		isActive: productCategoryResponse.isActive,
		createdAt: FormatterHelper.toLongDate(productCategoryResponse.createdAt),
		productCount: productCategoryResponse.productCount,
	};
}

function productCategoryForAdminListToUi(
	productCategoriesResponse: Pagination<ProductCategoryForAdmin>,
) {
	return productCategoriesResponse.items.map(productCategoryForAdminToUi);
}

export {
	productCategoryToUiOptions,
	productCategoryToUi,
	productCategoryListToUi,
	productCategoryForAdminToUi,
	productCategoryForAdminListToUi,
};
