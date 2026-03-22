/** biome-ignore-all lint/correctness/useUniqueElementIds: accordion item ids are stable and scoped to this section */
import { Accordion } from "@autoria/components/accordion";
import { LinkButton } from "@autoria/components/link-button";
import { LANDING_PAGE_SECTIONS } from "@autoria/constants/landing-page-sections";
import { URL_WHATSAPP } from "@autoria/constants/urls";
import { FAQ_ENTRIES } from "@autoria/libs/seo";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Question } from "./question";

export function QuestionSection() {
	return (
		<section
			className="max-w-[1920px] bg-background w-full mx-auto my-0 px-4 sm:px-28 py-6 sm:py-20 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-50"
			id={LANDING_PAGE_SECTIONS.questions}
		>
			<div className="flex flex-col gap-4 max-w-xl items-center sm:items-start">
				<h2 className="text-2xl sm:text-4xl font-bold text-primary">
					Ficou com alguma dúvida?
				</h2>

				<p className="text-sm sm:text-base text-center sm:text-left">
					A gente sabe que sempre surgem perguntas. Por isso, deixamos aqui as
					respostas mais importantes pra te ajudar a escolher, personalizar e
					comprar sua caneca com tranquilidade.
				</p>

				<LinkButton
					target="_blank"
					href={URL_WHATSAPP}
					className="mt-4 hidden sm:flex"
				>
					<WhatsappLogoIcon />
					Envie sua dúvida
				</LinkButton>
			</div>

			<Accordion
				type="single"
				collapsible
				defaultValue="item-1"
				className="max-w-3xl"
			>
				{FAQ_ENTRIES.map((item, index) => (
					<Question
						key={item.question}
						id={`item-${index + 1}`}
						question={item.question}
						answer={item.answer}
					/>
				))}
			</Accordion>

			<LinkButton
				target="_blank"
				href={URL_WHATSAPP}
				className="mt-2 sm:hidden"
			>
				<WhatsappLogoIcon />
				Envie sua dúvida
			</LinkButton>
		</section>
	);
}
