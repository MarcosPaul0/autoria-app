import { CategoriesPage } from '@autoria/pages/categories'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/categorias/')({
  component: CategoriesPage,
})
