import { buildPageHead } from "@autoria/libs/seo";
import { LoginPage } from "@autoria/pages/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/login")({
	head: () =>
		buildPageHead({
			title: "Login | Autoria",
			description: "Area de acesso administrativo da Autoria.",
			path: "/login",
			robots: "noindex, nofollow",
		}),
	component: LoginPage,
});
