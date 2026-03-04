import { Field, FieldError, FieldLabel } from './filed'
import { NumericInput, sanitizeNumericValue } from './numeric-input'
import type { InputHTMLAttributes } from 'react'

type FormNumericInputProps<TForm> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'form' | 'name'
> & {
  form: TForm
  name: string
  label: string
  decimalPlacesMaxNumber?: number
}

export function FormNumericInput<TForm extends { Field: any }>({
  form,
  label,
  name,
  decimalPlacesMaxNumber,
  ...props
}: FormNumericInputProps<TForm>) {
  return (
    <form.Field
      name={name}
      children={(field: any) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid

        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

            <NumericInput
              {...props}
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) =>
                field.handleChange(
                  sanitizeNumericValue(
                    event.target.value,
                    decimalPlacesMaxNumber,
                  ),
                )
              }
              aria-invalid={isInvalid}
              placeholder={field.placeholder}
              autoComplete="off"
            />

            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    />
  )
}
