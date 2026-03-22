export const SITE_NAME = "Autoria | Personalizados e Presentes";
export const SITE_DESCRIPTION =
	"A Autoria é uma loja online especializada em itens personalizados, presentes criativos e produtos exclusivos com design autoral.";
export const SITE_LOCALE = "pt_BR";
export const SITE_LANGUAGE = "pt-BR";
export const DEFAULT_THEME_COLOR = "#4D111C";
export const BUSINESS_PHONE = "+55-35-99919-4871";

export const FAQ_ENTRIES = [
	{
		question: "Posso criar uma estampa totalmente do zero?",
		answer:
			"Pode sim. Você conta sua ideia pelo WhatsApp e nós criamos uma estampa 100% original, do seu jeito.",
	},
	{
		question: "Posso pedir ajustes na arte?",
		answer:
			"Antes da produção, você recebe a arte para aprovação e pode solicitar ajustes para que tudo fique exatamente como imaginou.",
	},
	{
		question: "Como faço meu pedido?",
		answer:
			"Todo o atendimento é feito pelo WhatsApp da Autoria. É só chamar, contar sua ideia ou escolher uma estampa pronta e a gente cuida do resto.",
	},
	{
		question: "Qual é o prazo de produção?",
		answer:
			"O prazo pode variar conforme o tipo de pedido. Após o primeiro contato no WhatsApp, informamos o prazo antes de iniciar a produção.",
	},
	{
		question: "Quais são as formas de pagamento?",
		answer:
			"Aceitamos PIX, cartão de crédito e outras opções que informamos no atendimento pelo WhatsApp.",
	},
	{
		question: "Posso comprar para presentear?",
		answer:
			"Sim. As canecas da Autoria são pensadas para presentear com significado, e podemos orientar na escolha da estampa ideal.",
	},
] as const;

function getNormalizedSiteUrl() {
	const siteUrl = import.meta.env.VITE_SITE_URL?.trim();

	if (!siteUrl) {
		return undefined;
	}

	return siteUrl.replace(/\/$/, "");
}

export function buildCanonicalUrl(path = "/") {
	const siteUrl = getNormalizedSiteUrl();

	if (!siteUrl) {
		return undefined;
	}

	const url = new URL(path, `${siteUrl}/`);

	return url.pathname === "/"
		? url.toString().replace(/\/$/, "")
		: url.toString();
}

export function createJsonLdScript(
	structuredData: Record<string, unknown> | Array<Record<string, unknown>>,
) {
	return {
		type: "application/ld+json",
		children: JSON.stringify(structuredData),
	};
}

interface BuildPageHeadOptions {
	title: string;
	description: string;
	path?: string;
	type?: "website" | "article" | "product";
	robots?: string;
	imageUrl?: string;
	structuredData?: Array<Record<string, unknown>>;
}

export function buildPageHead({
	title,
	path,
	description,
	type = "website",
	robots = "index, follow",
	imageUrl,
	structuredData = [],
}: BuildPageHeadOptions) {
	const canonicalUrl = path ? buildCanonicalUrl(path) : undefined;

	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ name: "robots", content: robots },
			{ name: "theme-color", content: DEFAULT_THEME_COLOR },
			{ property: "og:site_name", content: SITE_NAME },
			{ property: "og:locale", content: SITE_LOCALE },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:type", content: type },
			{ property: "og:url", content: canonicalUrl },
			{ property: "og:image", content: imageUrl },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: imageUrl },
		].filter((item) => typeof item.content !== "undefined" || "title" in item),
		links: canonicalUrl
			? [
					{
						rel: "canonical",
						href: canonicalUrl,
					},
				]
			: [],
		scripts: structuredData.map(createJsonLdScript),
	};
}

export function getOrganizationStructuredData() {
	const siteUrl = getNormalizedSiteUrl();

	if (!siteUrl) {
		return undefined;
	}

	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Autoria",
		url: siteUrl,
		logo: buildCanonicalUrl("/logo512.png"),
		image: buildCanonicalUrl("/logo.png"),
		contactPoint: [
			{
				"@type": "ContactPoint",
				contactType: "customer support",
				telephone: BUSINESS_PHONE,
				availableLanguage: ["pt-BR"],
				areaServed: "BR",
			},
		],
	};
}
