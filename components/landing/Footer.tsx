import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 md:px-12 border-t border-white/[0.04]">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        <Link
          href="/faq"
          className="font-headline text-[13px] text-white/30 transition-colors hover:text-white/60"
        >
          FAQ
        </Link>
        <p className="font-headline text-[13px] text-white/30 tracking-[0.08em]">
          PHERO &copy; 2025
        </p>
      </div>
    </footer>
  );
}
