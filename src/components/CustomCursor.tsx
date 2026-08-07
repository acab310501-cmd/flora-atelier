import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type TrailDot = {
  id: number;
  x: number;
  y: number;
};

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const trailId = useRef(0);
  const lastTrail = useRef(0);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 30, stiffness: 500, mass: 0.4 };
  const cx = useSpring(x, springConfig);
  const cy = useSpring(y, springConfig);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    document.documentElement.classList.add('has-custom-cursor');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, input, [data-cursor="pointer"]');
      const overCard = Boolean(el.closest('[data-cursor="pointer"]'));
      setIsPointer(Boolean(interactive));

      // Pollen trail only over bouquet cards
      if (overCard && e.timeStamp - lastTrail.current > 45) {
        lastTrail.current = e.timeStamp;
        const id = trailId.current++;
        setTrail((t) => [...t, { id, x: e.clientX, y: e.clientY }].slice(-10));
        setTimeout(() => {
          setTrail((t) => t.filter((d) => d.id !== id));
        }, 600);
      }
    };
    const leave = () => setHidden(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [x, y]);

  return (
    <>
      {/* Pollen trail dots */}
      {trail.map((d, i) => (
        <motion.div
          key={d.id}
          className="pointer-events-none fixed top-0 left-0 z-[99] h-2 w-2 rounded-full bg-rose/60"
          style={{ left: d.x, top: d.y }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] will-change-transform"
        style={{ x: cx, y: cy }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: isPointer ? 1.83 : 1, // 24px -> 44px
          backgroundColor: isPointer ? 'rgba(232, 180, 184, 0.95)' : 'rgba(232, 180, 184, 0)',
        }}
        transition={{ scale: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }, backgroundColor: { duration: 0.25 }, opacity: { duration: 0.2 } }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full border"
          style={{
            borderColor: isPointer ? 'rgba(232, 180, 184, 0)' : 'rgba(232, 180, 184, 0.9)',
            borderWidth: '1.5px',
          }}
        />
      </motion.div>
    </>
  );
}
