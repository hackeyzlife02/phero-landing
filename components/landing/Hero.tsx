'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HeroCarousel } from './HeroCarousel';
import { WaitlistModal } from './WaitlistModal';

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="hero-section flex flex-col pt-[80px] sm:pt-[100px] md:pt-[120px] px-4 sm:px-7 hero-padding-bottom relative bg-gradient-brand"
    >
      {/* Content */}
      <div className="text-center max-w-[700px] mx-auto flex-1 flex flex-col justify-center">
        {/* Badge */}
        <div className="mb-5 sm:mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[0.8rem] font-medium tracking-wide">
            <svg className="w-3.5 h-3.5 text-white/70" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>NYC</span>
            <span className="w-px h-3 bg-white/30" />
            <span>2026</span>
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-headline text-[1.875rem] sm:text-[clamp(2.25rem,6vw,3.5rem)] font-bold leading-[0.95] tracking-[-0.03em] mb-4 sm:mb-4">
          Nail the Dates<br /><em className="font-serif italic font-normal">You Already Have.</em>
        </h1>

        {/* Subheadline */}
        <p className="text-[0.875rem] sm:text-[clamp(0.9375rem,2vw,1.0625rem)] leading-[1.5] opacity-90 mb-5 sm:mb-5 max-w-[300px] sm:max-w-[360px] mx-auto">
          Your personalized Style Pro to dial up your confidence before your next date.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center items-center mx-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 sm:py-3.5 bg-white text-black font-headline text-[0.8125rem] sm:text-[0.875rem] font-semibold rounded-full text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.2)] min-w-[155px]"
          >
            Get Early Access
          </button>
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

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
