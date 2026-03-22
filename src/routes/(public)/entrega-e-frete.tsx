import { buildPageHead } from "@autoria/libs/seo";
import { DeliveryAndShippingPage } from "@autoria/pages/delivery-and-shipping";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/entrega-e-frete")({
	head: () =>
		buildPageHead({
			title: "Entrega e Frete | Autoria",
			description:
				"Veja as informacoes sobre entrega, prazos e frete dos pedidos realizados na Autoria.",
			path: "/entrega-e-frete",
		}),
	component: DeliveryAndShippingPage,
});
