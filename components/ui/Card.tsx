import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'light' | 'glass' | 'dark';
}

export function Card({ children, className, padding = 'md', variant = 'light' }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl transition-all duration-200',
        {
          // Variant styles
          'bg-[#F5F5F7]': variant === 'light',
          'bg-white/10 backdrop-blur-[16px] border border-white/[0.08]': variant === 'glass',
          'bg-surface-alt border border-white/10': variant === 'dark',
          // Padding styles
          'p-0': padding === 'none',
          'p-4 md:p-5': padding === 'sm',
          'p-6 md:p-8': padding === 'md',
          'p-8 md:p-10': padding === 'lg',
        },
        className
      )}
    >
      {children}
    </div>
  );
}
