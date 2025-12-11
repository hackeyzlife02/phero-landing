'use client';

const particleConfigs = [
  { left: '8%', delay: '0s', duration: '18s' },
  { left: '18%', delay: '-4s', duration: '22s' },
  { left: '28%', delay: '-8s', duration: '20s' },
  { left: '42%', delay: '-2s', duration: '24s' },
  { left: '55%', delay: '-10s', duration: '19s' },
  { left: '68%', delay: '-6s', duration: '21s' },
  { left: '78%', delay: '-12s', duration: '23s' },
  { left: '88%', delay: '-3s', duration: '18s' },
  { left: '35%', delay: '-14s', duration: '25s' },
  { left: '62%', delay: '-7s', duration: '20s' },
  { left: '15%', delay: '-11s', duration: '22s' },
  { left: '82%', delay: '-9s', duration: '19s' },
];

export function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleConfigs.map((config, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white/40 rounded-full animate-particleDrift"
          style={{
            left: config.left,
            animationDelay: config.delay,
            animationDuration: config.duration,
          }}
        />
      ))}
    </div>
  );
}
