import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { Transformation } from '@/components/landing/Transformation';
import { Receipts } from '@/components/landing/Receipts';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Stylists } from '@/components/landing/Stylists';
import { WaitlistForm } from '@/components/landing/WaitlistForm';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />
      <Hero />
      <Transformation />
      <Receipts />
      <HowItWorks />
      <Stylists />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
