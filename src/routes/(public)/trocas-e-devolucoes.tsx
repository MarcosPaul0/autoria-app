import { ExchangesAndReturnsPage } from '@autoria/pages/exchanges-and-returns'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/trocas-e-devolucoes')({
  component: ExchangesAndReturnsPage,
})
