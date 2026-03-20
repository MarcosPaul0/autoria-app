import { Toaster } from "@autoria/components/sonner";
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
  head: () => ({
    meta: [
      { title: "Autoria | Personalizados & Presentes" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content:
          "A Autoria é uma loja online especializada em itens personalizados, presentes criativos e produtos exclusivos com design autoral. Criamos presentes personalizados sob encomenda, ideais para Dia das Mães, Dia dos Pais, batizados, casamentos, bodas, aniversários, datas religiosas e outras ocasiões especiais.",
      },
      {
        property: "og:site_name",
        content: "Autoria | Personalizados & Presentes",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg" },
    ],
  }),
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
