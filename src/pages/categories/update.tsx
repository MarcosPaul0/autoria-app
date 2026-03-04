import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@autoria/components/card'
import { Toolbar } from '@autoria/components/toolbar'
import { APP_ROUTE } from '@autoria/constants/app-route'
import { ToastService } from '@autoria/services/toast-service'
import { useForm, useStore } from '@tanstack/react-form'
import * as z from 'zod'
import { Button } from '@autoria/components/button'
import { HTTP_STATUS } from '@autoria/constants/http-status'
import { errorHandler } from '@autoria/utils/errorHandler'
import { apiClient } from '@autoria/services/api-service'
import { API_ROUTES } from '@autoria/constants/api-routes'
import { useQuery } from '@tanstack/react-query'
import { ProductCategoryRepository } from '@autoria/repositories/product-category-repository'
import { FormatterHelper } from '@autoria/helpers/formatter-helper'
import { FormInput } from '@autoria/components/form-input'
import type { HttpStatus } from '@autoria/constants/http-status'
import type { SubmitEvent } from 'react'

const updateCategoryFormSchema = z.object({
  category: z
    .string()
    .min(10, 'Categoria deve ter no mínimo 10 caracteres')
    .max(100, 'Categoria deve ter no máximo 100 caracteres'),
})

const UPDATE_PRODUCT_CATEGORY_SUCCESS_MESSAGE =
  'Nova coleção registrada com sucesso!'

const UPDATE_PRODUCT_CATEGORY_ERROR_MESSAGES = {
  [HTTP_STATUS.unauthorized]: 'Ocorreu um erro ao atualizar a categoria!',
  [HTTP_STATUS.badRequest]: 'Ocorreu um erro ao atualizar a categoria!',
  [HTTP_STATUS.internal]:
    'Ocorreu algum erro inesperado. Tente novamente mais tarde.',
} as Record<HttpStatus, string>

interface UpdateCategoryPageProps {
  categoryId: string
}

export function UpdateCategoryPage({ categoryId }: UpdateCategoryPageProps) {
  const { data: productCategoryData } = useQuery({
    queryKey: ['product-category', categoryId],
    queryFn: async () => await ProductCategoryRepository.findById(categoryId),
  })

  const updateCategoryForm = useForm({
    defaultValues: {
      category: FormatterHelper.stringToString(productCategoryData?.category),
    },
    validators: {
      onSubmit: updateCategoryFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await apiClient.patch(
          `${API_ROUTES.productCategory.update}${categoryId}`,
          {
            category: value.category,
          },
        )

        ToastService.success(UPDATE_PRODUCT_CATEGORY_SUCCESS_MESSAGE)
      } catch (error) {
        errorHandler(error, UPDATE_PRODUCT_CATEGORY_ERROR_MESSAGES)
      }
    },
  })

  const { isSubmitting } = useStore(updateCategoryForm.store)

  async function handleSubmitLogin(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    await updateCategoryForm.handleSubmit()
  }

  return (
    <>
      <Toolbar
        links={[
          {
            label: 'Lista de produtos',
            link: APP_ROUTE.private.categories,
          },
        ]}
        page="Editar categoria"
      />

      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Editar categoria</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
            <FormInput
              name="category"
              form={updateCategoryForm}
              label="Nome da categoria"
            />

            <Button isLoading={isSubmitting} className="max-w-lg" type="submit">
              Atualizar categoria
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
