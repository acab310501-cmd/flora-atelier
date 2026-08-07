import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Marquee from './components/Marquee';
import Bouquets from './components/Bouquets';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FloatingPetals from './components/FloatingPetals';
import { BgProvider, useBg } from './components/BgContext';

function AppShell() {
  const { bg } = useBg();
  return (
    <div
      className="relative min-h-screen will-change-transform"
      style={{
        backgroundColor: bg,
        transition: 'background-color 0.5s ease',
      }}
    >
      <CustomCursor />
      <FloatingPetals />
      <Navbar />
      <Hero />
      <About />
      <Marquee />
      <Bouquets />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BgProvider>
      <AppShell />
    </BgProvider>
  );
}
