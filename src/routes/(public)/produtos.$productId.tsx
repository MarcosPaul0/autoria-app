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
		const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
		const title = loaderData?.name
			? `${loaderData.name} - Autoria | Personalizados & Presentes`
			: "Autoria | Personalizados & Presentes";
		const description =
			loaderData?.printDescription ??
			"Conheça nossos produtos personalizados - Autoria | Personalizados & Presentes.";
		const productImageUrl = loaderData?.productImages[0]?.imageUrl?.trim();
		const productUrl =
			siteUrl && loaderData?.id
				? `${siteUrl}/produtos/${loaderData.id}`
				: undefined;

		const meta = [
			{ title },
			{ name: "description", content: description },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:type", content: "product" },
			{ property: "og:url", content: productUrl },
			{ property: "og:image", content: productImageUrl },
			{ property: "og:image:secure_url", content: productImageUrl },
			{ property: "og:image:alt", content: loaderData?.name },
			{ property: "og:image:width", content: "900" },
			{ property: "og:image:height", content: "600" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: productImageUrl },
		].filter((item) => typeof item.content !== "undefined" || "title" in item);

		return {
			meta,
			links: productUrl
				? [
						{
							rel: "canonical",
							href: productUrl,
						},
					]
				: [],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Product",
						name: loaderData?.name,
						description: loaderData?.printDescription,
						image: productImageUrl,
						url: productUrl,
					}),
				},
			],
		};
	},
});

function RouteComponent() {
	const { productId } = Route.useParams();

	return <ProductPage productId={productId} />;
}
