import { QUERY_KEYS } from "@autoria/constants/query-keys";
import { PaginationHelper } from "@autoria/helpers/pagination-helper";
import {
	buildCanonicalUrl,
	buildPageHead,
	FAQ_ENTRIES,
} from "@autoria/libs/seo";
import { StorePage } from "@autoria/pages/store";
import { productCategoryToUiOptions } from "@autoria/presenters/product-category-presenter";
import { listAllProductCategories } from "@autoria/repositories/product-category-repository";
import { createFileRoute } from "@tanstack/react-router";

export interface ProductSearch {
	page?: string;
	productCategory?: string;
}

export const Route = createFileRoute("/(public)/")({
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData({
			queryKey: [QUERY_KEYS.productCategoryOptions],
			queryFn: async () => {
				const productCategoriesResponse = await listAllProductCategories();

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
	head: () => {
		const canonicalUrl = buildCanonicalUrl("/");

		return buildPageHead({
			title: "Autoria | Personalizados & Presentes",
			description:
				"Compre presentes personalizados, canecas criativas e lembrancas autorais feitas sob encomenda para datas especiais e momentos inesqueciveis.",
			path: "/",
			structuredData: [
				{
					"@context": "https://schema.org",
					"@type": "WebSite",
					name: "Autoria",
					url: canonicalUrl,
					inLanguage: "pt-BR",
				},
				{
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: FAQ_ENTRIES.map((item) => ({
						"@type": "Question",
						name: item.question,
						acceptedAnswer: {
							"@type": "Answer",
							text: item.answer,
						},
					})),
				},
			],
		});
	},
	component: StorePage,
});
