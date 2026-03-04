import { DeliveryAndShippingPage } from '@autoria/pages/delivery-and-shipping'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/entrega-e-frete')({
  component: DeliveryAndShippingPage,
})
