import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type PetalProps = {
  className: string;
  delay: number;
  duration: number;
};

const PETALS: PetalProps[] = [
  { className: 'top-[8%] left-[5%] text-rose', delay: 0, duration: 18 },
  { className: 'top-[15%] right-[8%] text-mint', delay: 1.5, duration: 22 },
  { className: 'bottom-[20%] left-[7%] text-rose-soft', delay: 0.8, duration: 20 },
  { className: 'bottom-[10%] right-[10%] text-mint', delay: 2.2, duration: 24 },
  { className: 'top-[45%] left-[3%] text-rose-soft', delay: 1.2, duration: 26 },
  { className: 'top-[60%] right-[4%] text-rose', delay: 0.5, duration: 19 },
];

function PetalShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        d="M20 2C12 8 6 16 6 24c0 8 6 14 14 14s14-6 14-14C34 16 28 8 20 2z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M20 2C12 8 6 16 6 24c0 8 6 14 14 14"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.7"
      />
    </svg>
  );
}

export default function FloatingPetals() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      {PETALS.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute ${p.className}`}
          initial={{ rotate: 0, y: 0 }}
          animate={
            reducedMotion
              ? undefined
              : { rotate: [0, 15, -15, 0], y: [0, -12, 0] }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: reducedMotion ? 0 : Infinity,
            ease: 'easeInOut',
          }}
        >
          <PetalShape className="h-10 w-10 opacity-30 md:h-14 md:w-14" />
        </motion.div>
      ))}
    </div>
  );
}
