import type { InputHTMLAttributes, ReactNode } from "react";
import { Field, FieldError, FieldLabel } from "./filed";
import { Input } from "./input";

type FormInputProps<TForm> = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"form" | "name"
> & {
	form: TForm;
	name: string;
	label: string;
};

export function FormInput<TForm extends { Field: any }>({
	form,
	label,
	name,
	...props
}: FormInputProps<TForm>) {
	return (
		<form.Field
			name={name}
			children={(field: any) => {
				const isInvalid =
					field.state.meta.isTouched && !field.state.meta.isValid;
				return (
					<Field data-invalid={isInvalid}>
						<FieldLabel htmlFor={field.name}>{label}</FieldLabel>

						<Input
							{...props}
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							aria-invalid={isInvalid}
							placeholder={field.placeholder}
							autoComplete="off"
						/>

						{isInvalid && <FieldError errors={field.state.meta.errors} />}
					</Field>
				);
			}}
		/>
	);
}

interface FormInputRowProps {
	children: ReactNode;
	cols: number;
}

export function FormInputRow({ children, cols }: FormInputRowProps) {
	return (
		<div className={`sm:flex sm:items-start grid grid-cols-${cols} gap-8`}>
			{children}
		</div>
	);
}
