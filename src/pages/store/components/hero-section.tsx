import diaDasMaes from "@autoria/assets/images/dias-das-maes.png";
import feNoDiaADia from "@autoria/assets/images/fe-no-dia-a-dia.png";
import memoriasDeMinas from "@autoria/assets/images/memorias-de-minas.png";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@autoria/components/carousel";
import { LANDING_PAGE_SECTIONS } from "@autoria/constants/landing-page-sections";
import Autoplay from "embla-carousel-autoplay";

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
					<CarouselItem key="dia-das-maes">
						<img
							src={diaDasMaes}
							className="aspect-[3.2] pointer-events-none"
							alt="Coleção de dia das mães"
						/>
					</CarouselItem>

					<CarouselItem key="fe-no-dia-a-dia">
						<img
							src={feNoDiaADia}
							className="aspect-[3.2] pointer-events-none"
							alt="Coleção fé no dia a dia"
						/>
					</CarouselItem>
					{/* 
					<CarouselItem key="pet-lovers">
						<img
							src={petLovers}
							className="aspect-[3.2] pointer-events-none"
							alt="logo"
						/>
					</CarouselItem> */}
				</CarouselContent>
			</Carousel>
		</section>
	);
}
