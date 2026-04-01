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
import { productCategoryToUiOptions } from "@autoria/presenters/product-category-presenter";
import { listAllProductCategoriesForAdmin } from "@autoria/repositories/product-category-repository";
import { apiClient } from "@autoria/services/api-service";
import { ToastService } from "@autoria/services/toast-service";
import { errorHandler } from "@autoria/utils/errorHandler";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import * as z from "zod";

const registerProductFormSchema = z.object({
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

const REGISTER_PRODUCT_SUCCESS_MESSAGE = "Novo produto registrado com sucesso!";

const REGISTER_PRODUCT_ERROR_MESSAGES = {
	[HTTP_STATUS.unauthorized]: "Ocorreu um erro ao cadastrar o produto!",
	[HTTP_STATUS.badRequest]: "Ocorreu um erro ao cadastrar o produto!",
	[HTTP_STATUS.internal]:
		"Ocorreu algum erro inesperado. Tente novamente mais tarde.",
} as Record<HttpStatus, string>;

export function RegisterProductPage() {
	const navigate = useNavigate();

	const { data: productCategoryOptionsData } = useQuery({
		queryKey: [QUERY_KEYS.productCategoryOptions],
		queryFn: async () => {
			const productCategoriesResponse =
				await listAllProductCategoriesForAdmin();

			return productCategoryToUiOptions(productCategoriesResponse);
		},
	});

	const registerProductForm = useForm({
		defaultValues: {
			name: "",
			description: "",
			printDescription: "",
			price: "",
			discountPercentage: "",
			stockQuantity: "",
			productionTimeInMinutes: "",
			category: "",
		},
		validators: {
			onSubmit: registerProductFormSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				await apiClient.post(API_ROUTES.product.create, {
					name: value.name,
					description: value.description,
					priceInCents: Number(value.price.replace(",", ".")) * 100,
					productionTimeInMinutes: value.productionTimeInMinutes,
					discountPercentage: Number(value.discountPercentage),
					stockQuantity: Number(value.stockQuantity),
					productCategoryId: value.category,
					printDescription: value.printDescription,
				});

				ToastService.success(REGISTER_PRODUCT_SUCCESS_MESSAGE);

				navigate({ to: APP_ROUTE.private.products });
			} catch (error) {
				errorHandler(error, REGISTER_PRODUCT_ERROR_MESSAGES);
			}
		},
	});

	async function handleSubmitLogin(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		await registerProductForm.handleSubmit();
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
				page="Registrar produto"
			/>

			<Card className="w-full ">
				<CardHeader>
					<CardTitle>Registrar novo produto</CardTitle>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
						<FormInputRow cols={3}>
							<FormInput name="name" form={registerProductForm} label="Nome" />

							<FormNumericInput
								name="price"
								form={registerProductForm}
								label="Preço (R$)"
								decimalPlacesMaxNumber={2}
							/>

							<FormNumericInput
								name="discountPercentage"
								form={registerProductForm}
								label="Desconto (%)"
								decimalPlacesMaxNumber={0}
							/>
						</FormInputRow>

						<FormInputRow cols={3}>
							<FormSelect
								name="category"
								form={registerProductForm}
								label="Coleção"
								options={productCategoryOptionsData ?? []}
							/>

							<FormNumericInput
								name="productionTimeInMinutes"
								form={registerProductForm}
								label="Tempo de produção (minutos)"
								decimalPlacesMaxNumber={0}
							/>

							<FormNumericInput
								name="stockQuantity"
								form={registerProductForm}
								label="Estoque"
								decimalPlacesMaxNumber={0}
							/>
						</FormInputRow>

						<FormInputRow cols={2}>
							<FormTextArea
								name="description"
								form={registerProductForm}
								label="Descrição detalhada do produto"
								rows={4}
							/>

							<FormTextArea
								name="printDescription"
								form={registerProductForm}
								label="Descrição da estampa do produto"
								rows={4}
							/>
						</FormInputRow>

						<Button className="max-w-lg" type="submit">
							Registrar produto
						</Button>
					</form>
				</CardContent>
			</Card>
		</>
	);
}
