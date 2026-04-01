import { Separator } from "@autoria/components/separator";
import { Toolbar } from "@autoria/components/toolbar";
import type { AppRoutes } from "@autoria/constants/app-route";
import { APP_ROUTE } from "@autoria/constants/app-route";
import { LANDING_PAGE_SECTIONS } from "@autoria/constants/landing-page-sections";
import type { ProductImage } from "@autoria/interfaces/api-responses.interface";
import { ProductPresenter } from "@autoria/presenters/product-presenter";
import { ProductRepository } from "@autoria/repositories/product-repository";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import { WhatsappProductLink } from "./components/whatsapp-product-link";

interface ProductPageProps {
	productId: string;
}

const markdownComponents: Components = {
	h1: ({ children }) => (
		<h1 className="text-lg sm:text-2xl font-bold mt-4 mb-2 first:mt-0">
			{children}
		</h1>
	),
	h2: ({ children }) => (
		<h2 className="text-base sm:text-xl font-bold mt-4 mb-2 first:mt-0">
			{children}
		</h2>
	),
	h3: ({ children }) => (
		<h3 className="text-base sm:text-lg font-bold mt-3 mb-2 first:mt-0">
			{children}
		</h3>
	),
	p: ({ children }) => (
		<p className="text-sm sm:text-base leading-relaxed text-foreground mb-3 last:mb-0">
			{children}
		</p>
	),
	strong: ({ children }) => (
		<strong className="font-bold text-foreground">{children}</strong>
	),
	em: ({ children }) => <em className="italic">{children}</em>,
	ul: ({ children }) => (
		<ul className="list-disc pl-5 sm:pl-6 mb-3 space-y-1">{children}</ul>
	),
	ol: ({ children }) => (
		<ol className="list-decimal pl-5 sm:pl-6 mb-3 space-y-1">{children}</ol>
	),
	li: ({ children }) => (
		<li className="text-sm sm:text-base leading-relaxed">{children}</li>
	),
	a: ({ children, href }) => (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
		>
			{children}
		</a>
	),
	blockquote: ({ children }) => (
		<blockquote className="border-l-4 border-primary/30 pl-3 sm:pl-4 py-1 italic text-muted-foreground mb-3">
			{children}
		</blockquote>
	),
};

export function ProductPage({ productId }: ProductPageProps) {
	const { data: productData } = useSuspenseQuery({
		queryKey: ["product", productId],
		queryFn: async () => {
			const productResponse = await ProductRepository.findById(productId);

			return ProductPresenter.toUi(productResponse);
		},
	});

	const [imageSelected, setImageSelected] = useState<ProductImage | null>(
		() => {
			if (productData.productImages.length === 0) {
				return null;
			}

			return productData.productImages[0];
		},
	);

	return (
		<section className="max-w-[1920px] bg-background w-full px-4 py-4 sm:px-28 sm:py-16 my-0 mx-auto flex flex-col gap-5">
			<Toolbar
				links={[
					{
						label: "Lista de produtos",
						link: `${APP_ROUTE.public.landingPage}#${LANDING_PAGE_SECTIONS.products}` as AppRoutes,
					},
				]}
				page={productData.name}
			/>

			<div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-8">
				<div className="flex sm:flex-col gap-2 w-[80px] sm:w-[132px]">
					{productData.productImages.map((productImage) => (
						<img
							src={productImage.imageUrl}
							alt={productData.name}
							key={productImage.id}
							className="object-cover h-[70px] w-[70px] sm:h-[132px] sm:w-[132px] bg-product-image rounded-2xl"
							onMouseEnter={() => setImageSelected(productImage)}
							onClick={() => setImageSelected(productImage)}
							onKeyUp={() => setImageSelected(productImage)}
						/>
					))}
				</div>

				{imageSelected && (
					<img
						src={imageSelected.imageUrl}
						alt={productData.name}
						key={imageSelected.id}
						className="object-cover w-full sm:h-[692px] sm:w-[692px] bg-product-image rounded-2xl"
					/>
				)}

				<div className="max-w-2xl w-full flex flex-col gap-4 my-4">
					<h1 className="text-lg sm:text-2xl font-bold">{productData.name}</h1>

					<Separator />

					<ReactMarkdown components={markdownComponents}>
						{productData.printDescription}
					</ReactMarkdown>

					<div className="flex items-center gap-1 mt-0 sm:mt-6 mb-2">
						<span className="text-xl text-das line-through">
							{productData.originalPrice}
						</span>
						<strong className="text-3xl font-bold">
							{productData.priceWithDiscount}
						</strong>
					</div>

					<WhatsappProductLink productName={productData.name} />
				</div>
			</div>

			<article className="bg-muted p-2 sm:p-6 text-base">
				<ReactMarkdown components={markdownComponents}>
					{productData.description}
				</ReactMarkdown>
			</article>
		</section>
	);
}
