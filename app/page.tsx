import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { Grounding } from '@/components/landing/Grounding';
import { Gallery } from '@/components/landing/Gallery';
import { Interruption } from '@/components/landing/Interruption';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Stylists } from '@/components/landing/Stylists';
import { WaitlistForm } from '@/components/landing/WaitlistForm';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />
      <Hero />
      <Grounding />
      <Gallery />
      <Interruption />
      <HowItWorks />
      <Stylists />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
