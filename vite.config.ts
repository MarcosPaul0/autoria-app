import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config = defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const siteUrl = env.VITE_SITE_URL?.replace(/\/$/, "");

	return {
		plugins: [
			devtools(),
			nitro({ rollupConfig: { external: [/^@sentry\//] } }),
			tsconfigPaths({ projects: ["./tsconfig.json"] }),
			tailwindcss(),
			tanstackStart({
				sitemap: siteUrl
					? {
							enabled: true,
							host: siteUrl,
						}
					: {
							enabled: false,
						},
				pages: [
					{
						path: "/",
						sitemap: {
							changefreq: "weekly",
							priority: 1,
						},
					},
					{
						path: "/politicas-de-privacidade",
						sitemap: {
							changefreq: "yearly",
							priority: 0.3,
						},
					},
					{
						path: "/termos-de-uso",
						sitemap: {
							changefreq: "yearly",
							priority: 0.3,
						},
					},
					{
						path: "/trocas-e-devolucoes",
						sitemap: {
							changefreq: "monthly",
							priority: 0.5,
						},
					},
					{
						path: "/entrega-e-frete",
						sitemap: {
							changefreq: "monthly",
							priority: 0.5,
						},
					},
				],
			}),
			viteReact(),
		],
		resolve: {
			alias: {
				"@autoria": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
	};
});

export default config;
