import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import Security from '@/components/Security';
import Integration from '@/components/Integration';
import Services from '@/components/Services';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
	return (
		<main className="relative font-sans antialiased bg-white">
			<Hero />
			<Services />
			<Integration />
			<FinalCTA />
			<Security />
			<Pricing />
		</main>
	);
}