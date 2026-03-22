import { Toaster } from "@autoria/components/sonner";
import {
	createJsonLdScript,
	DEFAULT_THEME_COLOR,
	getOrganizationStructuredData,
	SITE_DESCRIPTION,
	SITE_NAME,
} from "@autoria/libs/seo";
import type { RouterContext } from "@autoria/router";
import appCss from "@autoria/styles.css?url";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => {
		const organizationStructuredData = getOrganizationStructuredData();

		return {
			meta: [
				{ title: SITE_NAME },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ name: "application-name", content: SITE_NAME },
				{ name: "description", content: SITE_DESCRIPTION },
				{ name: "theme-color", content: DEFAULT_THEME_COLOR },
				{ property: "og:site_name", content: SITE_NAME },
				{ property: "og:type", content: "website" },
				{ name: "twitter:card", content: "summary_large_image" },
			],
			links: [
				{ rel: "stylesheet", href: appCss },
				{ rel: "icon", href: "/favicon.ico" },
				{ rel: "manifest", href: "/manifest.json" },
			],
			scripts: organizationStructuredData
				? [createJsonLdScript(organizationStructuredData)]
				: [],
		};
	},
	component: RootComponent,
});

function RootComponent() {
	const { queryClient } = Route.useRouteContext();

	return (
		<RootDocument>
			<QueryClientProvider client={queryClient}>
				<Outlet />

				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>

				<Toaster />
			</QueryClientProvider>
		</RootDocument>
	);
}

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="pt-BR">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
