import { buildPageHead } from "@autoria/libs/seo";
import { ExchangesAndReturnsPage } from "@autoria/pages/exchanges-and-returns";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/trocas-e-devolucoes")({
	head: () =>
		buildPageHead({
			title: "Trocas e Devolucoes | Autoria",
			description:
				"Entenda a politica de trocas e devolucoes da Autoria para produtos personalizados e compras feitas na loja.",
			path: "/trocas-e-devolucoes",
		}),
	component: ExchangesAndReturnsPage,
});
