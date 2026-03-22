import footerLogoImg from "@autoria/assets/svgs/footer-logo.svg";
import logo from "@autoria/assets/svgs/logo.svg";
import { APP_ROUTE } from "@autoria/constants/app-route";
import { LANDING_PAGE_SECTIONS } from "@autoria/constants/landing-page-sections";
import { ULR_INSTAGRAM, URL_WHATSAPP } from "@autoria/constants/urls";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)")({
	component: PublicLayout,
});

function PublicLayout() {
	const customMug = "Olá! Gostaria de solicitar uma caneca personalizada.";

	return (
		<main className="min-h-screen flex flex-col">
			<header className="bg-header text-header-foreground py-4 sm:py-0 px-4 sm:px-28 w-full z-20">
				<div className="max-w-[1920px] sm:min-h-20 flex items-center justify-between">
					<Link to={APP_ROUTE.public.landingPage}>
						<img src={logo} className="h-8 pointer-events-none" alt="logo" />
					</Link>

					<nav className="hidden sm:flex items-center gap-2 sm:gap-20">
						<Link
							className={`
            cursor-pointer relative h-8 flex items-center transition duration-300 
            after:transition-[width] after:duration-300 after:content-[''] after:absolute 
            after:bottom-0 after:left-0 after:h-px after:bg-primary-foreground after:w-0 
            hover:after:w-full text-primary-foreground pr-2
          `}
							to={APP_ROUTE.public.landingPage}
							hash={LANDING_PAGE_SECTIONS.products}
						>
							Produtos
						</Link>

						<Link
							className={`
            cursor-pointer relative h-8 flex items-center transition duration-300 
            after:transition-[width] after:duration-300 after:content-[''] after:absolute 
            after:bottom-0 after:left-0 after:h-px after:bg-primary-foreground after:w-0 
            hover:after:w-full text-primary-foreground pr-2
          `}
							to={APP_ROUTE.public.landingPage}
							hash={LANDING_PAGE_SECTIONS.works}
						>
							Como funciona
						</Link>

						<Link
							className={`
            cursor-pointer relative h-8 flex items-center transition duration-300 
            after:transition-[width] after:duration-300 after:content-[''] after:absolute 
            after:bottom-0 after:left-0 after:h-px after:bg-primary-foreground after:w-0 
            hover:after:w-full text-primary-foreground pr-2
          `}
							to={APP_ROUTE.public.landingPage}
							hash={LANDING_PAGE_SECTIONS.questions}
						>
							Perguntas frequentes
						</Link>

						<a
							className={`
            cursor-pointer relative h-8 flex items-center transition duration-300 
            after:transition-[width] after:duration-300 after:content-[''] after:absolute 
            after:bottom-0 after:left-0 after:h-px after:bg-primary-foreground after:w-0 
            hover:after:w-full pr-2 text-secondary
          `}
							href={`${URL_WHATSAPP}?text=${customMug}`}
							target="_blank"
						>
							Personalizar caneca
						</a>
					</nav>
				</div>
			</header>

			<div className="w-full bg-background">
				<Outlet />
			</div>

			<footer className="mx-auto mb-0 mt-auto py-10 w-full">
				<div
					className={`
            max-w-[1920px] px-4 sm:px-28 mx-auto my-0 flex flex-col sm:flex-row 
            w-full gap-6 sm:gap-8 items-center sm:items-start sm:justify-between 
          `}
				>
					<img
						src={footerLogoImg}
						className="h-[80px] sm:h-[120px] pointer-events-none"
						alt="logo"
					/>

					{/* <nav className="flex flex-col gap-2 items-center sm:items-start">
            <h3 className="text-secondary font-bold text-lg">Coleções</h3>
          </nav> */}

					<nav className="flex flex-col gap-2 items-center sm:items-start">
						<h3 className="text-secondary font-bold text-lg">Contato</h3>

						<a
							target="_blank"
							href={URL_WHATSAPP}
							className="text-secondary-foreground text-base hover:underline"
						>
							Fale conosco pelo WhatsApp
						</a>
						<a
							target="_blank"
							href={ULR_INSTAGRAM}
							className="text-secondary-foreground text-base hover:underline"
						>
							Siga nossa página no Instagram
						</a>
						<Link
							to="/"
							className="text-secondary-foreground text-base hover:underline"
						>
							E-mail de atendimento
						</Link>
						{/* <Link
              to="/"
              className="text-secondary-foreground text-base hover:underline"
            >
              Personalização
            </Link> */}
					</nav>

					<nav className="flex flex-col gap-2 items-center sm:items-start">
						<h3 className="text-secondary font-bold text-lg">Dúvidas</h3>

						<Link
							to={APP_ROUTE.public.privacyPolicies}
							className="text-secondary-foreground text-base hover:underline"
						>
							Política de Privacidade
						</Link>

						<Link
							to={APP_ROUTE.public.terms}
							className="text-secondary-foreground text-base hover:underline"
						>
							Termos de Uso
						</Link>

						<Link
							to={APP_ROUTE.public.exchangesAndReturns}
							className="text-secondary-foreground text-base hover:underline"
						>
							Política de Trocas e Devoluções
						</Link>

						<Link
							to={APP_ROUTE.public.deliveryAndShipping}
							className="text-secondary-foreground text-base hover:underline"
						>
							Política de Entrega e Frete
						</Link>
					</nav>
				</div>
			</footer>
		</main>
	);
}
