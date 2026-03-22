import { buildCanonicalUrl, buildPageHead, SITE_NAME } from "@autoria/libs/seo";
import { ProductPage } from "@autoria/pages/products/product";
import { ProductPresenter } from "@autoria/presenters/product-presenter";
import { ProductRepository } from "@autoria/repositories/product-repository";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/produtos/$productId")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		return await context.queryClient.ensureQueryData({
			queryKey: ["product", params.productId],
			queryFn: async () => {
				const productResponse = await ProductRepository.findById(
					params.productId,
				);

				return ProductPresenter.toUi(productResponse);
			},
		});
	},
	head: ({ loaderData }) => {
		const title = loaderData?.name ? `${loaderData.name} | Autoria` : SITE_NAME;
		const description =
			loaderData?.printDescription ??
			"Conheca nossos produtos personalizados e presentes criativos da Autoria.";
		const productImageUrl = loaderData?.productImages[0]?.imageUrl?.trim();
		const productImages = loaderData?.productImages
			.map((item) => item.imageUrl?.trim())
			.filter(Boolean);
		const productPath = loaderData?.id
			? `/produtos/${loaderData.id}`
			: undefined;
		const productUrl = productPath ? buildCanonicalUrl(productPath) : undefined;
		const productPrice = loaderData
			? Number(
					(
						(loaderData.priceInCents * (100 - loaderData.discountPercentage)) /
						10000
					).toFixed(2),
				)
			: undefined;

		return buildPageHead({
			title,
			description,
			path: productPath,
			type: "product",
			imageUrl: productImageUrl,
			structuredData: [
				{
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [
						{
							"@type": "ListItem",
							position: 1,
							name: "Inicio",
							item: buildCanonicalUrl("/"),
						},
						{
							"@type": "ListItem",
							position: 2,
							name: loaderData?.name,
							item: productUrl,
						},
					].filter((item) => item.item && item.name),
				},
				{
					"@context": "https://schema.org",
					"@type": "Product",
					name: loaderData?.name,
					description,
					image: productImages,
					category: loaderData?.category,
					sku: loaderData?.id,
					url: productUrl,
					brand: {
						"@type": "Brand",
						name: "Autoria",
					},
					offers: productPrice
						? {
								"@type": "Offer",
								priceCurrency: "BRL",
								price: productPrice,
								url: productUrl,
								itemCondition: "https://schema.org/NewCondition",
								seller: {
									"@type": "Organization",
									name: "Autoria",
								},
							}
						: undefined,
				},
			],
		});
	},
});

function RouteComponent() {
	const { productId } = Route.useParams();

	return <ProductPage productId={productId} />;
}
