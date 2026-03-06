import { ListPagination } from "@autoria/components/api-pagination";
import { APP_ROUTE } from "@autoria/constants/app-route";
import { LANDING_PAGE_SECTIONS } from "@autoria/constants/landing-page-sections";
import { QUERY_KEYS } from "@autoria/constants/query-keys";
import { FormatterHelper } from "@autoria/helpers/formatter-helper";
import { PaginationHelper } from "@autoria/helpers/pagination-helper";
import { ProductCardSkeleton } from "@autoria/pages/products/components/product-card-skeleton";
import { ProductRepository } from "@autoria/repositories/product-repository";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ProductCard } from "../../products/components/product-card";
import { CollectionToggleGroup } from "./collection-toggle-group";

export function ProductsSection() {
	const search = useSearch({ strict: false });

	const navigate = useNavigate();

	const page = PaginationHelper.toPositiveInteger(search.page);
	const productCategoryId = search.productCategory;

	const { data, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.products, page, productCategoryId],
		placeholderData: keepPreviousData,
		queryFn: async () => {
			const productsResponse = await ProductRepository.listProducts({
				page,
				productCategoryId,
			});

			const products = productsResponse.items.map((product) => ({
				id: product.id,
				name: product.name,
				originalPrice: FormatterHelper.toReal(product.priceInCents),
				priceWithDiscount: FormatterHelper.toRealWithDiscount(
					product.priceInCents,
					product.discountPercentage,
				),
				category: product.category,
				imageUrl: product.productImage.imageUrl,
			}));

			return {
				products,
				totalItems: productsResponse.totalItems,
				totalPages: productsResponse.totalPages,
				page: productsResponse.page,
				hasNext: productsResponse.hasNext,
				hasPrevious: productsResponse.hasPrevious,
				itemsPerPage: productsResponse.itemsPerPage,
			};
		},
	});

	function handlePageChange(nextPage: number) {
		if (nextPage === page) {
			return;
		}

		navigate({
			to: "/",
			search: (previous) => ({
				...previous,
				page: String(nextPage),
			}),
			hash: LANDING_PAGE_SECTIONS.products,
		});
	}

	function handleFilterByCategory(newProductCategoryId?: string) {
		navigate({
			replace: true,
			resetScroll: false,
			from: APP_ROUTE.public.landingPage,
			search: (prev) => {
				if (prev.page) {
					delete prev.page;
				}

				if (!newProductCategoryId || newProductCategoryId === "") {
					delete prev.productCategory;

					return prev;
				}

				return {
					...prev,
					productCategory: newProductCategoryId,
				};
			},
		});
	}

	return (
		<section
			className="max-w-[1920px] bg-background mx-auto my-0 py-6 sm:py-20 px-2 sm:px-28 flex flex-col items-center w-full"
			id={LANDING_PAGE_SECTIONS.products}
		>
			<h2 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8 text-primary">
				Explore alguns de nossos produtos
			</h2>

			<CollectionToggleGroup handleFilterByCategory={handleFilterByCategory} />

			<div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-6 mt-6 sm:mt-8">
				{isLoading
					? Array.from({ length: 12 }).map((_, index) => (
							<ProductCardSkeleton
								key={`product-card-skeleton-${
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									index
								}`}
							/>
						))
					: data?.products.map((product) => (
							<ProductCard
								key={product.id}
								product={{
									id: product.id,
									category: product.category,
									name: product.name,
									price: product.originalPrice,
									priceWithDiscount: product.priceWithDiscount,
									imageUrl: product.imageUrl,
								}}
							/>
						))}
			</div>

			{data && (
				<ListPagination
					pagination={{
						page: data.page,
						totalPages: data.totalPages,
						hasNext: data.hasNext,
						hasPrevious: data.hasPrevious,
					}}
					onPageChange={handlePageChange}
				/>
			)}
		</section>
	);
}
