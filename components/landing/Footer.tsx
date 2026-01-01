import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-black py-7 sm:py-9 px-4 sm:px-7 border-t border-white/[0.08]">
      <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        {/* Logo */}
        <div className="font-headline font-bold text-[0.85rem] tracking-[0.14em]">
          PHERO
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <Link
            href="/faq"
            className="sm:hidden text-white/50 text-[0.75rem] transition-colors hover:text-white"
          >
            FAQ
          </Link>
          <a
            href="mailto:hello@pheroapp.com"
            className="text-white/50 text-[0.75rem] transition-colors hover:text-white"
          >
            Contact
          </a>
          <Link
            href="/privacy"
            className="text-white/50 text-[0.75rem] transition-colors hover:text-white"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-white/50 text-[0.75rem] transition-colors hover:text-white"
          >
            Terms
          </Link>
          <a
            href="https://instagram.com/pheroapp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 text-[0.75rem] transition-colors hover:text-white"
          >
            Instagram
          </a>
        </div>

        {/* Copyright */}
        <div className="text-white/40 text-[0.7rem]">
          &copy; 2025 PHERO
        </div>
      </div>
    </footer>
  );
}
