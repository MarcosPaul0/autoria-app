/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import { Accordion } from "@autoria/components/accordion";
import { LinkButton } from "@autoria/components/link-button";
import { LANDING_PAGE_SECTIONS } from "@autoria/constants/landing-page-sections";
import { URL_WHATSAPP } from "@autoria/constants/urls";
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
				<Question
					id="item-1"
					answer="Pode sim! Você conta sua ideia pelo WhatsApp e nós criamos uma estampa 100% original, do seu jeito."
					question="Posso criar uma estampa totalmente do zero?"
				/>

				<Question
					id="item-2"
					question="Posso pedir ajustes na arte?"
					answer="Antes da produção, você recebe a arte para aprovação e pode solicitar ajustes para que tudo fique exatamente como imaginou."
				/>

				<Question
					id="item-3"
					question="Como faço meu pedido?"
					answer="Todo o atendimento é feito pelo WhatsApp da Autoria. É só chamar, contar sua ideia (ou escolher uma estampa pronta) e a gente cuida do resto."
				/>

				<Question
					id="item-4"
					question="Qual é o prazo de produção?"
					answer="O prazo pode variar conforme o tipo de pedido (estampa pronta ou exclusiva). Após o primeiro contato no WhatsApp, informamos o prazo certinho antes de iniciar a produção."
				/>

				<Question
					id="item-5"
					question="Quais são as formas de pagamento?"
					answer="Aceitamos PIX, cartão de crédito e outras opções que informamos no atendimento pelo WhatsApp."
				/>

				<Question
					id="item-6"
					question="Posso comprar para presentear?"
					answer="Com certeza! As canecas da Autoria são pensadas exatamente para isso: presentear com significado. Se quiser, podemos orientar na escolha da estampa ideal."
				/>
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
