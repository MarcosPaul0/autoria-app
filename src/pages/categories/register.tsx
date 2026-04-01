import { Button } from "@autoria/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@autoria/components/card";
import { FormInput } from "@autoria/components/form-input";
import { Toolbar } from "@autoria/components/toolbar";
import { API_ROUTES } from "@autoria/constants/api-routes";
import { APP_ROUTE } from "@autoria/constants/app-route";
import type { HttpStatus } from "@autoria/constants/http-status";
import { HTTP_STATUS } from "@autoria/constants/http-status";
import { apiClient } from "@autoria/services/api-service";
import { ToastService } from "@autoria/services/toast-service";
import { errorHandler } from "@autoria/utils/errorHandler";
import { useForm, useStore } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import * as z from "zod";

const registerCategoryFormSchema = z.object({
	category: z
		.string()
		.min(5, "Categoria deve ter pelo menos 5 caracteres")
		.max(100, "Categoria deve ter no máximo 100 caracteres"),
});

const REGISTER_PRODUCT_CATEGORY_SUCCESS_MESSAGE =
	"Nova coleção registrada com sucesso!";

const REGISTER_PRODUCT_CATEGORY_ERROR_MESSAGES = {
	[HTTP_STATUS.unauthorized]: "Ocorreu um erro ao cadastrar a categoria!",
	[HTTP_STATUS.badRequest]: "Ocorreu um erro ao cadastrar a categoria!",
	[HTTP_STATUS.internal]:
		"Ocorreu algum erro inesperado. Tente novamente mais tarde.",
} as Record<HttpStatus, string>;

export function RegisterCategoryPage() {
	const navigate = useNavigate();

	const registerCategoryForm = useForm({
		defaultValues: {
			category: "",
		},
		validators: {
			onSubmit: registerCategoryFormSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				await apiClient.post(API_ROUTES.productCategory.create, {
					category: value.category,
				});

				ToastService.success(REGISTER_PRODUCT_CATEGORY_SUCCESS_MESSAGE);

				navigate({ to: APP_ROUTE.private.categories });
			} catch (error) {
				errorHandler(error, REGISTER_PRODUCT_CATEGORY_ERROR_MESSAGES);
			}
		},
	});

	const { isSubmitting } = useStore(registerCategoryForm.store);

	async function handleSubmitLogin(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		await registerCategoryForm.handleSubmit();
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
				page="Registrar categoria"
			/>

			<Card className="w-full ">
				<CardHeader>
					<CardTitle>Registrar nova categoria</CardTitle>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
						<FormInput
							name="category"
							form={registerCategoryForm}
							label="Nome da categoria"
						/>

						<Button type="submit" isLoading={isSubmitting} className="max-w-lg">
							Registrar categoria
						</Button>
					</form>
				</CardContent>
			</Card>
		</>
	);
}
