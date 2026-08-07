import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';

const REVIEWS = [
  {
    name: 'Анна К.',
    role: 'Свадьба в усадьбе',
    text: 'Букет пережил всю церемонию и остался свежим до утра. Но главное — он был таким, будто собран специально для меня. Нежность в каждой детали.',
    initials: 'А',
  },
  {
    name: 'Мария и Лев',
    role: 'Годовщина',
    text: 'Заказывали букет-послание. Флорист угадала настроение без слов. Получатель плакал от радости — это лучший комплимент студии.',
    initials: 'М',
  },
  {
    name: 'Дарья В.',
    role: 'Интерьерная флористика',
    text: 'Сухоцветы для дома собирали три месяца назад — до сих пор выглядят как в день доставки. Тонкий вкус и понимание пространства.',
    initials: 'Д',
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-cream-deep py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mb-16 text-center md:mb-24">
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.4em] text-mint-deep">
            Отзывы
          </p>
          <h2 className="font-serif text-4xl font-bold text-ink sm:text-5xl md:text-6xl">
            Тёплые слова
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              className="h-full [perspective:1200px]"
              initial={{ opacity: 0, rotateX: -12, y: 40 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.figure
                whileHover={{ y: -5, boxShadow: '0 24px 60px -24px rgba(232,180,184,0.4)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col rounded-[2rem] bg-milk p-8 shadow-[0_8px_40px_-20px_rgba(45,45,45,0.15)] [transform-style:preserve-3d]"
              >
                <span className="mb-6 font-serif text-5xl leading-none text-rose" aria-hidden>
                  “
                </span>
                <blockquote className="flex-1 font-sans text-sm font-light leading-[1.8] text-ink-soft">
                  {r.text}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-rose-soft pt-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mint/30 font-serif text-lg font-medium text-mint-deep" aria-hidden>
                    {r.initials}
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-ink">{r.name}</p>
                    <p className="font-sans text-xs font-light text-ink-soft">{r.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
