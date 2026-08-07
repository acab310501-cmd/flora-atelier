import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { firePetals } from '@/lib/confetti';

const HERO_IMG = '/images/hero-flower.webp';

const TITLE = 'Flora Atelier';

const letterContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.7 },
  },
};
const letterItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  const bgX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const bgY = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const titleX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const titleY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const subX = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const subY = useTransform(sy, [-0.5, 0.5], [16, -16]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    firePetals(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
  };

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0 hero-gradient" />

      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={HERO_IMG}
          alt="Hero flower"
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(253,248,245,0.55)_75%,rgba(253,248,245,0.95)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(253,248,245,0.35)_0%,transparent_30%,transparent_60%,rgba(253,248,245,0.6)_100%)]" />
      </motion.div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6 font-sans text-xs uppercase tracking-[0.4em] text-ink-soft"
        >
          Концептуальная студия флористики
        </motion.p>

        <motion.h1
          variants={letterContainer}
          initial="hidden"
          animate="show"
          style={{ x: titleX, y: titleY }}
          className="font-serif text-5xl font-bold leading-[1.05] text-ink sm:text-6xl md:text-7xl lg:text-8xl"
          aria-label={TITLE}
        >
          {TITLE.split('').map((ch, i) => (
            <motion.span
              key={i}
              variants={letterItem}
              className="inline-block"
            >
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          style={{ x: subX, y: subY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-7 max-w-md font-sans text-base font-light leading-relaxed text-ink-soft sm:text-lg"
        >
          Цветочные истории, рожденные в тишине
        </motion.p>

        <motion.a
          href="#bouquets"
          onClick={handleClick}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 rounded-full bg-rose px-9 py-4 font-sans text-sm font-medium tracking-wide text-milk shadow-[0_10px_30px_-10px_rgba(232,180,184,0.6)]"
          style={{ animation: 'pulse-soft 2.6s ease-in-out infinite' }}
        >
          Смотреть букеты
        </motion.a>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        style={{ animation: 'pulse-down 2s ease-in-out infinite' }}
        aria-hidden
      >
        <ChevronDown className="h-6 w-6 text-ink-soft" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}