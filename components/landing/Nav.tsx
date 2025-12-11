'use client';

import Link from 'next/link';

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 flex justify-between items-center bg-black/90 backdrop-blur-[40px] border-b border-white/[0.06]">
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
          className="px-7 py-3 bg-gradient-brand text-white text-[13px] font-semibold rounded-full transition-all hover:opacity-90 hover:-translate-y-0.5"
        >
          Join Waitlist
        </Link>
      </div>
    </nav>
  );
}
