import type { ComponentProps } from "react";
import { Field, FieldError, FieldLabel } from "./filed";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";

type FormSelectOption = {
	label: string;
	value: string;
	disabled?: boolean;
};

type FormSelectProps<TForm> = Omit<
	ComponentProps<typeof Select>,
	"name" | "value" | "defaultValue" | "onValueChange" | "children" | "form"
> & {
	form: TForm;
	name: string;
	label: string;
	options: Array<FormSelectOption>;
	placeholder?: string;
};

export function FormSelect<TForm extends { Field: any }>({
	form,
	name,
	label,
	options,
	placeholder,
	...props
}: FormSelectProps<TForm>) {
	return (
		<form.Field
			name={name}
			children={(field: any) => {
				const isInvalid =
					field.state.meta.isTouched && !field.state.meta.isValid;

				return (
					<Field data-invalid={isInvalid}>
						<FieldLabel htmlFor={field.name}>{label}</FieldLabel>

						<Select
							{...props}
							name={field.name}
							value={field.state.value ?? ""}
							onValueChange={field.handleChange}
						>
							<SelectTrigger
								id={field.name}
								onBlur={field.handleBlur}
								aria-invalid={isInvalid}
								className="w-full h-12 rounded-2xl px-2.5 py-4 text-base md:text-sm"
							>
								<SelectValue placeholder={placeholder ?? field.placeholder} />
							</SelectTrigger>

							<SelectContent>
								{options.map((option) => (
									<SelectItem
										key={option.value}
										value={option.value}
										disabled={option.disabled}
									>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						{isInvalid && <FieldError errors={field.state.meta.errors} />}
					</Field>
				);
			}}
		/>
	);
}
