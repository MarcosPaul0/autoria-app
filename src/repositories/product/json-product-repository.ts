import { API_ROUTES } from "@autoria/constants/api-routes";
import { ITEMS_PER_PAGE } from "@autoria/constants/config";
import type {
	Pagination,
	Product,
	ProductForAdmin,
	ProductImage,
	ProductItem,
} from "@autoria/interfaces/api-responses.interface";
import { apiClient } from "@autoria/services/api-service";
import productByIdData from "../../../database/product-by-id.json";
import productsData from "../../../database/products.json";

type ProductListJsonItem = (typeof productsData.items)[number];
type ProductByIdJsonItem = (typeof productByIdData)[number];
type ProductImageJsonItem = ProductListJsonItem["productImage"];

function toProductImage(productImage: ProductImageJsonItem): ProductImage {
	return {
		id: productImage.id,
		imageUrl: productImage.imageUrl,
		displayOrder: productImage.displayOrder,
		createdAt: productImage.createdAt,
		updatedAt: productImage.updatedAt ?? productImage.createdAt,
	};
}

function getProductTimestamp(product: ProductByIdJsonItem): string {
	return product.productImages[0]?.createdAt ?? new Date(0).toISOString();
}

function toProduct(product: ProductByIdJsonItem): Product {
	const timestamp = getProductTimestamp(product);

	return {
		id: product.id,
		name: product.name,
		printDescription: product.printDescription,
		description: product.description,
		priceInCents: product.priceInCents,
		discountPercentage: product.discountPercentage,
		productCategoryId: product.productCategoryId,
		category: product.category,
		productImages: product.productImages.map(toProductImage),
		createdAt: timestamp,
		updatedAt: timestamp,
	};
}

function toProductForAdmin(product: ProductByIdJsonItem): ProductForAdmin {
	return {
		...toProduct(product),
		productionTimeInMinutes: 0,
		isActive: true,
		stockQuantity: 0,
	};
}

function toProductItem(product: ProductListJsonItem): ProductItem {
	return {
		id: product.id,
		name: product.name.trim(),
		priceInCents: product.priceInCents,
		discountPercentage: product.discountPercentage,
		productCategoryId: product.productCategoryId,
		category: product.category,
		productImage: toProductImage(product.productImage),
	};
}

function paginateItems<T>(
	items: Array<T>,
	page = 1,
	itemsPerPage = ITEMS_PER_PAGE,
): Pagination<T> {
	const safePage = page > 0 ? page : 1;
	const safeItemsPerPage = itemsPerPage > 0 ? itemsPerPage : ITEMS_PER_PAGE;
	const totalItems = items.length;
	const totalPages =
		totalItems === 0 ? 1 : Math.ceil(totalItems / safeItemsPerPage);
	const boundedPage = Math.min(safePage, totalPages);
	const startIndex = (boundedPage - 1) * safeItemsPerPage;
	const paginatedItems = items.slice(startIndex, startIndex + safeItemsPerPage);

	return {
		items: paginatedItems,
		totalItems,
		totalPages,
		itemsPerPage: safeItemsPerPage,
		page: boundedPage,
		hasPrevious: boundedPage > 1,
		hasNext: boundedPage < totalPages,
	};
}

function filterProductsByCategory<T extends { productCategoryId: string }>(
	items: Array<T>,
	productCategoryId?: string,
) {
	if (!productCategoryId) {
		return items;
	}

	return items.filter((item) => item.productCategoryId === productCategoryId);
}

function findProductInDetailData(productId: string) {
	const product = productByIdData.find((item) => item.id === productId);

	if (!product) {
		throw new Error(`Product not found: ${productId}`);
	}

	return product;
}

async function findProductByIdForAdmin(
	productId: string,
): Promise<ProductForAdmin> {
	return toProductForAdmin(findProductInDetailData(productId));
}

async function findProductById(productId: string): Promise<Product> {
	return toProduct(findProductInDetailData(productId));
}

interface SetProductImagePayloadItem {
	productImageId?: string;
	displayOrder: number;
	file?: File;
}

async function setProductImages(
	productId: string,
	images: Array<SetProductImagePayloadItem>,
) {
	const formData = new FormData();

	images.forEach((item, index) => {
		if (item.productImageId) {
			formData.append(`images[${index}].Id`, item.productImageId);
		}

		if (item.file) {
			formData.append(`images[${index}].File`, item.file);
		}

		formData.append(
			`images[${index}].DisplayOrder`,
			item.displayOrder.toString(),
		);
	});

	return await apiClient.patch<void>(
		`${API_ROUTES.product.setImages}${productId}`,
		formData,
	);
}

interface ListProductsParams {
	page?: number;
	productCategoryId?: string;
}

async function listProducts(
	params: ListProductsParams,
): Promise<Pagination<ProductItem>> {
	const filteredProducts = filterProductsByCategory(
		productsData.items,
		params.productCategoryId,
	).map(toProductItem);

	return paginateItems(filteredProducts, params.page);
}

async function listProductsForAdmin(
	params: ListProductsParams,
): Promise<Pagination<ProductForAdmin>> {
	const filteredProducts = filterProductsByCategory(
		productByIdData,
		params.productCategoryId,
	).map(toProductForAdmin);

	return paginateItems(filteredProducts, params.page);
}

async function deleteProduct(productId: string) {
	await apiClient.delete(`${API_ROUTES.product.delete}${productId}`);
}

interface CalculateProductShippingParams {
	productId: string;
	postalCode: string;
}

export interface CalculateProductShippingResponse {
	shippingPriceInCents: number;
	estimationDeliveryDate: string;
}

async function calculateProductShipping({
	postalCode,
	productId,
}: CalculateProductShippingParams) {
	const shippingResponse =
		await apiClient.post<CalculateProductShippingResponse>(
			API_ROUTES.product.calculateShipping,
			{
				productId,
				destinationPostalCode: postalCode,
			},
		);

	return shippingResponse;
}

export {
	findProductByIdForAdmin,
	findProductById,
	setProductImages,
	listProducts,
	listProductsForAdmin,
	deleteProduct,
	calculateProductShipping,
};

export const ProductRepository = {
	findById: findProductById,
	findByIdForAdmin: findProductByIdForAdmin,
	listProducts,
	listProductsForAdmin,
	setImages: setProductImages,
	deleteProduct,
	calculateProductShipping,
};
