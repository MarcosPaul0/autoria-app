import { HeroSection } from "./components/hero-section";
import { HowItWorksSection } from "./components/how-it-works-section";
import { ProductsSection } from "./components/products-section";
import { QuestionSection } from "./components/questions-section";
import { WhatsappButton } from "./components/whatsapp-button";

export function StorePage() {
	return (
		<>
			<HeroSection />

			<ProductsSection />

			<HowItWorksSection />

			<QuestionSection />

			<WhatsappButton />
		</>
	);
}
