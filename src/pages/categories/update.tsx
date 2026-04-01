import { Button } from "@autoria/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@autoria/components/card";
import { FormInput } from "@autoria/components/form-input";
import { FormSwitch } from "@autoria/components/form-switch";
import { Toolbar } from "@autoria/components/toolbar";
import { API_ROUTES } from "@autoria/constants/api-routes";
import { APP_ROUTE } from "@autoria/constants/app-route";
import type { HttpStatus } from "@autoria/constants/http-status";
import { HTTP_STATUS } from "@autoria/constants/http-status";
import { QUERY_KEYS } from "@autoria/constants/query-keys";
import { FormatterHelper } from "@autoria/helpers/formatter-helper";
import { findProductCategoryByIdForAdmin } from "@autoria/repositories/product-category-repository";
import { apiClient } from "@autoria/services/api-service";
import { ToastService } from "@autoria/services/toast-service";
import { errorHandler } from "@autoria/utils/errorHandler";
import { useForm, useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import type { SubmitEvent } from "react";
import * as z from "zod";

const updateCategoryFormSchema = z.object({
	category: z
		.string()
		.min(5, "Categoria deve ter no mínimo 5 caracteres")
		.max(100, "Categoria deve ter no máximo 100 caracteres"),
	isActive: z.boolean(),
});

const UPDATE_PRODUCT_CATEGORY_SUCCESS_MESSAGE =
	"Nova coleção registrada com sucesso!";

const UPDATE_PRODUCT_CATEGORY_ERROR_MESSAGES = {
	[HTTP_STATUS.unauthorized]: "Ocorreu um erro ao atualizar a categoria!",
	[HTTP_STATUS.badRequest]: "Ocorreu um erro ao atualizar a categoria!",
	[HTTP_STATUS.internal]:
		"Ocorreu algum erro inesperado. Tente novamente mais tarde.",
} as Record<HttpStatus, string>;

interface UpdateCategoryPageProps {
	categoryId: string;
}

export function UpdateCategoryPage({ categoryId }: UpdateCategoryPageProps) {
	const { data: productCategoryData } = useQuery({
		queryKey: [QUERY_KEYS.productCategoriesForAdmin, categoryId],
		queryFn: async () => await findProductCategoryByIdForAdmin(categoryId),
	});

	const updateCategoryForm = useForm({
		defaultValues: {
			category: FormatterHelper.stringToString(productCategoryData?.category),
			isActive: productCategoryData?.isActive,
		},
		validators: {
			onSubmit: updateCategoryFormSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				await apiClient.patch(
					`${API_ROUTES.productCategory.update}${categoryId}`,
					{
						category: value.category,
						isActive: value.isActive,
					},
				);

				ToastService.success(UPDATE_PRODUCT_CATEGORY_SUCCESS_MESSAGE);
			} catch (error) {
				errorHandler(error, UPDATE_PRODUCT_CATEGORY_ERROR_MESSAGES);
			}
		},
	});

	const { isSubmitting } = useStore(updateCategoryForm.store);

	async function handleSubmitLogin(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		await updateCategoryForm.handleSubmit();
	}

	return (
		<>
			<Toolbar
				links={[
					{
						label: "Lista de produtos",
						link: APP_ROUTE.private.categories,
					},
				]}
				page="Editar categoria"
			/>

			<Card className="w-full ">
				<CardHeader>
					<CardTitle>Editar categoria</CardTitle>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
						<FormInput
							name="category"
							form={updateCategoryForm}
							label="Nome da categoria"
						/>

						<FormSwitch
							name="isActive"
							label="Ativar categoria"
							description="Se esta categoria estivar inativa todos os produtos relacionados a lena não estarão visíveis no catálogo"
							form={updateCategoryForm}
						/>

						<Button isLoading={isSubmitting} className="max-w-lg" type="submit">
							Atualizar categoria
						</Button>
					</form>
				</CardContent>
			</Card>
		</>
	);
}
