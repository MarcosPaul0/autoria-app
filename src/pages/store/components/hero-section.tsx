import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@autoria/components/carousel'
import Autoplay from 'embla-carousel-autoplay'
import memoriasDeMinas from '@autoria/assets/images/memorias-de-minas.png'
import feNoDiaADia from '@autoria/assets/images/fe-no-dia-a-dia.png'
import petLovers from '@autoria/assets/images/pet-lovers.png'
import { LANDING_PAGE_SECTIONS } from '@autoria/constants/landing-page-sections'

export function HeroSection() {
  return (
    <section
      className="max-w-[1920px] mx-auto mb-0"
      id={LANDING_PAGE_SECTIONS.home}
    >
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          <CarouselItem key="memorias-de-minas">
            <img
              src={memoriasDeMinas}
              className="h-[150px] sm:h-[600px] pointer-events-none"
              alt="logo"
            />
          </CarouselItem>

          <CarouselItem key="fe-no-dia-a-dia">
            <img
              src={feNoDiaADia}
              className="h-[150px] sm:h-[600px] pointer-events-none"
              alt="store"
            />
          </CarouselItem>

          <CarouselItem key="pet-lovers">
            <img
              src={petLovers}
              className="h-[150px] sm:h-[600px] pointer-events-none"
              alt="logo"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  )
}
