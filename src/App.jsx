import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, ArrowUp } from 'lucide-react';
import { StoreProvider, useStore } from './context/StoreContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProductModal from './components/modals/ProductModal';
import LoginModal from './components/modals/LoginModal';
import CartDrawer from './components/modals/CartDrawer';
import CheckoutSuccessModal from './components/modals/CheckoutSuccessModal';
import ShopPage from './pages/ShopPage';
import BoxBuilderPage from './pages/BoxBuilderPage';
import HealthPage from './pages/HealthPage';
import FarmPage from './pages/FarmPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import AboutUs from './components/home/AboutUs';

const PAGES = {
  home: ShopPage,
  shop: ShopPage,
  'box-builder': BoxBuilderPage,
  health: HealthPage,
  farm: FarmPage,
  orders: OrdersPage,
  profile: ProfilePage,
  about: AboutUs
};

// Microgreen seedling drawn in a 24x24 box: thin stem, two round seed leaves and a tiny top leaf
function sprout(color, stem = '#7CC98A') {
  return (
    <>
      <path d="M12 22V11" stroke={stem} strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M12 11C6 12.5 1.5 9.5 1.5 5C7 4 11 6 12 11Z" fill={color} />
      <path d="M12 11C18 12.5 22.5 9.5 22.5 5C17 4 13 6 12 11Z" fill={color} />
      <path d="M12 11C9.3 8.2 9.3 4.6 12 1.8C14.7 4.6 14.7 8.2 12 11Z" fill={color} opacity="0.8" />
    </>
  );
}

// Line-art version of the seedling for a lighter, modern look
function sproutLine(color) {
  return (
    <g fill="none" stroke={color} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V11" />
      <path d="M12 11C6 12.5 1.5 9.5 1.5 5C7 4 11 6 12 11Z" />
      <path d="M12 11C18 12.5 22.5 9.5 22.5 5C17 4 13 6 12 11Z" />
      <path d="M12 11C9.3 8.2 9.3 4.6 12 1.8C14.7 4.6 14.7 8.2 12 11Z" />
    </g>
  );
}

// Seedlings scattered across the whole page, adjusted for screen responsiveness
const SCATTER = [
  { l: 2, t: 15, s: 75, r: -12, o: 0.25, v: 'fill', c: 'url(#vg-grad-a)' },
  { l: 8, t: 45, s: 110, r: 14, o: 0.28, v: 'line', c: '#2C6E49' },
  { l: 5, t: 78, s: 65, r: -20, o: 0.25, v: 'fill', c: 'url(#vg-grad-b)' },
  { l: 18, t: 10, s: 55, r: 18, o: 0.25, v: 'line', c: '#4CAF63' },
  { l: 20, t: 65, s: 95, r: -8, o: 0.22, v: 'fill', c: 'url(#vg-grad-a)' },
  { l: 35, t: 25, s: 130, r: 10, o: 0.2, v: 'line', c: '#2C6E49' },
  { l: 40, t: 58, s: 70, r: -16, o: 0.25, v: 'fill', c: 'url(#vg-grad-b)' },
  { l: 45, t: 85, s: 100, r: 6, o: 0.2, v: 'fill', c: 'url(#vg-grad-a)' },
  { l: 55, t: 12, s: 85, r: -10, o: 0.22, v: 'fill', c: 'url(#vg-grad-b)' },
  { l: 60, t: 42, s: 120, r: 16, o: 0.18, v: 'line', c: '#4CAF63' },
  { l: 70, t: 68, s: 80, r: -14, o: 0.25, v: 'line', c: '#2C6E49' },
  { l: 75, t: 22, s: 95, r: 8, o: 0.22, v: 'fill', c: 'url(#vg-grad-a)' },
  { l: 88, t: 48, s: 100, r: -18, o: 0.25, v: 'fill', c: 'url(#vg-grad-b)' },
  { l: 92, t: 80, s: 70, r: 12, o: 0.25, v: 'line', c: '#2C6E49' }
];

