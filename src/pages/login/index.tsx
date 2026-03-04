import { Button } from '@autoria/components/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@autoria/components/card'
import { FormInput } from '@autoria/components/form-input'
import { useForm, useStore } from '@tanstack/react-form'
import * as z from 'zod'
import { apiClient } from '@autoria/services/api-service'
import { API_ROUTES } from '@autoria/constants/api-routes'
import { errorHandler } from '@autoria/utils/errorHandler'
import { HTTP_STATUS } from '@autoria/constants/http-status'
import { APP_ROUTE } from '@autoria/constants/app-route'
import { useNavigate } from '@tanstack/react-router'
import type { HttpStatus } from '@autoria/constants/http-status'
import type { SubmitEvent } from 'react'

const loginFormSchema = z.object({
  email: z
    .email({ message: 'Email inválido' })
    .min(5, 'Email inválido')
    .max(200, 'Email inválido'),
  password: z.string().min(10, 'Senha inválida').max(200, 'Senha inválida'),
})

const LOGIN_ERROR_MESSAGES = {
  [HTTP_STATUS.unauthorized]: 'Email ou senha incorretos!',
  [HTTP_STATUS.internal]:
    'Ocorreu algum erro inesperado. Tente novamente mais tarde.',
} as Record<HttpStatus, string>

export function LoginPage() {
  const navigate = useNavigate()

  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await apiClient.post(API_ROUTES.auth.login, {
          email: value.email,
          password: value.password,
        })

        navigate({ to: APP_ROUTE.private.products })
      } catch (error) {
        errorHandler(error, LOGIN_ERROR_MESSAGES)
      }
    },
  })

  const { isSubmitting } = useStore(loginForm.store)

  async function handleSubmitLogin(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    await loginForm.handleSubmit()
  }

  return (
    <Card className="max-w-lg w-full mx-auto my-50">
      <CardHeader>
        <CardTitle>Bem-vindo de volta</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
          <FormInput name="email" form={loginForm} label="Email" type="email" />

          <FormInput
            name="password"
            form={loginForm}
            label="Senha"
            type="password"
          />

          <Button isLoading={isSubmitting} type="submit">
            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
