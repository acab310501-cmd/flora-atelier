import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AtSign, Phone, Mail, MapPin } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { firePetals } from '@/lib/confetti';

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.2 9.3-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.2-.8 3.4-.2.9.5 1.7 1.4 1.7 1.7 0 2.9-2.2 2.9-4.7 0-1.9-1.3-3.4-3.7-3.4-2.7 0-4.4 2-4.4 4.3 0 .8.2 1.4.6 1.9.2.2.2.3.1.5l-.2.9c-.1.3-.3.4-.5.2-1.3-.6-2-2.1-2-3.8 0-2.8 2.4-6.2 7.1-6.2 3.8 0 6.3 2.7 6.3 5.7 0 3.9-2.2 6.8-5.4 6.8-1.1 0-2.1-.6-2.4-1.2l-.7 2.6c-.3 1.1-1 2.4-1.4 3.2.9.3 1.9.4 2.9.4 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.94 4.6 18.6 20.3c-.25 1.1-.92 1.37-1.86.85l-5.14-3.79-2.48 2.39c-.27.27-.5.5-1.03.5l.37-5.23 9.52-8.6c.41-.37-.09-.58-.64-.21L5.45 13.12l-5.06-1.58c-1.1-.34-1.12-1.1.23-1.62L20.5 3.04c.92-.34 1.72.21 1.44 1.56z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail('');
    firePetals(0.5, 0.85);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <footer id="contacts" className="bg-ink text-milk">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn>
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-20">
            {/* Left: contacts + socials */}
            <div>
              <h2 className="font-serif text-4xl font-bold sm:text-5xl">Flora Atelier</h2>
              <p className="mt-5 max-w-sm font-sans text-sm font-light leading-[1.8] text-milk/70">
                Студия флористики в тихом углу города. Запись на консультацию — по предварительной договорённости.
              </p>

              <ul className="mt-10 space-y-4 font-sans text-sm font-light text-milk/80">
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-rose" strokeWidth={1.5} />
                  ул. Тихая, 12, флигель 3, Санкт-Петербург
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-rose" strokeWidth={1.5} />
                  +7 (812) 555-04-26
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-rose" strokeWidth={1.5} />
                  hello@flora-atelier.studio
                </li>
              </ul>

              <div className="mt-8 flex items-center gap-4">
                <motion.a
                  href="#"
                  aria-label="Instagram"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-milk/20 transition-colors duration-300 hover:border-rose hover:bg-rose hover:text-ink will-change-transform"
                >
                  <AtSign className="h-5 w-5" strokeWidth={1.5} />
                </motion.a>
                <motion.a
                  href="#"
                  aria-label="Pinterest"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-milk/20 transition-colors duration-300 hover:border-rose hover:bg-rose hover:text-ink will-change-transform"
                >
                  <PinterestIcon className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  aria-label="Telegram"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-milk/20 transition-colors duration-300 hover:border-rose hover:bg-rose hover:text-ink will-change-transform"
                >
                  <TelegramIcon className="h-5 w-5" />
                </motion.a>
              </div>
            </div>

            {/* Right: subscribe form — grows on focus */}
            <div className="md:pt-4">
              <h3 className="font-serif text-2xl font-medium">Рассылка тишины</h3>
              <p className="mt-3 max-w-sm font-sans text-sm font-light leading-[1.8] text-milk/70">
                Раз в месяц — письмо о сезонных букетах, флористических историях и тихих событиях студии.
              </p>
              <form onSubmit={submit} className="mt-8 max-w-md">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <motion.input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Ваш email"
                    animate={{ width: focused ? '100%' : 'auto' }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 rounded-full border border-milk/20 bg-transparent px-5 py-3 font-sans text-sm font-light text-milk placeholder:text-milk/40 focus:border-rose focus:outline-none transition-colors"
                  />
                  <AnimatePresence>
                    {focused && (
                      <motion.button
                        type="submit"
                        initial={{ opacity: 0, scale: 0.8, width: 0 }}
                        animate={{ opacity: 1, scale: 1, width: 'auto' }}
                        exit={{ opacity: 0, scale: 0.8, width: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.88 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                        className="shrink-0 rounded-full bg-rose px-7 py-3 font-sans text-sm font-medium text-ink transition-colors hover:bg-rose-deep hover:text-milk will-change-transform"
                      >
                        Подписаться
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 font-sans text-sm font-light text-mint"
                  >
                    Спасибо. Первое письмо придет с началом нового сезона.
                  </motion.p>
                )}
              </form>
            </div>
          </div>
        </FadeIn>

        <div className="mt-20 border-t border-milk/10 pt-8 text-center">
          <p className="font-sans text-xs font-light tracking-wide text-milk/50">
            Flora Atelier © 2026 — Сделано с любовью к природе
          </p>
        </div>
      </div>
    </footer>
  );
}
