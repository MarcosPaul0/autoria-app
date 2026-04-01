import { Button } from "@autoria/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@autoria/components/card";
import { FormInput, FormInputRow } from "@autoria/components/form-input";
import { FormNumericInput } from "@autoria/components/form-numeric-input";
import { FormSelect } from "@autoria/components/form-select";
import { FormTextArea } from "@autoria/components/form-textarea";
import { Toolbar } from "@autoria/components/toolbar";
import { API_ROUTES } from "@autoria/constants/api-routes";
import { APP_ROUTE } from "@autoria/constants/app-route";
import type { HttpStatus } from "@autoria/constants/http-status";
import { HTTP_STATUS } from "@autoria/constants/http-status";
import { QUERY_KEYS } from "@autoria/constants/query-keys";
import { FormatterHelper } from "@autoria/helpers/formatter-helper";
import { productCategoryToUiOptions } from "@autoria/presenters/product-category-presenter";
import { listAllProductCategoriesForAdmin } from "@autoria/repositories/product-category-repository";
import { ProductRepository } from "@autoria/repositories/product-repository";
import { apiClient } from "@autoria/services/api-service";
import { ToastService } from "@autoria/services/toast-service";
import { errorHandler } from "@autoria/utils/errorHandler";
import { useForm, useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import type { SubmitEvent } from "react";
import * as z from "zod";

const updateProductFormSchema = z.object({
	name: z
		.string()
		.min(10, "Deve ter no mínimo 10 caracteres")
		.max(200, "Deve ter no máximo 200 caracteres"),
	description: z
		.string()
		.min(10, "Deve ter no mínimo 10 caracteres")
		.max(1200, "Deve ter no máximo 1200 caracteres"),
	printDescription: z
		.string()
		.min(10, "Deve ter no mínimo 10 caracteres")
		.max(600, "Deve ter no máximo 600 caracteres"),
	price: z.string(),
	discountPercentage: z.string(),
	stockQuantity: z.string(),
	productionTimeInMinutes: z.string(),
	category: z.string(),
});

const UPDATE_PRODUCT_SUCCESS_MESSAGE = "Novo produto registrado com sucesso!";

const UPDATE_PRODUCT_ERROR_MESSAGES = {
	[HTTP_STATUS.unauthorized]: "Ocorreu um erro ao atualizar o produto!",
	[HTTP_STATUS.badRequest]: "Ocorreu um erro ao atualizar o produto!",
	[HTTP_STATUS.internal]:
		"Ocorreu algum erro inesperado. Tente novamente mais tarde.",
} as Record<HttpStatus, string>;

interface UpdateProductPageProps {
	productId: string;
}

export function UpdateProductPage({ productId }: UpdateProductPageProps) {
	const { data: productCategoryOptionsData } = useQuery({
		queryKey: [QUERY_KEYS.productCategoryOptions],
		queryFn: async () => {
			const productCategoriesResponse =
				await listAllProductCategoriesForAdmin();

			return productCategoryToUiOptions(productCategoriesResponse);
		},
	});

	const { data: productData } = useQuery({
		queryKey: ["product-for-admin", productId],
		queryFn: async () => ProductRepository.findByIdForAdmin(productId),
	});

	const updateProductForm = useForm({
		defaultValues: {
			name: FormatterHelper.stringToString(productData?.name),
			description: FormatterHelper.stringToString(productData?.description),
			printDescription: FormatterHelper.stringToString(
				productData?.printDescription,
			),
			price: FormatterHelper.centsToString(productData?.priceInCents),
			discountPercentage: FormatterHelper.numberToString(
				productData?.discountPercentage,
			),
			productionTimeInMinutes: FormatterHelper.numberToString(
				productData?.productionTimeInMinutes,
			),
			stockQuantity: FormatterHelper.numberToString(productData?.stockQuantity),
			category: FormatterHelper.stringToString(productData?.productCategoryId),
		},
		validators: {
			onSubmit: updateProductFormSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				await apiClient.patch(`${API_ROUTES.product.update}${productId}`, {
					name: value.name,
					description: value.description,
					printDescription: value.printDescription,
					priceInCents: Number(value.price.replace(",", ".")) * 100,
					productionTimeInMinutes: value.productionTimeInMinutes,
					discountPercentage: Number(value.discountPercentage),
					stockQuantity: Number(value.stockQuantity),
					productCategoryId: value.category,
				});

				ToastService.success(UPDATE_PRODUCT_SUCCESS_MESSAGE);
			} catch (error) {
				errorHandler(error, UPDATE_PRODUCT_ERROR_MESSAGES);
			}
		},
	});

	const { isSubmitting } = useStore(updateProductForm.store);

	async function handleSubmitLogin(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		await updateProductForm.handleSubmit();
	}

	return (
		<>
			<Toolbar
				links={[
					{
						label: "Lista de produtos",
						link: APP_ROUTE.private.products,
					},
				]}
				page="Editar produto"
			/>

			<Card className="w-full ">
				<CardHeader>
					<CardTitle>Editar produto</CardTitle>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
						<FormInputRow cols={3}>
							<FormInput name="name" form={updateProductForm} label="Nome" />

							<FormNumericInput
								name="price"
								form={updateProductForm}
								label="Preço (R$)"
								decimalPlacesMaxNumber={2}
							/>

							<FormNumericInput
								name="discountPercentage"
								form={updateProductForm}
								label="Desconto (%)"
								decimalPlacesMaxNumber={0}
							/>
						</FormInputRow>

						<FormInputRow cols={3}>
							<FormSelect
								name="category"
								form={updateProductForm}
								label="Coleção"
								options={productCategoryOptionsData ?? []}
							/>

							<FormNumericInput
								name="productionTimeInMinutes"
								form={updateProductForm}
								label="Tempo de produção (minutos)"
								decimalPlacesMaxNumber={0}
							/>

							<FormNumericInput
								name="stockQuantity"
								form={updateProductForm}
								label="Estoque"
								decimalPlacesMaxNumber={0}
							/>
						</FormInputRow>

						<FormInputRow cols={2}>
							<FormTextArea
								name="description"
								form={updateProductForm}
								label="Descrição detalhada do produto"
								rows={4}
							/>

							<FormTextArea
								name="printDescription"
								form={updateProductForm}
								label="Descrição da estampa do produto"
								rows={4}
							/>
						</FormInputRow>

						<Button isLoading={isSubmitting} className="max-w-lg" type="submit">
							Atualizar produto
						</Button>
					</form>
				</CardContent>
			</Card>
		</>
	);
}
