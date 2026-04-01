import type { ComponentProps } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "./filed";
import { Switch } from "./switch";

type FormSwitchProps<TForm> = Omit<
	ComponentProps<typeof Switch>,
	"name" | "checked" | "defaultChecked" | "onCheckedChange" | "form"
> & {
	form: TForm;
	name: string;
	label: string;
	description: string;
};

export function FormSwitch<TForm extends { Field: any }>({
	form,
	name,
	label,
	description,
	...props
}: FormSwitchProps<TForm>) {
	return (
		<form.Field
			name={name}
			children={(field: any) => {
				const isInvalid =
					field.state.meta.isTouched && !field.state.meta.isValid;

				return (
					<Field data-invalid={isInvalid}>
						<div className="flex items-center gap-8 border px-3 py-4 rounded-2xl">
							<div className="flex flex-col">
								<FieldLabel htmlFor={field.name} className="w-auto">
									{label}
								</FieldLabel>
								<FieldDescription>{description}</FieldDescription>
							</div>

							<Switch
								{...props}
								id={field.name}
								name={field.name}
								checked={Boolean(field.state.value)}
								onBlur={field.handleBlur}
								onCheckedChange={field.handleChange}
								aria-invalid={isInvalid}
							/>
						</div>

						{isInvalid && <FieldError errors={field.state.meta.errors} />}
					</Field>
				);
			}}
		/>
	);
}
