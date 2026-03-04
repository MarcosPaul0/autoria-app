import { URL_WHATSAPP } from '@autoria/constants/urls'
import { WhatsappLogoIcon } from '@phosphor-icons/react'

interface WhatsappProductLinkProps {
  productName: string
}

export function WhatsappProductLink({ productName }: WhatsappProductLinkProps) {
  const solicitationText = encodeURIComponent(
    `Olá!\n\n` +
      `Tenho interesse na seguinte caneca:\n` +
      `${productName}\n\n` +
      `Poderia me informar o frete, prazo de produção e envio?\n\n` +
      `Obrigada(o)!`,
  )

  return (
    <a
      onClick={(event) => event.stopPropagation()}
      target="_blank"
      href={`${URL_WHATSAPP}?text=${solicitationText}`}
      className={`
        flex items-center w-full bg-whatsapp text-whatsapp-foreground
        gap-1 sm:gap-2 justify-center py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base 
        hover:brightness-110 duration-300
      `}
    >
      <WhatsappLogoIcon className="size-4.5 sm:size-5" />
      Solicitar pelo WhatsApp
    </a>
  )
}
