import mugImg from "@autoria/assets/images/mug.png";
import { LANDING_PAGE_SECTIONS } from "@autoria/constants/landing-page-sections";
import { WorksItem } from "./works-item";

export function HowItWorksSection() {
	return (
		<section
			className={`
        mx-auto px-4 sm:px-28 py-12 sm:py-20 flex flex-col sm:flex-row items-center w-full bg-primary 
        after:content-[''] after:absolute after:size-72 after:bg-primary after:rounded-full 
        after:blur-3xl after:-top-32 after:left-24 after:brightness-125  justify-center relative overflow-hidden
        before:content-[''] before:absolute before:size-72 before:bg-primary before:rounded-full
        before:blur-3xl before:-bottom-32 before:left-96 before:brightness-125 gap-8 sm:gap-96
      `}
			id={LANDING_PAGE_SECTIONS.works}
		>
			<img
				src={mugImg}
				alt="Caneca com estampa personalizada"
				className="h-[240px] sm:h-[400px] z-10"
			/>

			<div className="flex flex-col gap-2 sm:gap-4 z-10">
				<h2 className="text-2xl sm:text-4xl font-bold text-secondary text-center sm:text-left">
					Crie sua caneca do seu jeito!
				</h2>

				<h3 className="text-xl sm:text-2xl text-primary-foreground text-center sm:text-left">
					Aqui você pode criar a sua estampa pensada do zero.
				</h3>

				<ul className="flex flex-col gap-4 mt-4">
					<WorksItem
						item="01"
						description="Chame a gente no WhatsApp e conte a sua ideia."
						title="Conte a sua ideia"
					/>
					<WorksItem
						item="02"
						description="Criamos a sua estampa com todo cuidado."
						title="Sua estampa do seu jeito"
					/>
					<WorksItem
						item="03"
						description="Você aprova ou ajusta como quiser até ficar perfeito."
						title="Aprove ou ajuste"
					/>
					<WorksItem
						item="04"
						description="Produzimos e enviamos a sua caneca até você! "
						title="Enviamos até você!"
					/>
				</ul>
			</div>
		</section>
	);
}
