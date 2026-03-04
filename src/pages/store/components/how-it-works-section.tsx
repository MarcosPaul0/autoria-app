import womanOnCellPhoneImg from '@autoria/assets/images/woman-in-cellphone.png'
import mugResultImg from '@autoria/assets/images/mug-result.png'
import { LANDING_PAGE_SECTIONS } from '@autoria/constants/landing-page-sections'
import { CustomerChat } from './customer-chat'
import { AutoriaChat } from './autoria-chat'
import { HowItWorksCard } from './how-it-works-card'

export function HowItWorksSection() {
  return (
    <section
      className="mx-auto px-4 sm:px-28 py-6 sm:py-20 flex flex-col items-center w-full bg-primary"
      id={LANDING_PAGE_SECTIONS.works}
    >
      <h2 className="text-xl sm:text-4xl font-bold text-primary-foreground">
        Crie sua caneca do seu jeito!
      </h2>

      <h3 className="text-sm sm:text-2xl mt-2 text-primary-foreground">
        Aqui você pode criar a sua estampa pensada do zero.
      </h3>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-8 grid-rows-2 gap-2 sm:gap-6 max-w-[1920px] w-full ">
        <HowItWorksCard
          step="first"
          title="Chame a gente no WhatsApp"
          image={
            <img
              src={womanOnCellPhoneImg}
              className="sm:h-[420px] pointer-events-none hidden sm:block"
              alt="store"
            />
          }
        >
          <CustomerChat
            text="Olá! Gostaria de uma caneca personalizada com a imagem dos meus
                gatinhos, Meg e Django."
          />

          <AutoriaChat
            text="Olá! Gostaria de uma caneca personalizada com a imagem dos meus
                gatinhos, Meg e Django."
          />
        </HowItWorksCard>

        <HowItWorksCard
          className=""
          step="second"
          title="Definimos ou criamos sua estampa"
        >
          <AutoriaChat text="Bruna, aqui está sua estampa e um exemplo de como ela ficará em sua caneca. Espero que goste!" />

          <AutoriaChat
            text={
              <img
                className="h-[92px] pointer-events-none"
                alt="Resultado da caneca solicitada"
                src={mugResultImg}
              />
            }
          />
        </HowItWorksCard>

        <HowItWorksCard
          step="third"
          title="Você aprova ou realizamos os ajustes solicitados"
        >
          <CustomerChat text="Eu adorei! Como prosseguimos?" />

          <AutoriaChat text="Vamos iniciar a produção e te enviamos conforme o prazo informado." />
        </HowItWorksCard>

        <HowItWorksCard
          step="fourth"
          title="Produzimos e enviamos a sua caneca até você!"
        >
          <AutoriaChat text="Bruna, sua caneca está pronta! Você pode acompanhar o envio clicando no link: rastreio.com.br" />

          <CustomerChat text="Ok, obrigada!" />
        </HowItWorksCard>
      </div>
    </section>
  )
}
