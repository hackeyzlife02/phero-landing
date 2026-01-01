'use client';

import Link from 'next/link';
import { HeroCarousel } from './HeroCarousel';

export function Hero() {
  return (
    <section
      className="hero-section flex flex-col pt-[100px] sm:pt-[120px] md:pt-[140px] px-4 sm:px-7 hero-padding-bottom relative bg-gradient-brand"
    >
      {/* Content */}
      <div className="text-center max-w-[700px] mx-auto flex-1 flex flex-col justify-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/15 rounded-full mb-8 mx-auto">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="font-headline text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.12em] uppercase">
            NYC 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-headline text-[2.25rem] sm:text-[clamp(2.8rem,8vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] mb-6 sm:mb-5">
          Nail the Dates <em className="font-serif italic font-normal">You Already Have.</em>
        </h1>

        {/* Subheadline */}
        <p className="text-[0.9375rem] sm:text-[clamp(1rem,2.5vw,1.1rem)] leading-[1.5] opacity-90 mb-8 sm:mb-7 max-w-[320px] sm:max-w-[380px] mx-auto">
          Your personalized Style Pro to dial up your confidence before your next date.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center items-center mx-auto">
          <Link
            href="#cta"
            className="px-6 py-3 sm:py-3.5 bg-white text-black font-headline text-[0.8125rem] sm:text-[0.875rem] font-semibold rounded-full text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.2)] min-w-[155px]"
          >
            Get Early Access
          </Link>
          <Link
            href="#pros"
            className="px-6 py-3 sm:py-3.5 bg-white/15 text-white font-headline text-[0.8125rem] sm:text-[0.875rem] font-semibold rounded-full text-center transition-all duration-300 hover:bg-white/25 min-w-[155px]"
          >
            For Style Pros
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <HeroCarousel />
    </section>
  );
}
