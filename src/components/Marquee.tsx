import { motion } from 'framer-motion';

const WORDS = [
  'пионы',
  'сухоцветы',
  'эвкалипт',
  'розы',
  'лаванда',
  'пампас',
  'тюльпаны',
  'гипсофила',
  'рустик',
  'сезонные цветы',
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-rose-soft/60 bg-cream py-6">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {[...WORDS, ...WORDS].map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-serif text-2xl italic text-ink-soft md:text-3xl">
              {w}
            </span>
            <span className="text-rose">✿</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
