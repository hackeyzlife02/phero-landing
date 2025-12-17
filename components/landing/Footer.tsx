'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Instagram } from 'lucide-react';

export function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/[0.06]">
      {/* Desktop Layout */}
      <div className="hidden md:flex justify-between items-start max-w-[1100px] mx-auto">
        {/* Left: FAQ */}
        <Link
          href="/faq"
          className="font-headline text-[13px] text-white/50 transition-colors hover:text-white"
        >
          FAQ
        </Link>

        {/* Center: Social + Copyright */}
        <div className="flex flex-col items-center gap-3">
          <a
            href="https://instagram.com/pheroapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white transition-opacity hover:opacity-60"
          >
            <Instagram className="w-5 h-5" strokeWidth={1.5} />
          </a>
          <p className="font-headline text-xs text-white/30">
            &copy; 2025 PHERO &middot; NYC
          </p>
        </div>

        {/* Right: Legal */}
        <div className="flex items-center gap-3">
          <Link
            href="/privacy"
            className="font-headline text-[13px] text-white/40 transition-colors hover:text-white"
          >
            Privacy
          </Link>
          <span className="text-white/20 text-[13px]">|</span>
          <Link
            href="/terms"
            className="font-headline text-[13px] text-white/40 transition-colors hover:text-white"
          >
            Terms
          </Link>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Accordion */}
        <div className="border-b border-white/[0.06] mb-8">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center py-6 font-headline text-base font-medium text-white transition-opacity hover:opacity-70"
          >
            <span>The App</span>
            <ChevronDown
              className={`w-5 h-5 text-white transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
              strokeWidth={2}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? 'max-h-40 pb-6' : 'max-h-0'
            }`}
          >
            <Link
              href="/faq"
              className="block py-3 font-headline text-[15px] text-white/50 transition-colors hover:text-white"
            >
              FAQ
            </Link>
          </div>
        </div>

        {/* Social */}
        <div className="flex justify-center gap-8 mb-8">
          <a
            href="https://instagram.com/pheroapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white transition-opacity hover:opacity-60"
          >
            <Instagram className="w-6 h-6" strokeWidth={1.5} />
          </a>
        </div>

        {/* Legal */}
        <div className="flex justify-center items-center gap-3 mb-4">
          <Link
            href="/privacy"
            className="font-headline text-[13px] text-white/40 transition-colors hover:text-white"
          >
            Privacy
          </Link>
          <span className="text-white/20 text-[13px]">|</span>
          <Link
            href="/terms"
            className="font-headline text-[13px] text-white/40 transition-colors hover:text-white"
          >
            Terms
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-center font-headline text-xs text-white/30">
          &copy; 2025 PHERO &middot; NYC
        </p>
      </div>
    </footer>
  );
}
