'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="px-7 py-10 md:px-[72px] border-t border-white/[0.06] bg-black">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 text-center md:text-left">
        <div className="font-headline text-sm font-semibold tracking-[0.12em] text-white/35">
          PHERO
        </div>

        <div className="flex gap-8">
          <Link
            href="/privacy"
            className="text-white/35 font-body text-[13px] font-medium transition-colors hover:text-white"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-white/35 font-body text-[13px] font-medium transition-colors hover:text-white"
          >
            Terms
          </Link>
        </div>

        <p className="font-body text-[13px] text-white/35">
          &copy; 2025 PHERO &middot; NYC
        </p>
      </div>
    </footer>
  );
}
