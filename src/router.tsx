import type { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { createQueryClient } from "./libs/query";
import { routeTree } from "./routeTree.gen";

export interface RouterContext {
	queryClient: QueryClient;
}

export function getRouter() {
	const queryClient = createQueryClient();

	const router = createTanStackRouter({
		routeTree,
		context: { queryClient },
		defaultPreload: "intent",
		scrollRestoration: true,
		defaultStructuralSharing: true,
		defaultPreloadStaleTime: 0,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
