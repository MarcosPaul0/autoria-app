export interface Pagination<T> {
	items: Array<T>;
	totalItems: number;
	totalPages: number;
	page: number;
	hasNext: boolean;
	hasPrevious: boolean;
	itemsPerPage: number;
}

export interface Entity {
	id: string;
	createdAt: string;
	updatedAt: string;
}

export interface ProductImage extends Entity {
	imageUrl: string;
	displayOrder: number;
}

export interface Product extends Entity {
	name: string;
	printDescription: string;
	description: string;
	priceInCents: number;
	discountPercentage: number;
	productCategoryId: string;
	category: string;
	productImages: Array<ProductImage>;
}

export interface ProductForAdmin extends Product {
	productionTimeInMinutes: number;
	isActive: boolean;
	stockQuantity: number;
}

export interface ProductItem {
	id: string;
	name: string;
	priceInCents: number;
	discountPercentage: number;
	productCategoryId: string;
	category: string;
	productImage: ProductImage;
}

export interface ProductCategory extends Entity {
	category: string;
}

export interface ProductCategoryForAdmin extends ProductCategory {
	isActive: boolean;
	productCount: number;
}
