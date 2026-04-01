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
import { productCategoryForAdminListToUi } from "@autoria/presenters/product-category-presenter";
import { listAllProductCategoriesForAdmin } from "@autoria/repositories/product-category-repository";
import { PlusIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { ProductCategoryItem } from "./components/product-category-item";

export function CategoriesPage() {
	const { data: productCategoriesData } = useQuery({
		queryKey: [QUERY_KEYS.productCategoriesForAdmin],
		queryFn: async () => {
			const productCategoriesResponse =
				await listAllProductCategoriesForAdmin();

			return productCategoryForAdminListToUi(productCategoriesResponse);
		},
	});

	return (
		<>
			<Toolbar page="Lista de categorias">
				<LinkButton to={APP_ROUTE.private.addCategory}>
					<PlusIcon />
					Nova categoria
				</LinkButton>
			</Toolbar>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Categoria</TableHead>

						<TableHead>Produtos</TableHead>

						<TableHead>Status</TableHead>

						<TableHead>Registro</TableHead>

						<TableHead className="w-[100px] text-center">Ações</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{productCategoriesData?.map((productCategory) => (
						<ProductCategoryItem
							key={productCategory.id}
							productCategory={{
								id: productCategory.id,
								category: productCategory.category,
								isActive: productCategory.isActive,
								productsCount: productCategory.productCount,
								createdAt: productCategory.createdAt,
							}}
						/>
					))}
				</TableBody>
			</Table>
		</>
	);
}
