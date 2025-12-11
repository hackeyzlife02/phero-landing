'use client';

import { useState, useRef } from 'react';

type Message = {
  type: 'stylist' | 'user' | 'result';
  text: string;
};

type ReceiptCardProps = {
  context: string;
  messages: Message[];
};

const receiptsData: ReceiptCardProps[] = [
  {
    context: 'First date · Wine bar',
    messages: [
      { type: 'stylist', text: 'Tell me about her' },
      { type: 'user', text: "She's really into art, works at a gallery in chelsea, kinda intimidating honestly" },
      { type: 'stylist', text: "Oh ok so you need to look like you have taste but you're not trying too hard yeah?" },
      { type: 'user', text: 'Yeah exactly' },
      { type: 'user', text: "Ok here's what I'm thinking" },
      { type: 'stylist', text: "Love the shirt. Lose the jacket, it's trying too hard. White sneakers not boots" },
      { type: 'user', text: 'Done' },
      { type: 'stylist', text: 'Now you look like you belong there. Go.' },
      { type: 'result', text: 'She said "I love your shirt" within 5 minutes' },
    ],
  },
  {
    context: 'Second date · Dinner',
    messages: [
      { type: 'stylist', text: "How'd the first one go?" },
      { type: 'user', text: 'Really good actually. We talked for like 3 hours' },
      { type: 'stylist', text: "Love that. Where's he taking you?" },
      { type: 'user', text: 'This italian place in tribeca' },
      { type: 'stylist', text: 'Ok so a little more effort this time. Show me options' },
      { type: 'user', text: 'I have no idea what to wear can we do video?' },
      { type: 'stylist', text: "Let's do it. Hopping on now." },
      { type: 'stylist', text: 'Okay you look amazing. Have fun tonight' },
      { type: 'result', text: "They're planning a third" },
    ],
  },
  {
    context: 'Third date · His apartment',
    messages: [
      { type: 'stylist', text: "Third date already. What's the plan?" },
      { type: 'user', text: "He's cooking for me" },
      { type: 'stylist', text: 'Oh this is the one huh' },
      { type: 'user', text: 'Maybe. I want to look good but effortless?' },
      { type: 'stylist', text: "Say less. Something soft, slightly oversized. You're not trying to impress anymore, you're just you" },
      { type: 'user', text: 'Ok I actually love that' },
      { type: 'stylist', text: 'You already know what to wear. Trust it.' },
      { type: 'result', text: 'Still dating 3 months later' },
    ],
  },
];

function ReceiptCard({ context, messages }: ReceiptCardProps) {
  return (
    <div className="bg-black/25 backdrop-blur-[20px] border border-white/[0.08] rounded-[20px] p-6 flex flex-col gap-3.5">
      <div className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase text-white/50">
        {context}
      </div>

      <div className="flex flex-col gap-1.5 max-h-80 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-3.5 py-[11px] rounded-[14px] font-body text-[13px] leading-[1.4] max-w-[85%] ${
              msg.type === 'stylist'
                ? 'bg-white/10 text-white/90 self-start rounded-bl-sm'
                : msg.type === 'user'
                ? 'bg-white text-black self-end rounded-br-sm'
                : 'bg-white/15 border border-white/20 text-white self-center text-center font-medium text-xs mt-1.5'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Receipts() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(newIndex);
  };

  return (
    <section className="py-24 md:py-32 px-7 md:px-[72px] bg-gradient-brand relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,255,255,0.06)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(0,0,0,0.2)_0%,transparent_50%)]" />

      <div className="max-w-[1000px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-4">
            Inside a Session
          </div>
          <h2 className="font-headline text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.02em]">
            This is <em className="font-serif italic font-normal">what it looks like.</em>
          </h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {receiptsData.map((receipt, i) => (
            <ReceiptCard key={i} {...receipt} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-7 px-7"
          >
            {receiptsData.map((receipt, i) => (
              <div key={i} className="flex-shrink-0 w-[85vw] snap-center">
                <ReceiptCard {...receipt} />
              </div>
            ))}
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {receiptsData.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'bg-white w-6'
                    : 'bg-white/30 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
