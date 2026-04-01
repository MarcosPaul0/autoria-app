import { QUERY_KEYS } from "@autoria/constants/query-keys";
import { ProductImagesPage } from "@autoria/pages/products/images";
import { ProductRepository } from "@autoria/repositories/product-repository";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/produtos/imagens/$productId")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		await context.queryClient.ensureQueryData({
			queryKey: [QUERY_KEYS.productsForAdmin, params.productId],
			queryFn: async () =>
				await ProductRepository.findByIdForAdmin(params.productId),
		});
	},
});

function RouteComponent() {
	const { productId } = Route.useParams();

	return <ProductImagesPage productId={productId} />;
}
