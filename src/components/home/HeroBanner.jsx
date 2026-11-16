import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Plus, Sprout, Truck, Leaf, Droplets } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { getProductImage } from '../../utils/images';
import { unsplash } from '../../utils/unsplash';
import { PHOTO } from '../../data/products';

const HERO_IMAGES = [PHOTO.A, PHOTO.B, PHOTO.C, PHOTO.D, PHOTO.E];

const HIGHLIGHTS = [
  { icon: Sprout, title: '5:00 AM Harvest', text: 'Cut fresh, never stored' },
  { icon: Truck, title: '6:30–9:00 AM Delivery', text: 'Across Hyderabad' },
  { icon: Droplets, title: 'Hydro-organic', text: 'Clean, pesticide-free' }
];

export default function HeroBanner({ onShopNow }) {
  const { products, selectedLocality, setSelectedProduct, addToCart, setActiveTab } = useStore();
  const spotlight = products.find((p) => (p.sku || p.id) === 'bowl-gongura-power') || products[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [paused]);

  const oldPrice = spotlight ? spotlight.price + 40 : 0;
  const offPct = spotlight ? Math.round((40 / oldPrice) * 100) : 0;

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#133A29] via-[#1F5A3E] to-[#4A9173] px-6 pb-8 pt-8 text-white shadow-[0_30px_70px_-30px_rgba(15,45,32,0.8)] sm:px-12 sm:pt-10">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#98E59E]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#CDEFD2]/20 blur-3xl" />

      {/* Heading */}
      <div className="relative z-10 mb-4 text-center">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#D8F8DC] backdrop-blur-md">
          <Sparkles size={11} aria-hidden="true" />
          <span>Same-Day Morning Harvest • {selectedLocality}</span>
        </div>
        <h1 className="font-serif text-5xl font-bold tracking-tight text-[#B8F5B1] drop-shadow-sm sm:text-6xl lg:text-7xl">
          Verdant <span className="text-white">Greens</span>
        </h1>
      </div>

      <div className="relative z-10 grid grid-cols-1 items-center gap-8 pt-2 md:grid-cols-12 md:gap-6">
        {/* Copy + CTAs */}
        <div className="space-y-5 text-center md:col-span-4 md:text-left">
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-[#ECF8F0] md:mx-0">
            Shop from freshly harvested microgreens, germinated sprout bowls, and living wheatgrass trays at
            farm-direct prices across Hyderabad.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <button
              type="button"
              onClick={onShopNow}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#98E59E] py-2 pl-6 pr-2 text-xs font-bold text-[#0F2D20] shadow-[0_12px_28px_-10px_rgba(152,229,158,0.7)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F5A3E]"
            >
              <span>Shop Now</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F2D20] text-[#98E59E] transition group-hover:translate-x-0.5">
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('about')}
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Learn More</span>
            </button>
          </div>
        </div>

        {/* Carousel circle */}
        <div className="flex justify-center md:col-span-4">
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div aria-hidden="true" className="absolute -inset-6 rounded-full bg-[#98E59E]/20 blur-2xl" />
            <div
              aria-hidden="true"
              className="vg-hero-spin absolute -inset-3 rounded-full border border-dashed border-white/40"
            />

            <div className="relative h-52 w-52 overflow-hidden rounded-full border border-white/30 bg-white/15 p-2 shadow-2xl backdrop-blur sm:h-64 sm:w-64">
              {HERO_IMAGES.map((photoId, idx) => (
                <img
                  key={photoId}
                  src={unsplash(photoId, 700)}
                  alt="Fresh Sprouts Harvest"
                  className={`absolute inset-0 h-full w-full rounded-full object-cover transition-all duration-1000 ${
                    idx === currentIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-1.5">
                {HERO_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${idx === currentIndex ? 'w-5 bg-white' : 'w-2 bg-white/50'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating chips */}
            <span className="vg-hero-float absolute -left-6 top-6 hidden items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[#153B2B] shadow-lg sm:inline-flex">
              <Leaf size={12} className="text-[#2C6E49]" aria-hidden="true" />
              Harvested 5 AM
            </span>
            <span
              className="vg-hero-float absolute -right-6 bottom-10 hidden items-center gap-1.5 rounded-full bg-[#153B2B] px-3 py-1.5 text-[10px] font-bold text-[#98E59E] shadow-lg sm:inline-flex"
              style={{ animationDelay: '-2s' }}
            >
              <Droplets size={12} aria-hidden="true" />
              Pesticide-free
            </span>
          </div>
        </div>

        {/* Spotlight product */}
        {spotlight && (
          <div className="flex justify-center md:col-span-4 md:justify-end">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedProduct(spotlight)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProduct(spotlight);
                }
              }}
              aria-label={`View ${spotlight.name}`}
              className="group relative w-56 cursor-pointer rounded-3xl border border-white bg-white/95 p-3 text-[#152A1B] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.5)] backdrop-blur-md transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span className="absolute -top-2.5 left-4 z-10 rounded-full bg-[#153B2B] px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-[#98E59E] shadow-md">
                Chef&apos;s pick
              </span>
              <div className="relative mb-3 h-28 w-full overflow-hidden rounded-2xl bg-[#F5F8F6]">
                <img
                  src={getProductImage(spotlight)}
                  alt={spotlight.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <span className="absolute right-2 top-2 rounded-full bg-[#98E59E] px-2 py-0.5 text-[10px] font-extrabold text-[#0F2D20]">
                  {offPct}% OFF
                </span>
              </div>
              <p className="truncate text-xs font-bold text-[#152A1B]">{spotlight.name}</p>
              <div className="mt-1.5 flex items-center justify-between">
                <div>
                  <span className="text-base font-extrabold text-[#153B2B]">₹{spotlight.price}</span>
                  <span className="ml-1.5 text-[10px] text-[#8A9B8E] line-through">₹{oldPrice}</span>
                </div>
                <button
                  type="button"
                  aria-label="Add to basket"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(spotlight, 1);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#153B2B] text-[#98E59E] shadow-md transition hover:scale-110 hover:bg-[#0E291D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49]"
                >
                  <Plus size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Highlights */}
      <div className="relative z-10 mt-8 grid grid-cols-1 gap-3 border-t border-white/15 pt-6 sm:grid-cols-3">
        {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center justify-center gap-3 sm:justify-start">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#98E59E] ring-1 ring-white/20">
              <Icon size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold leading-tight">{title}</p>
              <p className="text-[11px] text-white/65">{text}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes vg-hero-spin { to { transform: rotate(360deg); } }
        @keyframes vg-hero-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .vg-hero-spin { animation: vg-hero-spin 40s linear infinite; }
        .vg-hero-float { animation: vg-hero-float 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .vg-hero-spin, .vg-hero-float { animation: none; } }
      `}</style>
    </section>
  );
}