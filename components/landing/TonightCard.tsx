'use client';

export function TonightCard() {
  return (
    <div className="relative z-10 bg-black/30 backdrop-blur-[24px] border border-white/10 rounded-3xl p-10 md:p-12 w-full max-w-[340px]">
      <div className="font-headline text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-3">
        Your Next Date
      </div>

      <div className="font-serif text-[52px] italic text-white mb-9 leading-none">
        Tonight
      </div>

      <div className="flex flex-col gap-[18px] mb-9">
        <div className="flex justify-between items-center pb-[18px] border-b border-white/[0.08]">
          <span className="font-body text-xs text-white/40 uppercase tracking-[0.1em]">
            Where
          </span>
          <span className="font-body text-sm text-white font-medium text-right">
            Lower East Side &middot; 8:30 PM
          </span>
        </div>

        <div className="flex justify-between items-center pb-[18px] border-b border-white/[0.08]">
          <span className="font-body text-xs text-white/40 uppercase tracking-[0.1em]">
            Session
          </span>
          <span className="font-body text-sm text-white font-medium text-right">
            27 min with Alex
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-body text-xs text-white/40 uppercase tracking-[0.1em]">
            Status
          </span>
          <span className="font-body text-sm text-white font-medium text-right flex items-center gap-2">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            Look locked in
          </span>
        </div>
      </div>

      <div className="font-body text-[13px] text-white/40 italic">
        One date you don&apos;t overthink.
      </div>
    </div>
  );
}