// Falling microgreen seedlings
const FALLING_LEAVES = [
  { left: 4, size: 28, dur: 22, delay: 0, dx: 40, op: 0.55, color: '#2C6E49' },
  { left: 12, size: 20, dur: 28, delay: -9, dx: 30, op: 0.45, color: '#4CAF63' },
  { left: 21, size: 34, dur: 26, delay: -15, dx: 50, op: 0.5, color: '#1E5636' },
  { left: 33, size: 22, dur: 30, delay: -4, dx: 36, op: 0.45, color: '#6CC57A' },
  { left: 45, size: 30, dur: 24, delay: -12, dx: 44, op: 0.5, color: '#2C6E49' },
  { left: 57, size: 18, dur: 32, delay: -20, dx: 28, op: 0.45, color: '#4CAF63' },
  { left: 66, size: 32, dur: 27, delay: -7, dx: 48, op: 0.5, color: '#1E5636' },
  { left: 76, size: 24, dur: 29, delay: -17, dx: 34, op: 0.45, color: '#6CC57A' },
  { left: 86, size: 36, dur: 25, delay: -2, dx: 52, op: 0.5, color: '#2C6E49' },
  { left: 94, size: 20, dur: 31, delay: -11, dx: 30, op: 0.45, color: '#4CAF63' }
];

// Microgreen seedling beds for the corners
const FOLIAGE = [
  { x: 292, y: 40, r: 200, s: 4.6, c: '#2C6E49' },
  { x: 250, y: 24, r: 170, s: 3.6, c: '#4CAF63' },
  { x: 205, y: 14, r: 215, s: 3, c: '#6CC57A' },
  { x: 300, y: 100, r: 150, s: 4, c: '#4CAF63' },
  { x: 262, y: 84, r: 195, s: 3.2, c: '#1E5636' },
  { x: 222, y: 70, r: 165, s: 3.6, c: '#6CC57A' },
  { x: 305, y: 160, r: 120, s: 3.4, c: '#2C6E49' },
  { x: 272, y: 140, r: 185, s: 2.8, c: '#4CAF63' },
  { x: 180, y: 40, r: 230, s: 2.6, c: '#2C6E49' },
  { x: 308, y: 212, r: 105, s: 2.8, c: '#6CC57A' }
];

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#153B2B] text-[#98E59E] shadow-xl border border-white/20 transition-all duration-300 hover:scale-110 hover:bg-[#0E291D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49]"
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}

