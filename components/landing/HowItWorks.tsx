'use client';

const steps = [
  {
    num: '1',
    title: 'Find your Style Pro',
    description: 'Browse people with taste you trust. Find someone whose eye matches yours.',
  },
  {
    num: '2',
    title: 'Book before your date',
    description: '$45. 30 minutes. Text or video. Right before you walk out.',
  },
  {
    num: '3',
    title: 'Walk in ready',
    description: 'Get the look locked. Leave certain.',
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-28 md:py-36 px-7 md:px-[72px] bg-black">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-5">
            How it works
          </div>
          <h2 className="font-headline text-[clamp(32px,4.5vw,48px)] font-semibold tracking-[-0.02em]">
            Fast. Personal.{' '}
            <em className="font-serif italic font-normal bg-gradient-brand-text bg-clip-text text-transparent">
              Precise.
            </em>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white/[0.02] border border-white/[0.06] rounded-[20px] p-8 md:p-10 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/[0.04] hover:border-brand-red/35 hover:-translate-y-1.5 group"
            >
              <div className="font-headline text-[44px] font-bold bg-gradient-brand bg-clip-text text-transparent opacity-50 mb-5 leading-none group-hover:opacity-80 transition-opacity">
                {step.num}
              </div>
              <h3 className="font-headline text-lg font-semibold mb-3">
                {step.title}
              </h3>
              <p className="font-body text-sm text-white/50 leading-[1.7]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
