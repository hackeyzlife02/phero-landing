/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        headline: ['var(--font-headline)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '1', transform: 'translateX(-50%) translateY(-15%) scale(1)' },
          '50%': { opacity: '0.7', transform: 'translateX(-50%) translateY(-15%) scale(1.05)' },
        },
        pressIn: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.98)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        particleDrift: {
          '0%': { transform: 'translateY(100vh) translateX(0)', opacity: '0' },
          '5%': { opacity: '0.4' },
          '95%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-50px) translateX(30px)', opacity: '0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        drift1: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, -20px)' },
        },
        drift2: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-25px, 15px)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'carousel-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'typing-bounce': {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '30%': { transform: 'translateY(-4px)', opacity: '1' },
        },
        'bubble-pulse': {
          '0%, 100%': { boxShadow: '0 6px 24px rgba(0,122,255,0.22)' },
          '50%': { boxShadow: '0 10px 36px rgba(0,122,255,0.38)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'modal-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        glowPulse: 'glowPulse 4s ease-in-out infinite',
        pressIn: 'pressIn 120ms ease-out',
        shimmer: 'shimmer 1.8s linear infinite',
        particleDrift: 'particleDrift 20s linear infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        drift1: 'drift1 20s ease-in-out infinite',
        drift2: 'drift2 25s ease-in-out infinite',
        reveal: 'reveal 0.8s ease forwards',
        'carousel-scroll': 'carousel-scroll 24s linear infinite',
        'typing-bounce': 'typing-bounce 1.4s ease-in-out infinite',
        'bubble-pulse': 'bubble-pulse 2.5s ease-in-out infinite',
        'marquee': 'marquee 12s linear infinite',
        'fade-in': 'fade-in 150ms ease-out',
        'modal-in': 'modal-in 200ms ease-out',
      },
      spacing: {
        'xxs': 'var(--spacing-xxs)',
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        'xxl': 'var(--spacing-xxl)',
        'xxxl': 'var(--spacing-xxxl)',
        'jumbo': 'var(--spacing-jumbo)',
      },
      colors: {
        brand: {
          red: 'var(--color-brand-red)',
          purple: 'var(--color-brand-purple)',
          primary: 'var(--color-brand-primary)',
          accent: 'var(--color-brand-accent)',
          'accent-dark': 'var(--color-brand-accent-dark)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
          inactive: 'var(--color-text-inactive)',
        },
        tag: {
          bg: 'var(--color-tag-bg)',
          text: 'var(--color-tag-text)',
        },
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border-subtle)',
          light: 'var(--color-border-light)',
        },
        hover: 'var(--color-hover)',
        focus: 'var(--color-focus)',
      },
      borderRadius: {
        'none': 'var(--radius-none)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        'full': 'var(--radius-full)',
      },
      boxShadow: {
        'z1': 'var(--elevation-z1)',
        'z2': 'var(--elevation-z2)',
        'z3': 'var(--elevation-z3)',
        'z4': 'var(--elevation-z4)',
        'gradient': '0 16px 40px rgba(154, 27, 27, 0.35)',
      },
      transitionDuration: {
        'fast': 'var(--motion-fast)',
        'normal': 'var(--motion-normal)',
        'slow': 'var(--motion-slow)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, var(--color-brand-red) 0%, var(--color-brand-purple) 100%)',
        'gradient-brand-text': 'linear-gradient(90deg, #C41E3A 0%, #9B4DCA 100%)',
        'gradient-brand-text-light': 'linear-gradient(90deg, #9A1B1B 0%, #7C3AED 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
