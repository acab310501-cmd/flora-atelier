import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';

const BG_IMG =
  'https://images.pexels.com/photos/10995919/pexels-photo-10995919.jpeg?auto=compress&cs=tinysrgb&w=1400';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const bgX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const bgY = useTransform(sy, [-0.5, 0.5], [-18, 18]);

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

  return (
    <section
      id="about"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative overflow-hidden bg-cream py-28 md:py-40"
    >
      {/* Parallax blurred background */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
      >
        <img
          src={BG_IMG}
          alt=""
          className="h-full w-full object-cover blur-2xl scale-110"
        />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 md:grid-cols-2 md:gap-20 md:items-center">
        <FadeIn>
          <p className="font-serif text-3xl font-medium leading-[1.3] text-ink sm:text-4xl md:text-5xl">
            «Мы собираем букеты так, как пишут стихи — без лишних слов, только самые важные акценты.»
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="max-w-md">
            {/* Decorative divider: thin line with a small flower */}
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-16 bg-mint" />
              <FlowerMark className="h-4 w-4 text-rose" />
            </div>
            <p className="font-sans text-base font-light leading-[1.8] text-ink-soft">
              Flora Atelier — это пространство, где флористика становится языком. Каждый цветок — это нота в мелодии вашего дня. Мы работаем с сезонными цветами, сухоцветами и редкими сортами, собранными на локальных фермах.
            </p>
            <p className="mt-5 font-sans text-base font-light leading-[1.8] text-ink-soft">
              Мы верим, что букет — это не подарок, а послание. Тихое, точное, живое.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function FlowerMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="9" r="3" fill="currentColor" />
      <circle cx="8" cy="13" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="16" cy="13" r="3" fill="currentColor" opacity="0.6" />
      <path d="M12 12v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 17c2-1 3-2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
