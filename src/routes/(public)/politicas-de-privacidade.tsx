import { PrivacyPoliciesPage } from '@autoria/pages/privacy-policies'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/politicas-de-privacidade')({
  component: PrivacyPoliciesPage,
})
