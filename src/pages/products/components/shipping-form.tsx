import { Button } from "@autoria/components/button";
import { FormNumericInput } from "@autoria/components/form-numeric-input";
import { HTTP_STATUS, type HttpStatus } from "@autoria/constants/http-status";
import { FormatterHelper } from "@autoria/helpers/formatter-helper";
import {
	calculateProductShipping,
	type CalculateProductShippingResponse,
} from "@autoria/repositories/product-repository";
import { errorHandler } from "@autoria/utils/errorHandler";
import { TruckIcon } from "@phosphor-icons/react";
import { useForm, useStore } from "@tanstack/react-form";
import { useState, type SubmitEvent } from "react";
import z from "zod";

const calculateShippingFormSchema = z.object({
	postalCode: z
		.string()
		.regex(/^[\d]{5}-?[\d]{3}$/, "Cep inválido")
		.trim()
		.transform((value) => value.replace("-", "")),
});

const CALCULATE_SHIPPING_ERROR_MESSAGES = {
  [HTTP_STATUS.notFound]:
		"Frete indisponível para esse CEP!",
	[HTTP_STATUS.unauthorized]:
		"Ocorreu um erro ao calcular o frete. Tente novamente mais tarde!",
	[HTTP_STATUS.badRequest]:
		"Ocorreu um erro ao calcular o frete. Tente novamente mais tarde!",
	[HTTP_STATUS.internal]:
		"Ocorreu um erro ao calcular o frete. Tente novamente mais tarde!",
} as Record<HttpStatus, string>;

interface ShippingFormProps {
	productId: string;
}

export function ShippingForm({ productId }: ShippingFormProps) {
	const [shippingData, setShippingData] =
		useState<CalculateProductShippingResponse | null>(null);

	const calculateShippingForm = useForm({
		defaultValues: {
			postalCode: "",
		},
		validators: {
			onSubmit: calculateShippingFormSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				const shippingResponse = await calculateProductShipping({
					postalCode: value.postalCode,
					productId,
				});

				setShippingData(shippingResponse);
			} catch (error) {
				setShippingData(null);

				errorHandler(error, CALCULATE_SHIPPING_ERROR_MESSAGES);
			}
		},
	});

	const { isSubmitting } = useStore(calculateShippingForm.store);

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		await calculateShippingForm.handleSubmit();
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<div className="flex gap-2 max-w-sm">
				<FormNumericInput
					name="postalCode"
					form={calculateShippingForm}
					icon={<TruckIcon size={24} />}
					label="CONSULTAR FRETE"
					decimalPlacesMaxNumber={0}
					placeholder="Informe seu CEP"
				/>
				<Button isLoading={isSubmitting} type="submit" className="mt-8">
					OK
				</Button>
			</div>

			{shippingData && (
				<div className="flex flex-col gap-1">
					<p className="text-lg font-bold line-he">
						Frete para sua região:{" "}
						<span>
							{FormatterHelper.toReal(shippingData.shippingPriceInCents)}
						</span>
					</p>
					<p>
						Previsão de entrega para{" "}
						{FormatterHelper.toLongDate(shippingData?.estimationDeliveryDate)}
					</p>
				</div>
			)}
		</form>
	);
}
