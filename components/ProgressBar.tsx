'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  variant?: 'light' | 'dark';
}

export function ProgressBar({ current, total, variant = 'light' }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);
  const isLight = variant === 'light';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <span className={`font-body text-[13px] ${isLight ? 'text-[#6E6E73]' : 'text-white/60'}`}>
          Step {current} of {total}
        </span>
        <span className="font-headline text-[13px] font-semibold bg-gradient-brand-text bg-clip-text text-transparent">
          {percentage}%
        </span>
      </div>
      <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-[#E5E5E7]' : 'bg-white/10'}`}>
        <div
          className="bg-gradient-brand h-full rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
