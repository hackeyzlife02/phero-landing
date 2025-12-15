'use client';

import Link from 'next/link';

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 flex justify-between items-center bg-transparent lg:bg-black/90 lg:backdrop-blur-[40px] lg:border-b lg:border-white/[0.06]">
      <Link href="/" className="font-headline text-base font-semibold text-white tracking-[0.12em]">
        PHERO
      </Link>

      <div className="flex items-center gap-9">
        <Link
          href="#how"
          className="hidden md:block text-white/50 text-[13px] font-medium transition-colors hover:text-white"
        >
          How it works
        </Link>
        <Link
          href="#stylists"
          className="hidden md:block text-white/50 text-[13px] font-medium transition-colors hover:text-white"
        >
          Style Pros
        </Link>
        <Link
          href="#waitlist"
          className="relative px-7 py-3 bg-white text-black text-[13px] font-semibold rounded-full transition-all hover:bg-white/90 hover:-translate-y-0.5 shadow-[0_0_20px_rgba(154,27,27,0.3),0_0_40px_rgba(123,45,158,0.2)] lg:bg-gradient-brand lg:text-white lg:shadow-none lg:hover:opacity-90"
        >
          Join Waitlist
        </Link>
      </div>
    </nav>
  );
}
