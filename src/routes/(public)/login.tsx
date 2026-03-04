import { LoginPage } from '@autoria/pages/login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/login')({
  component: LoginPage,
})