function AppShell() {
  const { activeTab, apiError } = useStore();
  const Page = PAGES[activeTab] || ShopPage;

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return undefined;
    }
    if (activeTab === 'shop') {
      const timer = setTimeout(() => {
        const el = document.getElementById('products');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return undefined;
  }, [activeTab]);

  return (
    <div className="relative min-h-screen text-[#152A1B] font-sans antialiased">
      {/* Page background: mint gradient, glows, dot grid, microgreen seedlings and falling sprouts */}
      <div
        aria-hidden="true"
        className="vg-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#F4FAF5] via-[#EEF6F0] to-[#F8FBF8]"
      >
        <div className="absolute rounded-full bg-[#98E59E]/30 blur-3xl" style={{ left: '-14vmin', top: '-14vmin', width: 'clamp(260px, 60vmin, 620px)', height: 'clamp(260px, 60vmin, 620px)' }} />
        <div className="absolute rounded-full bg-[#2C6E49]/15 blur-3xl" style={{ right: '-12vmin', top: '25%', width: 'clamp(220px, 52vmin, 540px)', height: 'clamp(220px, 52vmin, 540px)' }} />
        <div className="absolute rounded-full bg-[#CDEFD2]/50 blur-3xl" style={{ bottom: '-14vmin', left: '25%', width: 'clamp(240px, 56vmin, 580px)', height: 'clamp(240px, 56vmin, 580px)' }} />
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(21,59,43,0.10)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

        {/* Microgreen seedling beds: top-right and bottom-left corners */}
        {[
          { pos: { right: '-5vmin', top: '-4vmin' }, size: 'clamp(170px, 46vmin, 440px)', flip: false },
          { pos: { left: '-5vmin', bottom: '-4vmin' }, size: 'clamp(160px, 42vmin, 400px)', flip: true }
        ].map((c, i) => (
          <svg
            key={i}
            viewBox="0 0 320 320"
            className="vg-sway absolute opacity-40"
            style={{ ...c.pos, width: c.size, height: c.size, rotate: c.flip ? '180deg' : undefined }}
          >
            {FOLIAGE.map((l, j) => (
              <g key={j} transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s}) translate(-12 -12)`}>
                {sprout(l.c)}
              </g>
            ))}
          </svg>
        ))}

        {/* Shared gradients for the filled seedlings */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="vg-grad-a" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6CC57A" />
              <stop offset="100%" stopColor="#1E5636" />
            </linearGradient>
            <linearGradient id="vg-grad-b" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#98E59E" />
              <stop offset="100%" stopColor="#2C6E49" />
            </linearGradient>
          </defs>
        </svg>

        {/* Seedlings scattered across the page */}
        {SCATTER.map((m, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className={`vg-scatter vg-sway absolute ${i % 2 ? 'hidden sm:block' : ''} ${i % 3 === 0 ? 'vg-thin' : ''}`}
            style={{
              '--s': m.s,
              left: `${m.l}%`,
              top: `${m.t}%`,
              opacity: m.o,
              rotate: `${m.r}deg`,
              animationDelay: `${-(i * 1.3)}s`,
              animationDuration: `${8 + (i % 4) * 2}s`
            }}
          >
            {m.v === 'line' ? sproutLine(m.c) : sprout(m.c, '#7CC98A')}
          </svg>
        ))}

        {/* Falling microgreens */}
        {FALLING_LEAVES.map((leaf, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className={`vg-fall vg-leaf absolute top-0 ${i % 2 ? 'hidden sm:block' : ''}`}
            style={{
              '--s': leaf.size,
              left: `${leaf.left}%`,
              opacity: leaf.op,
              '--dx': `${leaf.dx}px`,
              animationDuration: `${leaf.dur}s`,
              animationDelay: `${leaf.delay}s`
            }}
          >
            {sprout(leaf.color)}
          </svg>
        ))}

        <style>{`
          #products { scroll-margin-top: 110px; }
          /* Sizes follow the smaller screen side (reference 1440x900), so every screen looks like the same picture */
          .vg-scatter { width: clamp(calc(var(--s) * 0.4px), calc(var(--s) * 0.111vmin), calc(var(--s) * 1.15px)); height: clamp(calc(var(--s) * 0.4px), calc(var(--s) * 0.111vmin), calc(var(--s) * 1.15px)); }
          .vg-fall { width: clamp(calc(var(--s) * 0.6px), calc(var(--s) * 0.111vmin), calc(var(--s) * 1.15px)); height: clamp(calc(var(--s) * 0.6px), calc(var(--s) * 0.111vmin), calc(var(--s) * 1.15px)); }
          /* Fewer seedlings on short screens (small laptops, landscape phones) */
          @media (max-height: 700px) { .vg-thin { display: none; } }
          @keyframes vg-leaf-fall {
            0%   { transform: translate3d(0, -12vh, 0) rotate(0deg); }
            25%  { transform: translate3d(var(--dx), 28vh, 0) rotate(90deg); }
            50%  { transform: translate3d(calc(var(--dx) * -0.6), 58vh, 0) rotate(190deg); }
            75%  { transform: translate3d(var(--dx), 88vh, 0) rotate(280deg); }
            100% { transform: translate3d(0, 112vh, 0) rotate(360deg); }
          }
          @keyframes vg-sway {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0, 8px, 0); }
          }
          .vg-leaf { animation: vg-leaf-fall linear infinite; will-change: transform; }
          .vg-sway { animation: vg-sway 9s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .vg-leaf { animation: none; display: none; }
            .vg-sway { animation: none; }
          }
        `}</style>
      </div>

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-12">
        {apiError && (activeTab === 'shop' || activeTab === 'home') && (
          <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-2xl flex items-center space-x-2">
            <AlertCircle size={15} className="text-amber-600 shrink-0" />
            <span>{apiError}</span>
          </div>
        )}
        <Page />
      </main>

      <Footer />

      <ProductModal />
      <LoginModal />
      <CartDrawer />
      <CheckoutSuccessModal />
      <ScrollToTopButton />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  );
}