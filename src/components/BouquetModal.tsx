import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Bouquet } from './Bouquets';
import { firePetals } from '@/lib/confetti';

type BouquetModalProps = {
  bouquet: Bouquet | null;
  onClose: () => void;
};

export default function BouquetModal({ bouquet, onClose }: BouquetModalProps) {
  const [activeImg, setActiveImg] = useState(0);

  // Reset to the first photo whenever a different bouquet opens
  useEffect(() => {
    setActiveImg(0);
  }, [bouquet]);

  return (
    <AnimatePresence>
      {bouquet && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={bouquet.name}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] bg-cream shadow-2xl will-change-transform"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Закрыть"
              data-cursor="pointer"
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-milk/80 text-ink transition-colors hover:bg-rose hover:text-milk"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto md:min-h-[420px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={bouquet.gallery[activeImg]}
                    src={bouquet.gallery[activeImg]}
                    alt={bouquet.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent md:bg-gradient-to-r" />

                {bouquet.gallery.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                    {bouquet.gallery.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setActiveImg(i)}
                        aria-label={`Фото ${i + 1}`}
                        data-cursor="pointer"
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === activeImg ? 'w-6 bg-milk' : 'w-2 bg-milk/50 hover:bg-milk/80'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col p-8 md:p-10">
                <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-mint-deep">
                  {bouquet.price}
                </p>
                <h3 className="font-serif text-3xl font-bold text-ink md:text-4xl">
                  {bouquet.name}
                </h3>
                <p className="mt-3 font-serif text-lg italic text-rose-deep">
                  {bouquet.mood}
                </p>

                <div className="mt-7 space-y-5">
                  <div>
                    <h4 className="mb-2 font-sans text-xs uppercase tracking-[0.2em] text-ink-soft">
                      Состав
                    </h4>
                    <p className="font-sans text-sm font-light leading-[1.7] text-ink">
                      {bouquet.composition}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-sans text-xs uppercase tracking-[0.2em] text-ink-soft">
                      Уход за букетом
                    </h4>
                    <p className="font-sans text-sm font-light leading-[1.7] text-ink-soft">
                      {bouquet.care}
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={(e) => firePetals(e.clientX / window.innerWidth, e.clientY / window.innerHeight)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 self-start rounded-full bg-rose px-8 py-3.5 font-sans text-sm font-medium text-milk shadow-[0_10px_30px_-12px_rgba(232,180,184,0.7)] will-change-transform"
                >
                  Заказать букет
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
