import Link from 'next/link';
import { ArrowLeft, Mail, MessageCircle, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support — PHERO',
  description: 'Get help with PHERO. Contact our support team or browse our FAQ.',
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="px-6 md:px-12 py-5 md:py-6 border-b border-white/[0.06]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/50 text-[13px] font-body font-semibold tracking-[0.12em] transition-colors hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          PHERO
        </Link>
      </header>

      {/* Main content */}
      <main className="max-w-[600px] mx-auto px-6 py-16 md:py-20">
        <h1 className="font-headline text-[28px] md:text-[32px] font-medium mb-4">
          Support
        </h1>
        <p className="font-body text-[15px] leading-[1.7] text-white/50 mb-12 md:mb-16">
          We&apos;re here to help. Choose an option below or reach out directly.
        </p>

        {/* Support Options */}
        <div className="flex flex-col gap-4">
          {/* Email Support */}
          <a
            href="mailto:support@pheroapp.com"
            className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] transition-colors hover:border-white/[0.12] hover:bg-white/[0.02]"
          >
            <div className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-white/60" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-headline text-[15px] font-medium mb-1">
                Email Us
              </h2>
              <p className="font-body text-[14px] leading-[1.6] text-white/50">
                support@pheroapp.com
              </p>
              <p className="font-body text-[13px] leading-[1.6] text-white/30 mt-1">
                We typically respond within 24 hours
              </p>
            </div>
          </a>

          {/* FAQ */}
          <Link
            href="/faq"
            className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] transition-colors hover:border-white/[0.12] hover:bg-white/[0.02]"
          >
            <div className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-white/60" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-headline text-[15px] font-medium mb-1">
                FAQ
              </h2>
              <p className="font-body text-[14px] leading-[1.6] text-white/50">
                Find answers to common questions
              </p>
            </div>
          </Link>

          {/* Terms & Privacy */}
          <div className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.06]">
            <div className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white/60" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-headline text-[15px] font-medium mb-1">
                Legal
              </h2>
              <div className="flex gap-4">
                <a
                  href="mailto:legal@pheroapp.com?subject=Terms%20of%20Service%20Request"
                  className="font-body text-[14px] text-white/50 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="mailto:legal@pheroapp.com?subject=Privacy%20Policy%20Request"
                  className="font-body text-[14px] text-white/50 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="mt-16 pt-12 border-t border-white/[0.06]">
          <h2 className="font-headline text-[15px] font-medium mb-3">
            App Information
          </h2>
          <div className="font-body text-[14px] leading-[1.8] text-white/50">
            <p>PHERO for iOS</p>
            <p>Version 1.0.0</p>
            <p className="mt-4 text-white/30">
              © 2025 Stylist on Standby, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
