import { Field, FieldError, FieldLabel } from './filed'
import { Textarea } from './textarea'
import type { TextareaHTMLAttributes } from 'react'

type FormTextAreaProps<TForm> = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'form' | 'name'
> & {
  form: TForm
  name: string
  label: string
}

export function FormTextArea<TForm extends { Field: any }>({
  form,
  label,
  name,
  ...props
}: FormTextAreaProps<TForm>) {
  return (
    <form.Field
      name={name}
      children={(field: any) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

            <Textarea
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
        )
      }}
    />
  )
}
