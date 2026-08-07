import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { firePetals } from '@/lib/confetti';

export default function CTA() {
  return (
    <section
      id="order"
      className="relative overflow-hidden bg-ink py-32 md:py-48"
    >
      {/* Soft radial glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/20 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <p className="mb-6 font-sans text-xs uppercase tracking-[0.4em] text-rose">
            Тихий финал
          </p>
          <h2 className="font-serif text-4xl font-medium leading-[1.2] text-milk sm:text-5xl md:text-6xl">
            «Цветы говорят там, где слова слишком громки.»
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-8 max-w-md font-sans text-base font-light leading-relaxed text-milk/70">
            Расскажите нам о поводе и настроении — а букет мы соберём сами. Доставка по городу в день заказа.
          </p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <motion.a
            href="#contacts"
            onClick={(e) =>
              firePetals(
                e.clientX / window.innerWidth,
                e.clientY / window.innerHeight
              )
            }
            whileHover={{ scale: 1.05, boxShadow: '0 18px 50px -12px rgba(232,180,184,0.7)' }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 inline-flex rounded-full bg-rose px-10 py-4 font-sans text-sm font-medium tracking-wide text-ink shadow-[0_10px_30px_-10px_rgba(232,180,184,0.6)] will-change-transform"
          >
            Оставить заявку
          </motion.a>
        </FadeIn>
      </div>
    </section>
  );
}
