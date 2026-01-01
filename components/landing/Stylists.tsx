'use client';

import Link from 'next/link';
import { ArrowRight, Clock, DollarSign, RefreshCw, Star } from 'lucide-react';
import { type ReactNode } from 'react';

interface Perk {
  icon: ReactNode;
  title: string;
  description: string;
}

const perks: Perk[] = [
  {
    icon: <Clock className="w-[22px] h-[22px]" strokeWidth={2} />,
    title: 'On Your Terms',
    description: 'Work when and where you want. No algorithms. No content treadmill.',
  },
  {
    icon: <DollarSign className="w-[22px] h-[22px]" strokeWidth={2} />,
    title: 'Weekly Payouts',
    description: "For work you're already doing",
  },
  {
    icon: <RefreshCw className="w-[22px] h-[22px]" strokeWidth={2} />,
    title: 'Your Clients',
    description: 'Build relationships that last',
  },
  {
    icon: <Star className="w-[22px] h-[22px]" strokeWidth={2} />,
    title: 'Your Reputation',
    description: 'Be known for your taste',
  },
];

export function Stylists() {
  return (
    <section id="pros" className="bg-black py-16 sm:py-20 md:py-[100px] px-4 sm:px-7">
      <div className="max-w-[600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="font-headline text-[0.6rem] font-bold tracking-[0.2em] uppercase opacity-50 mb-3">
            For Style Pros
          </div>
          <h2 className="font-headline text-[clamp(1.5rem,4vw,2.2rem)] font-bold leading-[1.1] tracking-[-0.02em] mb-3">
            You&apos;ve always had the eye.<br />
            <em className="font-serif italic font-normal">Now that has a name.</em>
          </h2>
        </div>

        <p className="text-[0.9rem] leading-[1.7] opacity-60 text-center mb-10">
          You&apos;re the friend everyone texts at 7pm. &ldquo;Does this work?&rdquo; Now your taste has a platform.
        </p>

        {/* Perks Grid */}
        <div className="grid grid-cols-2 gap-4 mb-9">
          {perks.map((perk, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12]"
            >
              <div className="w-11 h-11 bg-gradient-brand rounded-xl flex items-center justify-center text-white mb-4">
                {perk.icon}
              </div>
              <h4 className="font-headline text-[0.95rem] font-semibold mb-1.5">
                {perk.title}
              </h4>
              <p className="text-[0.78rem] leading-snug opacity-60">
                {perk.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.08] border border-white/15 text-white font-headline text-[0.82rem] font-semibold rounded-full transition-all duration-300 hover:bg-white/[0.12] hover:border-white/25 hover:-translate-y-0.5"
          >
            Apply Now
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
