import { RegisterCategoryPage } from '@autoria/pages/categories/register'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/categorias/registrar')({
  component: RegisterCategoryPage,
})
