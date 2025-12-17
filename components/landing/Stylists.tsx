'use client';

import Link from 'next/link';
import { ArrowRight, Clock, DollarSign, RefreshCw, Star } from 'lucide-react';
import { type ReactNode, useEffect, useRef, useState } from 'react';

interface Perk {
  icon: ReactNode;
  title: string;
  description: string;
}

const perks: Perk[] = [
  {
    icon: <Clock className="w-[22px] h-[22px]" strokeWidth={1.75} />,
    title: 'On Your Terms',
    description: 'Work when and where you want'
  },
  {
    icon: <DollarSign className="w-[22px] h-[22px]" strokeWidth={1.75} />,
    title: 'Get Paid',
    description: 'Weekly payouts'
  },
  {
    icon: <RefreshCw className="w-[22px] h-[22px]" strokeWidth={1.75} />,
    title: 'Your People',
    description: 'Regulars who come back to you'
  },
  {
    icon: <Star className="w-[22px] h-[22px]" strokeWidth={1.75} />,
    title: 'Your Brand',
    description: 'Build a name, not just a handle'
  },
];

export function Stylists() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="stylists"
      className={`py-20 md:py-[100px] px-4 sm:px-6 md:px-12 border-t border-white/[0.04] transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <div className="max-w-[900px] mx-auto">
        {/* Main grid: text centered to perks grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <div className="font-headline text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-12">
              For Style Pros
            </div>

            <h3 className="font-headline text-[32px] font-medium leading-[1.2] mb-4">
              You have the eye.<br />
              <em className="font-serif italic font-normal">Get paid for it.</em>
            </h3>

            <p className="font-headline text-[15px] text-white/45 leading-relaxed">
              You&apos;re not just picking outfits. You&apos;re giving them the confidence to walk in ready.
            </p>
          </div>

          {/* Right: Perks Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
            {perks.map((perk, i) => (
              <div
                key={i}
                className="bg-[#0D0D0D] border border-white/[0.04] rounded-2xl xs:rounded-[20px] p-5 xs:p-6 flex flex-col gap-3 xs:gap-4 transition-all duration-300 hover:bg-white/[0.04]"
              >
                <div className="w-12 h-12 bg-gradient-brand rounded-[14px] flex items-center justify-center text-white shrink-0">
                  {perk.icon}
                </div>
                <div>
                  <h5 className="font-headline text-[15px] font-semibold mb-1">
                    {perk.title}
                  </h5>
                  <p className="font-headline text-[13px] text-white/40 leading-snug">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA below grid, aligned to right column */}
        <div className="mt-5 lg:grid lg:grid-cols-2 lg:gap-20">
          <div className="hidden lg:block" />
          <div>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-headline text-sm font-semibold rounded-full border border-white/15 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/30 group"
            >
              Apply Now
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
