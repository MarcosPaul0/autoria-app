import { buildPageHead } from "@autoria/libs/seo";
import { PrivacyPoliciesPage } from "@autoria/pages/privacy-policies";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/politicas-de-privacidade")({
	head: () =>
		buildPageHead({
			title: "Politica de Privacidade | Autoria",
			description:
				"Consulte como a Autoria coleta, utiliza e protege seus dados pessoais e informacoes de contato.",
			path: "/politicas-de-privacidade",
		}),
	component: PrivacyPoliciesPage,
});
