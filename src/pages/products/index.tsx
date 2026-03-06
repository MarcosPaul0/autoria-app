import { ListPagination } from "@autoria/components/api-pagination";
import { LinkButton } from "@autoria/components/link-button";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@autoria/components/table";
import { Toolbar } from "@autoria/components/toolbar";
import { APP_ROUTE } from "@autoria/constants/app-route";
import { QUERY_KEYS } from "@autoria/constants/query-keys";
import { FormatterHelper } from "@autoria/helpers/formatter-helper";
import { PaginationHelper } from "@autoria/helpers/pagination-helper";
import { ProductItem } from "@autoria/pages/products/components/product-item";
import { CollectionToggleGroup } from "@autoria/pages/store/components/collection-toggle-group";
import { ProductRepository } from "@autoria/repositories/product-repository";
import { PlusIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function ProductsPage() {
	const search = useSearch({ strict: false });

	const navigate = useNavigate();

	const page = PaginationHelper.toPositiveInteger(search.page);
	const productCategoryId = search.productCategory;

	const { data } = useQuery({
		queryKey: [QUERY_KEYS.productsForAdmin, page, productCategoryId],
		queryFn: async () => {
			const productsResponse = await ProductRepository.listProductsForAdmin({
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
				productionTime: FormatterHelper.toMinutes(
					product.productionTimeInMinutes,
				),
				category: product.category,
				imageUrl: product.productImages[0]?.imageUrl,
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

	function handleFilterByCategory(newProductCategoryId?: string) {
		navigate({
			replace: true,
			resetScroll: false,
			to: APP_ROUTE.private.products,
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

	function handlePageChange(nextPage: number) {
		if (nextPage === page) {
			return;
		}

		navigate({
			to: APP_ROUTE.private.products,
			search: (previous) => ({
				...previous,
				page: String(nextPage),
			}),
		});
	}

	return (
		<>
			<Toolbar page="Lista de produtos">
				<LinkButton to={APP_ROUTE.private.addProduct}>
					<PlusIcon />
					Novo produto
				</LinkButton>
			</Toolbar>

			<CollectionToggleGroup handleFilterByCategory={handleFilterByCategory} />

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead />

						<TableHead>Nome</TableHead>

						<TableHead>Coleção</TableHead>

						<TableHead>Preço</TableHead>

						<TableHead>Com desconto</TableHead>

						<TableHead>Produção</TableHead>

						<TableHead className="w-[100px] text-center">Ações</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{data?.products.map((product) => (
						<ProductItem
							key={product.id}
							product={{
								id: product.id,
								name: product.name,
								category: product.category,
								price: product.originalPrice,
								priceWithDiscount: product.priceWithDiscount,
								productionTime: product.productionTime,
								imageUrl: product.imageUrl,
							}}
						/>
					))}
				</TableBody>
			</Table>

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
		</>
	);
}
