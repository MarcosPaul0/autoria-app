import { APP_ROUTE } from "@autoria/constants/app-route";
import { buildPageHead } from "@autoria/libs/seo";
import { LoginPage } from "@autoria/pages/login";
import { verifyAuthentication } from "@autoria/repositories/auth-repository";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/login")({
	head: () =>
		buildPageHead({
			title: "Login | Autoria",
			description: "Area de acesso administrativo da Autoria.",
			path: "/login",
			robots: "noindex, nofollow",
		}),
	beforeLoad: async () => {
		try {
			await verifyAuthentication();
		} catch {
			return;
		}

		throw redirect({
			to: APP_ROUTE.private.products,
		});
	},
	component: LoginPage,
});
