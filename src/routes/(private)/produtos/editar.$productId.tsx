import { QUERY_KEYS } from "@autoria/constants/query-keys";
import { UpdateProductPage } from "@autoria/pages/products/update";
import { productCategoryToUiOptions } from "@autoria/presenters/product-category-presenter";
import { ProductRepository } from "@autoria/repositories/product/json-product-repository";
import { listAllProductCategoriesForAdmin } from "@autoria/repositories/product-category/json-product-category-repository";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/produtos/editar/$productId")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		await context.queryClient.ensureQueryData({
			queryKey: [QUERY_KEYS.productCategoryOptions],
			queryFn: async () => {
				const productCategoriesResponse =
					await listAllProductCategoriesForAdmin();

				return productCategoryToUiOptions(productCategoriesResponse);
			},
		});

		await context.queryClient.ensureQueryData({
			queryKey: [QUERY_KEYS.productsForAdmin, params.productId],
			queryFn: async () =>
				await ProductRepository.findByIdForAdmin(params.productId),
		});
	},
});

function RouteComponent() {
	const { productId } = Route.useParams();

	return <UpdateProductPage productId={productId} />;
}
