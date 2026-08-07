import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import BouquetModal from './BouquetModal';
import { useBg } from './BgContext';
import { firePetals } from '@/lib/confetti';

export type Bouquet = {
  name: string;
  composition: string;
  price: string;
  mood: string;
  image: string;
  care: string;
  hoverBg: string;
  span: string;
};

const BOUQUETS: Bouquet[] = [
  {
    name: 'Утренний бриз',
    composition: 'пион, эвкалипт, розы',
    price: '4 800 ₽',
    mood: 'Свежесть и легкость первого летнего утра',
    image:
      'https://images.pexels.com/photos/37639104/pexels-photo-37639104.jpeg?auto=compress&cs=tinysrgb&w=1100',
    care: 'Подрежьте стебли под углом и поставьте в прохладную воду. Меняйте воду раз в два дня. Пионы любят светлую, но не солнечную сторону.',
    hoverBg: '#FADADD',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    name: 'Тихая гавань',
    composition: 'сухоцветы, пампас, лунария',
    price: '5 200 ₽',
    mood: 'Спокойствие осеннего вечера у окна',
    image:
      'https://images.pexels.com/photos/18511420/pexels-photo-18511420.jpeg?auto=compress&cs=tinysrgb&w=900',
    care: 'Сухоцветы не требуют воды. Достаточно беречь букет от прямого солнца и влажности. Периодически смахивайте пыль мягкой кистью.',
    hoverBg: '#F5E6D3',
    span: '',
  },
  {
    name: 'Мятный сад',
    composition: 'розы, эвкалипт, гипсофила',
    price: '4 400 ₽',
    mood: 'Прохлада тенистого сада после дождя',
    image:
      'https://images.pexels.com/photos/16618910/pexels-photo-16618910.jpeg?auto=compress&cs=tinysrgb&w=900',
    care: 'Розы предпочитают чистую воду и прохладу. Удаляйте увядающие бутоны — это продлит жизнь остальным. Эвкалипт сохраняет аромат до недели.',
    hoverBg: '#D4E9DF',
    span: '',
  },
  {
    name: 'Лавандовый сон',
    composition: 'лаванда, тюльпаны, розмарин',
    price: '3 900 ₽',
    mood: 'Дремота на залитом солнцем лавандовом поле',
    image:
      'https://images.pexels.com/photos/33448871/pexels-photo-33448871.jpeg?auto=compress&cs=tinysrgb&w=900',
    care: 'Тюльпаны растут в вазе — подрезайте их каждые два дня. Лаванда и розмарин долго держат аромат. Держите букет подальше от фруктов.',
    hoverBg: '#E8D5F5',
    span: '',
  },
  {
    name: 'Светлая мелодия',
    composition: 'пионы, розы, гипсофила',
    price: '5 600 ₽',
    mood: 'Нежный аккорд для тихого праздника',
    image:
      'https://images.pexels.com/photos/13849767/pexels-photo-13849767.jpeg?auto=compress&cs=tinysrgb&w=900',
    care: 'Пионы и розы любят прохладную воду и частую смену. Удаляйте листву ниже линии воды — это сохраняет букет свежим дольше.',
    hoverBg: '#FADADD',
    span: '',
  },
];

export default function Bouquets() {
  const [active, setActive] = useState<Bouquet | null>(null);
  const { setBg } = useBg();

  return (
    <section id="bouquets" className="bg-cream-deep py-28 md:py-44">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mb-20 text-center md:mb-28">
          <p className="mb-5 font-sans text-xs uppercase tracking-[0.4em] text-mint-deep">
            Каталог
          </p>
          <h2 className="font-serif text-5xl font-bold text-ink sm:text-6xl md:text-7xl">
            Букеты
          </h2>
          <p className="mx-auto mt-6 max-w-md font-sans text-base font-light leading-relaxed text-ink-soft">
            Пять историй, собранных вручную из сезонных цветов. Нажмите, чтобы узнать настроение и состав.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {BOUQUETS.map((b, i) => (
            <FadeIn key={b.name} delay={i * 0.08} className={b.span}>
              <article
                data-cursor="pointer"
                onMouseEnter={() => setBg(b.hoverBg)}
                onMouseLeave={() => setBg('#FDF8F5')}
                onClick={(e) =>
                  firePetals(
                    e.clientX / window.innerWidth,
                    e.clientY / window.innerHeight
                  )
                }
                className="group relative h-full overflow-hidden rounded-[2rem] bg-milk shadow-[0_8px_40px_-16px_rgba(45,45,45,0.18)] transition-shadow duration-500 hover:shadow-[0_24px_70px_-24px_rgba(232,180,184,0.5)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <motion.img
                    src={b.image}
                    alt={b.name}
                    className="h-full w-full object-cover will-change-transform"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ scale: 1.07 }}
                  />
                  {/* Mood overlay */}
                  <motion.div
                    initial={{ y: '100%' }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/55 to-transparent px-7 pb-6 pt-16"
                  >
                    <p className="font-serif text-lg italic text-milk">{b.mood}</p>
                  </motion.div>
                  {/* Price tag */}
                  <span className="absolute right-5 top-5 rounded-full bg-milk/85 px-4 py-1.5 font-sans text-xs font-medium text-rose-deep backdrop-blur-sm">
                    {b.price}
                  </span>
                </div>

                <div className="px-7 py-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl font-medium text-ink">
                        {b.name}
                      </h3>
                      <p className="mt-2 font-sans text-sm font-light text-ink-soft">
                        {b.composition}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActive(b);
                      firePetals(
                        e.clientX / window.innerWidth,
                        e.clientY / window.innerHeight
                      );
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-rose-soft px-6 py-2.5 font-sans text-xs font-medium tracking-wide text-rose-deep transition-colors duration-300 hover:bg-rose hover:text-milk hover:border-rose will-change-transform"
                  >
                    Подробнее
                  </motion.button>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>

      <BouquetModal bouquet={active} onClose={() => setActive(null)} />
    </section>
  );
}
