import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';

const STEPS = [
  {
    n: '01',
    title: 'Вдохновение',
    text: 'Мы слушаем вас и место, для которого создается букет. Настроение, повод, свет — всё становится отправной точкой.',
  },
  {
    n: '02',
    title: 'Сбор',
    text: 'Сезонные цветы отбираются вручную на локальных фермах. Каждый стебель проходит через руки флориста дважды.',
  },
  {
    n: '03',
    title: 'Результат',
    text: 'Букет собирается в тишине студии. Мы передаем его вам в крафтовой упаковке, готовым стать посланием.',
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-cream py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mb-16 text-center md:mb-24">
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.4em] text-mint-deep">
            Как мы работаем
          </p>
          <h2 className="font-serif text-4xl font-bold text-ink sm:text-5xl md:text-6xl">
            Процесс
          </h2>
        </FadeIn>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          <motion.div
            className="pointer-events-none absolute left-[16%] right-[16%] top-7 hidden h-px bg-mint/40 md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left' }}
          />

          {STEPS.map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.15}>
              <article className="group relative h-full rounded-[2rem] border border-rose-soft bg-milk/60 px-8 py-10 backdrop-blur-sm transition-colors duration-500 hover:border-rose hover:bg-milk">
                <motion.div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-rose-soft font-serif text-xl font-medium text-rose-deep"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + i * 0.15,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {s.n}
                </motion.div>
                <h3 className="mb-4 font-serif text-2xl font-medium text-ink">
                  {s.title}
                </h3>
                <p className="font-sans text-sm font-light leading-[1.8] text-ink-soft">
                  {s.text}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
