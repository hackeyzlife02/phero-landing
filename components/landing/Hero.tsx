'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 pt-[100px] md:pt-[120px] pb-[60px] relative overflow-hidden">
      {/* Pheromone field background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Red orb */}
        <div
          className="absolute top-[20%] left-[30%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(154,27,27,0.08)_0%,transparent_70%)] blur-[80px] animate-drift1"
        />
        {/* Purple orb */}
        <div
          className="absolute bottom-[20%] right-[25%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(123,45,158,0.06)_0%,transparent_70%)] blur-[100px] animate-drift2"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="font-headline text-[10px] font-semibold tracking-[0.25em] uppercase text-white/35 mb-6">
          Limited Early Access
        </p>

        <h1 className="font-headline text-[clamp(48px,9vw,96px)] font-medium leading-none tracking-[-0.04em] mb-6">
          Never <em className="font-serif italic font-normal">second-guess</em> again.
        </h1>

        <p className="font-headline text-[17px] text-white/50 mb-10 max-w-[400px] mx-auto leading-relaxed">
          Connect with a Style Pro before your next date.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#waitlist"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-brand text-white font-headline text-sm font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(154,27,27,0.25)] group"
          >
            Get Early Access
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
          </Link>

          <Link
            href="#stylists"
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-headline text-sm font-semibold rounded-full border border-white/15 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/30"
          >
            I&apos;m a Style Pro
          </Link>
        </div>
      </div>
    </section>
  );
}
