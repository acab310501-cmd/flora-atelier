import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Flower2, Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'Студия', href: '#about' },
  { label: 'Букеты', href: '#bouquets' },
  { label: 'Процесс', href: '#process' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    LINKS.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-500 ${
          scrolled
            ? 'bg-cream/85 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(45,45,45,0.18)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="#hero"
            className="group flex items-center gap-2.5"
            aria-label="Flora Atelier — на главную"
          >
            <motion.span
              whileHover={{ rotate: 25, scale: 1.12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 12 }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-rose/15 text-rose-deep"
            >
              <Flower2 className="h-5 w-5" strokeWidth={1.5} />
            </motion.span>
            <span className="font-serif text-xl font-medium tracking-tight text-ink">
              Flora<span className="text-rose-deep">·</span>Atelier
            </span>
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={
                    activeSection === l.href.slice(1) ? 'page' : undefined
                  }
                  className={`group relative font-sans text-sm font-light transition-colors duration-300 hover:text-ink ${
                    activeSection === l.href.slice(1)
                      ? 'text-ink'
                      : 'text-ink-soft'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-rose transition-all duration-300 ${
                      activeSection === l.href.slice(1)
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contacts"
            className="hidden rounded-full border border-rose-soft px-5 py-2 font-sans text-xs font-medium tracking-wide text-rose-deep transition-all duration-300 hover:bg-rose hover:text-milk hover:border-rose md:inline-flex"
          >
            Заказать
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <motion.div
          style={{ scaleX: progress }}
          className="h-0.5 origin-left bg-gradient-to-r from-rose via-rose-deep to-mint"
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[72px] z-[79] mx-4 rounded-3xl bg-cream/95 p-6 shadow-xl backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-serif text-lg text-ink transition-colors hover:bg-rose-soft/40"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contacts"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-full bg-rose px-4 py-3 text-center font-sans text-sm font-medium text-milk"
                >
                  Заказать букет
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
