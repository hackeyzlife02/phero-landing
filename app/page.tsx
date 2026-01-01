import { AnnouncementBanner } from '@/components/landing/AnnouncementBanner';
import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { Empathy } from '@/components/landing/Empathy';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Referral } from '@/components/landing/Referral';
import { Stylists } from '@/components/landing/Stylists';
import { WaitlistForm } from '@/components/landing/WaitlistForm';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen text-white relative">
      {/* Fixed gradient background - simplest possible: inset-0 with no height */}
      <div className="fixed inset-0 bg-gradient-brand" style={{ zIndex: -1 }} />

      <AnnouncementBanner />
      <Nav />
      <Hero />
      <section className="min-h-[100dvh] flex flex-col pt-[90px] bg-black">
        <Empathy />
        <HowItWorks />
      </section>
      <Referral />
      <Stylists />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
