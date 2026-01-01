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
        fixed top-[31px] sm:top-[33px] left-0 right-0 z-[1000]
        px-4 sm:px-7 py-4
        flex justify-between items-center
        transition-all duration-300 ease-out
        ${scrolled
          ? 'bg-black/80 backdrop-blur-xl'
          : 'bg-black/20 backdrop-blur-xl'
        }
      `}
    >
      <Link href="/" className="font-headline text-[0.85rem] font-bold tracking-[0.14em] text-white">
        PHERO
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="#pros"
          className="hidden md:block text-white/70 text-[0.75rem] font-medium transition-colors hover:text-white"
        >
          Become a Style Pro
        </Link>
        <Link
          href="#cta"
          className="px-4 py-2 bg-white text-black text-[0.7rem] font-semibold rounded-full transition-transform duration-300 hover:scale-105"
        >
          Early Access
        </Link>
      </div>
    </nav>
  );
}
