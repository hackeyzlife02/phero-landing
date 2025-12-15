import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'font-headline font-semibold rounded-full transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        {
          // Primary: Black button (for white backgrounds)
          'bg-black text-white hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] focus:ring-black focus:ring-offset-white':
            variant === 'primary',
          // Secondary: Glassmorphic (for dark/gradient backgrounds)
          'bg-white/10 backdrop-blur-[16px] text-white border border-white/[0.08] hover:bg-white/[0.14] hover:translate-x-1 focus:ring-white/50 focus:ring-offset-transparent':
            variant === 'secondary',
          // Outline: Transparent with border
          'bg-transparent text-[#1D1D1F] border border-[#1D1D1F]/20 hover:bg-[#1D1D1F]/5 focus:ring-[#1D1D1F]/30 focus:ring-offset-white':
            variant === 'outline',
          // Ghost: No background, subtle hover
          'bg-transparent text-white/60 hover:text-white hover:bg-white/5 focus:ring-white/30 focus:ring-offset-transparent':
            variant === 'ghost',
          // Size styles
          'px-5 py-2.5 text-sm': size === 'sm',
          'px-7 py-3.5 text-sm': size === 'md',
          'px-9 py-[18px] text-sm': size === 'lg',
          // Full width
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
