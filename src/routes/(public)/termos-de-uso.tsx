import { TermsPage } from '@autoria/pages/terms'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/termos-de-uso')({
  component: TermsPage,
})
