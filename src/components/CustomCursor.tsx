import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, type MotionValue } from 'framer-motion';

type TrailDot = {
  id: number;
  x: number;
  y: number;
};

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const trailId = useRef(0);
  const lastTrail = useRef(0);

  // Dot follows the cursor with zero lag
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring follows with a gentle spring for a trailing effect
  const ringX = useSpring(dotX, { damping: 28, stiffness: 400, mass: 0.4 });
  const ringY = useSpring(dotY, { damping: 28, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    // Skip entirely on touch devices
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);

      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, input, [role="button"], [data-cursor="pointer"]');
      setIsPointer(Boolean(interactive));

      // Pollen trail only over bouquet cards
      const overCard = Boolean(el.closest('[data-cursor="pointer"]'));
      if (overCard && !reducedMotion && e.timeStamp - lastTrail.current > 55) {
        lastTrail.current = e.timeStamp;
        const id = trailId.current++;
        setTrail((t) => [...t, { id, x: e.clientX, y: e.clientY }].slice(-8));
        setTimeout(() => {
          setTrail((t) => t.filter((d) => d.id !== id));
        }, 700);
      }
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [dotX, dotY]);

  return (
    <>
      {/* Pollen trail */}
      {trail.map((d) => (
        <motion.div
          key={d.id}
          className="pointer-events-none fixed top-0 left-0 z-[98] hidden h-1.5 w-1.5 rounded-full bg-rose/50 md:block"
          style={{ left: d.x, top: d.y }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      ))}

      {/* Ring — lags slightly behind for a premium trailing feel */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: isPointer ? 1.6 : 1,
          borderColor: isPointer
            ? 'rgba(232, 180, 184, 0.9)'
            : 'rgba(217, 154, 159, 0.5)',
        }}
        transition={{
          scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.2 },
          borderColor: { duration: 0.25 },
        }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-9 w-9 rounded-full border-[1.5px]" />
      </motion.div>

      {/* Dot — follows cursor exactly for precision */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[101] hidden md:block"
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: isPointer ? 0.5 : 1,
        }}
        transition={{
          scale: { duration: 0.2 },
          opacity: { duration: 0.15 },
        }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-rose-deep" />
      </motion.div>
    </>
  );
}
