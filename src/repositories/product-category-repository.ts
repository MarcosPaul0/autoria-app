import { API_ROUTES } from "@autoria/constants/api-routes";
import type {
	Pagination,
	ProductCategory,
	ProductCategoryForAdmin,
} from "@autoria/interfaces/api-responses.interface";
import { apiClient } from "@autoria/services/api-service";

async function listAllProductCategories() {
	return await apiClient.get<Pagination<ProductCategory>>(
		API_ROUTES.productCategory.findAll,
	);
}

async function listAllProductCategoriesForAdmin() {
	return await apiClient.get<Pagination<ProductCategoryForAdmin>>(
		API_ROUTES.productCategory.findAllForAdmin,
	);
}

async function findProductCategoryById(productCategoryId: string) {
	return await apiClient.get<ProductCategory>(
		`${API_ROUTES.productCategory.findById}${productCategoryId}`,
	);
}

async function findProductCategoryByIdForAdmin(productCategoryId: string) {
	return await apiClient.get<ProductCategoryForAdmin>(
		`${API_ROUTES.productCategory.findByIdForAdmin}${productCategoryId}`,
	);
}

async function deleteProductCategory(productCategoryId: string) {
	await apiClient.delete(
		`${API_ROUTES.productCategory.delete}${productCategoryId}`,
	);
}

export {
	listAllProductCategories,
	listAllProductCategoriesForAdmin,
	findProductCategoryByIdForAdmin,
	findProductCategoryById,
	deleteProductCategory,
};
