'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is PHERO?',
    answer: 'PHERO is for people who want to walk in ready — not just looking right, but feeling it. Before a date, you book a short session with a Style Pro you trust. They help you get out of your head, settle the doubt, and show up like you belong there. By the time you walk in, you\'re not hoping it goes well. You\'re expecting it to.',
  },
  {
    question: 'Is this a dating app?',
    answer: 'No. PHERO does not match you with people. It supports how you present yourself when it matters. Dating is the context. Presence is the point.',
  },
  {
    question: 'Is this a styling app?',
    answer: 'It\'s more than that. First dates come with a lot — am I interesting enough, will they like me, what if I mess this up. Your Style Pro is there for all of it. Yes, they help you look right. But they also help you feel ready. By the time you walk in, the doubt is quiet. You\'re not hoping it goes well. You\'re expecting it to.',
  },
  {
    question: 'What actually happens?',
    answer: 'You book a session before you go out. Over text or video, your Style Pro helps you decide, refine, and commit so you know exactly how you\'re walking in.',
  },
  {
    question: 'Do I need to buy new clothes?',
    answer: 'No. PHERO works with what you already own. This is about clarity and intention. Choosing the right version of yourself for where you\'re going.',
  },
  {
    question: 'Who are the Style Pros?',
    answer: 'Style Pros are people with a trained eye, individuality, and real taste. Many come from fashion and creative industries and understand how small choices change how you show up.',
  },
  {
    question: 'Text or video?',
    answer: 'Both. Some sessions call for quick confirmation. Others benefit from face-to-face energy. You choose what fits the situation.',
  },
  {
    question: 'What if we don\'t vibe?',
    answer: 'That\'s okay. You can book someone else next time. No awkward conversations. PHERO is about finding the person you connect with most.',
  },
  {
    question: 'Can I keep the same Style Pro?',
    answer: 'Yes. Most people do. When you find someone who gets you, you can book them again. Over time, they learn your taste, your style, and what you\'re going for.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
        <h1 className="font-headline text-[28px] md:text-[32px] font-medium mb-12 md:mb-16">
          FAQ
        </h1>

        {/* FAQ List */}
        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <div key={index} className="border-t border-white/[0.06]">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center py-6 text-left font-headline text-[15px] font-medium text-white transition-colors hover:text-white/70"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-[18px] h-[18px] text-white/30 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="font-body text-[15px] leading-[1.7] text-white/50">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-16 pt-12 border-t border-white/[0.06]">
          <h2 className="font-headline text-[15px] font-medium mb-3">
            Have more questions?
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-white/50">
            We&apos;re happy to help. Reach out anytime at{' '}
            <a
              href="mailto:contact@pheroapp.com"
              className="text-white/50 transition-colors hover:text-white"
            >
              contact@pheroapp.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
