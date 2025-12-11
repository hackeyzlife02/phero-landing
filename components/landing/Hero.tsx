'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Particles } from './Particles';
import { TonightCard } from './TonightCard';

export function Hero() {
  return (
    <section className="min-h-screen relative">
      {/* Mobile: Single column with gradient */}
      <div className="lg:hidden min-h-screen bg-gradient-brand">
        <div className="flex flex-col justify-center px-7 py-36 min-h-screen">
          <div className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-8">
            NYC &middot; 2025
          </div>

          <h1 className="font-headline text-5xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] mb-6">
            Never <em className="font-serif italic font-normal">second-guess</em> again.
          </h1>

          <p className="font-body text-[17px] text-white/60 max-w-[400px] leading-[1.7] mb-3">
            Connect with a Style Pro before your next date. 30 minutes. Walk in ready.
          </p>

          <p className="font-body text-sm text-white/40 mb-9">
            $45 &middot; 30 minutes &middot; Text or video
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5">
            {/* Primary CTA - white on gradient bg per HIG */}
            <Link
              href="#waitlist"
              className="inline-flex items-center justify-center gap-2.5 px-9 py-[18px] bg-white text-[#111111] font-body text-sm font-semibold rounded-full transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.24)] group"
            >
              Join the Waitlist
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            {/* Secondary CTA - outlined white border */}
            <Link
              href="#stylists"
              className="inline-flex items-center justify-center px-9 py-[18px] bg-transparent text-white font-body text-sm font-medium border-2 border-white/90 rounded-full transition-all hover:bg-white/10"
            >
              I&apos;m a Style Pro
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop: Two column grid - Content LEFT (black), Visual RIGHT (gradient) */}
      <div className="hidden lg:grid grid-cols-[1.1fr_0.9fr] min-h-screen">
        {/* LEFT: Content on black background */}
        <div className="flex flex-col justify-center px-[72px] py-24 bg-black">
          <div className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-8">
            NYC &middot; 2025
          </div>

          <h1 className="font-headline text-7xl font-semibold leading-[1.05] tracking-[-0.03em] mb-6">
            Never <em className="font-serif italic font-normal">second-guess</em> again.
          </h1>

          <p className="font-body text-[17px] text-white/60 max-w-[400px] leading-[1.7] mb-3">
            Connect with a Style Pro before your next date. 30 minutes. Walk in ready.
          </p>

          <p className="font-body text-sm text-white/40 mb-9">
            $45 &middot; 30 minutes &middot; Text or video
          </p>

          <div className="flex gap-3.5">
            {/* Primary CTA - gradient button on black bg */}
            <Link
              href="#waitlist"
              className="inline-flex items-center justify-center gap-2.5 px-9 py-[18px] bg-gradient-brand text-white font-body text-sm font-semibold rounded-full transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-gradient group"
            >
              Join the Waitlist
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            {/* Secondary CTA - ghost button */}
            <Link
              href="#stylists"
              className="inline-flex items-center justify-center px-9 py-[18px] bg-transparent text-white font-body text-sm font-medium border border-white/15 rounded-full transition-all hover:bg-white/5 hover:border-white/30"
            >
              I&apos;m a Style Pro
            </Link>
          </div>
        </div>

        {/* RIGHT: Visual on gradient background */}
        <div className="relative overflow-hidden flex items-center justify-center p-16 bg-gradient-brand">
          {/* Radial highlight */}
          <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_60%)]" />

          <Particles />
          <TonightCard />
        </div>
      </div>
    </section>
  );
}
