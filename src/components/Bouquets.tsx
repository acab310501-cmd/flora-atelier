import { memo, useState } from 'react';
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
  images: string[];
  care: string;
  hoverBg: string;
  span: string;
};

const BOUQUETS: Bouquet[] = [
  {
    name: 'Утренний бриз',
    composition: 'пион, эвкалипт, розы',
    price: '4 800 ₽',
    mood: 'Свежесть и лёгкость первого летнего утра',

    images: [
      '/images/utreni_briz.webp',
      '/images/utreni_briz2.webp',
      '/images/utreni_briz3.webp',
      '/images/utreni_briz3-1.webp',
    ],

    care:
      'Подрежьте стебли под углом и поставьте в прохладную воду. Меняйте воду раз в два дня. Пионы любят светлую, но не солнечную сторону.',

    hoverBg: '#FADADD',
    span: 'md:col-span-2 md:row-span-2',
  },

  {
    name: 'Тихая гавань',
    composition: 'сухоцветы, пампас, лунария',
    price: '5 200 ₽',
    mood: 'Спокойствие осеннего вечера у окна',

    images: [
      '/images/tihay_gavan.webp',
      '/images/tihay_gavan1.webp',
      '/images/tihay_gavan-1.webp',
    ],

    care:
      'Сухоцветы не требуют воды. Достаточно беречь букет от прямого солнца и влажности. Периодически смахивайте пыль мягкой кистью.',

    hoverBg: '#F5E6D3',
    span: '',
  },

  {
    name: 'Мятный сад',
    composition: 'розы, эвкалипт, гипсофила',
    price: '4 400 ₽',
    mood: 'Прохлада тенистого сада после дождя',

    images: [
      '/images/mytni_sad.webp',
      '/images/mytni_sad1.webp',
      '/images/mytni_sad2.webp',
    ],

    care:
      'Розы предпочитают чистую воду и прохладу. Удаляйте увядающие бутоны — это продлит жизнь остальным. Эвкалипт сохраняет аромат до недели.',

    hoverBg: '#D4F0EB',
    span: '',
  },

  {
    name: 'Лавандовый сон',
    composition: 'лаванда, тюльпаны, розмарин',
    price: '3 900 ₽',
    mood: 'Дремота на залитом солнцем лавандовом поле',

    images: [
      '/images/lavand.webp',
      '/images/lavand1.webp',
      '/images/lavand2.webp',
    ],

    care:
      'Тюльпаны растут в вазе — подрезайте их каждые два дня. Лаванда и розмарин долго держат аромат. Держите букет подальше от фруктов.',

    hoverBg: '#EDE4F0',
    span: '',
  },

  {
    name: 'Светлая мелодия',
    composition: 'пионы, розы, гипсофила',
    price: '5 600 ₽',
    mood: 'Нежный аккорд для тихого праздника',

    images: [
      '/images/lavand1.webp',
      '/images/lavand2.webp',
      '/images/lavand.webp',
    ],

    care:
      'Пионы и розы любят прохладную воду и частую смену. Удаляйте листву ниже линии воды — это сохраняет букет свежим дольше.',

    hoverBg: '#FADADD',
    span: '',
  },
];


function BouquetCard({
  bouquet,
  index,
  onHover,
  onLeave,
  onDetails,
}: {
  bouquet: Bouquet;
  index: number;
  onHover: () => void;
  onLeave: () => void;
  onDetails: (e: React.MouseEvent) => void;
}) {
  return (
    <FadeIn delay={index * 0.08} className={bouquet.span}>
      <article
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="group relative overflow-hidden rounded-3xl bg-milk shadow-sm cursor-pointer"
      >
        <motion.img
          src={bouquet.images[0]}
          alt={`Букет «${bouquet.name}» — ${bouquet.composition}`}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.9,
            delay: 0.15 + index * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ scale: 1.07 }}
        />

        <motion.div
          initial={{ y: '100%' }}
          whileHover={{ y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/55 to-transparent px-7 pb-6 pt-16 text-sm text-white"
        >
          {bouquet.mood}
        </motion.div>

        <div className="absolute right-6 top-6 rounded-full bg-white/80 px-4 py-2 text-sm backdrop-blur">
          {bouquet.price}
        </div>


        <div className="px-7 py-6">
          <h3 className="font-serif text-2xl font-medium text-ink">
            {bouquet.name}
          </h3>

          <p className="mt-2 font-sans text-sm font-light text-ink-soft">
            {bouquet.composition}
          </p>

          <motion.button
            onClick={onDetails}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-rose-soft px-6 py-2.5 font-sans text-xs font-medium tracking-wide text-rose-deep transition-colors duration-300 hover:bg-rose hover:text-milk hover:border-rose"
          >
            Подробнее
          </motion.button>
        </div>
      </article>
    </FadeIn>
  );
}


const MemoCard = memo(BouquetCard);


function Bouquets() {
  const [active, setActive] = useState<Bouquet | null>(null);
  const { setBg } = useBg();


  return (
    <section className="mx-auto max-w-7xl px-6 py-24">

      <div className="mb-16 text-center">

        <p className="font-sans text-sm uppercase tracking-[0.3em] text-rose-deep">
          Каталог
        </p>

        <h2 className="mt-4 font-serif text-5xl text-ink">
          Букеты
        </h2>

        <p className="mx-auto mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-ink-soft">
          Пять историй, собранных вручную из сезонных цветов.
          Нажмите, чтобы узнать настроение и состав.
        </p>

      </div>


      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6">

        {BOUQUETS.map((bouquet, index) => (

          <MemoCard
            key={bouquet.name}
            bouquet={bouquet}
            index={index}

            onHover={() =>
              setBg(bouquet.hoverBg)
            }

            onLeave={() =>
              setBg('#FDF8F5')
            }

            onDetails={(event) => {

              event.stopPropagation();

              setActive(bouquet);

              firePetals(
                event.clientX / window.innerWidth,
                event.clientY / window.innerHeight
              );

            }}
          />

        ))}

      </div>


      <BouquetModal
        bouquet={active}
        onClose={() => setActive(null)}
      />

    </section>
  );
}


export default memo(Bouquets);