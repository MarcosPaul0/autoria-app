import { QUERY_KEYS } from "@autoria/constants/query-keys";
import { PaginationHelper } from "@autoria/helpers/pagination-helper";
import { ProductsPage } from "@autoria/pages/products";
import { productCategoryToUiOptions } from "@autoria/presenters/product-category-presenter";
import { listAllProductCategoriesForAdmin } from "@autoria/repositories/product-category-repository";
import type { ProductSearch } from "@autoria/routes/(public)";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/produtos/")({
	component: ProductsPage,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData({
			queryKey: [QUERY_KEYS.productCategoryOptions],
			queryFn: async () => {
				const productCategoriesResponse =
					await listAllProductCategoriesForAdmin();

				return productCategoryToUiOptions(productCategoriesResponse);
			},
		});
	},
	validateSearch: (search): ProductSearch => {
		const page = search.page;
		const productCategory = search.productCategory;

		const validatedSearch: ProductSearch = {};

		if (typeof page === "string" && PaginationHelper.isIntegerString(page)) {
			validatedSearch.page = page;
		}

		if (typeof productCategory === "string") {
			validatedSearch.productCategory = productCategory;
		}

		return validatedSearch;
	},
});
