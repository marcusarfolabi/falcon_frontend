import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import Security from '@/components/Security';
import Services from '@/components/Services';

export default function Home() {
	return (
		<main className="relative font-sans antialiased bg-white">
			<Hero />
			<Services />
			<Security />
			<Pricing />
		</main>
	);
}