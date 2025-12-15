import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  theme?: 'light' | 'dark';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, theme = 'light', ...props }, ref) => {
    const isLight = theme === 'light';

    return (
      <div className="w-full">
        {label && (
          <label className={clsx(
            'block text-sm font-medium mb-2',
            isLight ? 'text-[#1D1D1F]' : 'text-white'
          )}>
            {label}
            {props.required && <span className="text-brand-red ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-3.5 rounded-xl border transition-all duration-200',
            'font-body text-[15px]',
            'focus:outline-none focus:ring-2',
            isLight ? [
              'bg-[#F5F5F7] text-[#1D1D1F] placeholder-[#6E6E73]',
              'border-transparent',
              'focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-[#1D1D1F]/10',
              error && 'border-brand-red focus:ring-brand-red/20'
            ] : [
              'bg-white/5 text-white placeholder-white/40',
              'border-white/10',
              'focus:bg-white/10 focus:border-white/20 focus:ring-white/10',
              error && 'border-red-400 focus:ring-red-400/20'
            ],
            className
          )}
          {...props}
        />
        {error && (
          <p className={clsx(
            'mt-2 text-sm',
            isLight ? 'text-brand-red' : 'text-red-400'
          )}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className={clsx(
            'mt-2 text-sm',
            isLight ? 'text-[#6E6E73]' : 'text-white/60'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
