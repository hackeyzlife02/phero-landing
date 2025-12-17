'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-4 sm:py-5
        flex justify-between items-center
        transition-all duration-300 ease-out
        ${scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent border-b border-transparent'
        }
      `}
    >
      <Link href="/" className="font-headline text-base font-semibold text-white tracking-[0.12em]">
        PHERO
      </Link>

      <div className="flex items-center gap-8">
        <Link
          href="#how"
          className="hidden md:block font-headline text-[13px] text-white/50 transition-colors hover:text-white"
        >
          How it works
        </Link>
        <Link
          href="#stylists"
          className="hidden md:block font-headline text-[13px] text-white/50 transition-colors hover:text-white"
        >
          Style Pros
        </Link>
        <Link
          href="#waitlist"
          className="px-5 sm:px-6 py-3 sm:py-2.5 bg-gradient-brand text-white font-headline text-[13px] font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(154,27,27,0.3)]"
        >
          Early Access
        </Link>
      </div>
    </nav>
  );
}
