import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

function Petal({
  progress,
  angle,
  delay,
}: {
  progress: MotionValue<number>;
  angle: number;
  delay: number;
}) {
  const rotate = useTransform(progress, [0, 0.7], [0, angle]);
  const scale = useTransform(progress, [delay, delay + 0.3], [0.25, 1]);
  const opacity = useTransform(progress, [delay, delay + 0.2], [0, 1]);

  return (
    <motion.ellipse
      cx="50"
      cy="28"
      rx="9"
      ry="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      style={{ rotate, scale, opacity, transformOrigin: '50px 50px' }}
    />
  );
}

export default function ScrollBloom() {
  const { scrollYProgress } = useScroll();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.96, 1],
    [0, 0.28, 0.28, 0.35]
  );
  const centerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 1]);

  const angles = [0, 60, 120, 180, 240, 300];
  const delays = [0, 0.05, 0.1, 0.15, 0.2, 0.25];

  return (
    <motion.div
      className="pointer-events-none fixed bottom-8 right-8 z-[60] hidden text-rose-deep md:block"
      style={{ opacity: reducedMotion ? 0.3 : opacity }}
      aria-hidden
    >
      <svg width="72" height="72" viewBox="0 0 100 100" fill="none">
        {reducedMotion
          ? angles.map((a, i) => (
              <ellipse
                key={i}
                cx="50"
                cy="28"
                rx="9"
                ry="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                transform={`rotate(${a} 50 50)`}
              />
            ))
          : angles.map((a, i) => (
              <Petal key={i} progress={scrollYProgress} angle={a} delay={delays[i]} />
            ))}
        <motion.circle
          cx="50"
          cy="50"
          r="5"
          fill="currentColor"
          style={{
            scale: reducedMotion ? 1 : centerScale,
            transformOrigin: '50px 50px',
          }}
        />
      </svg>
    </motion.div>
  );
}
