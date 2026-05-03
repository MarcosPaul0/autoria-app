import type {
	Pagination,
	ProductCategory,
	ProductCategoryForAdmin,
} from "@autoria/interfaces/api-responses.interface";
import productCategoryData from "../../../database/product-category.json";

type ProductCategoryJsonItem = (typeof productCategoryData.items)[number];

function toProductCategory(
	productCategory: ProductCategoryJsonItem,
): ProductCategory {
	return {
		id: productCategory.id,
		category: productCategory.category,
		createdAt: productCategory.createdAt,
		updatedAt: productCategory.createdAt,
	};
}

function toProductCategoryForAdmin(
	productCategory: ProductCategoryJsonItem,
): ProductCategoryForAdmin {
	return {
		...toProductCategory(productCategory),
		isActive: true,
		productCount: 0,
	};
}

async function listAllProductCategories(): Promise<
	Pagination<ProductCategory>
> {
	return {
		...productCategoryData,
		items: productCategoryData.items.map(toProductCategory),
	};
}

async function listAllProductCategoriesForAdmin(): Promise<
	Pagination<ProductCategoryForAdmin>
> {
	return {
		...productCategoryData,
		items: productCategoryData.items.map(toProductCategoryForAdmin),
	};
}

async function findProductCategoryById(
	productCategoryId: string,
): Promise<ProductCategory> {
	const productCategory = productCategoryData.items.find(
		(item) => item.id === productCategoryId,
	);

	if (!productCategory) {
		throw new Error(`Product category not found: ${productCategoryId}`);
	}

	return toProductCategory(productCategory);
}

async function findProductCategoryByIdForAdmin(
	productCategoryId: string,
): Promise<ProductCategoryForAdmin> {
	const productCategory = productCategoryData.items.find(
		(item) => item.id === productCategoryId,
	);

	if (!productCategory) {
		throw new Error(`Product category not found: ${productCategoryId}`);
	}

	return toProductCategoryForAdmin(productCategory);
}

async function deleteProductCategory(productCategoryId: string) {
	const productCategory = productCategoryData.items.find(
		(item) => item.id === productCategoryId,
	);

	if (!productCategory) {
		throw new Error(`Product category not found: ${productCategoryId}`);
	}
}

export {
	listAllProductCategories,
	listAllProductCategoriesForAdmin,
	findProductCategoryByIdForAdmin,
	findProductCategoryById,
	deleteProductCategory,
};
