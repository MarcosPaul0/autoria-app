import { URL_WHATSAPP } from "@autoria/constants/urls";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";

export function WhatsappButton() {
	return (
		<a
			href={URL_WHATSAPP}
			target="_blank"
			className="p-4 bg-whatsapp hover:brightness-110 duration-300 text-whatsapp-foreground fixed bottom-8 right-8 rounded-full"
			aria-label="Entre em contato pelo Whatsapp"
		>
			<WhatsappLogoIcon className="size-8" />
		</a>
	);
}
