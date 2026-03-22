import { buildPageHead } from "@autoria/libs/seo";
import { TermsPage } from "@autoria/pages/terms";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/termos-de-uso")({
	head: () =>
		buildPageHead({
			title: "Termos de Uso | Autoria",
			description:
				"Leia os termos de uso da Autoria para entender as condicoes de navegacao, compra e uso dos servicos da loja.",
			path: "/termos-de-uso",
		}),
	component: TermsPage,
});
