import React from 'react';
import { Sparkles, ArrowRight, Plus } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { getProductImage } from '../../utils/images';
import { unsplash } from '../../utils/unsplash';
import { PHOTO } from '../../data/products';

export default function HeroBanner({ onShopNow }) {
  const { products, selectedLocality, setSelectedProduct, addToCart } = useStore();
  const spotlight = products.find((p) => (p.sku || p.id) === 'bowl-gongura-power') || products[0];

  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#2B6E52] via-[#4A9173] to-[#87C1A7] text-white px-6 sm:px-12 pt-7 pb-9 sm:py-10 shadow-lg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.16),transparent_65%)]" />

      <div className="relative z-10 text-center mb-3 sm:mb-1">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-[#D8F8DC] mb-2 border border-white/20">
          <Sparkles size={11} />
          <span>Same-Day Morning Harvest • {selectedLocality}</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#B8F5B1] drop-shadow-sm">
          Verdant <span className="text-white">Greens</span>
        </h1>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-6 pt-2">
        <div className="md:col-span-4 space-y-4 text-center md:text-left">
          <p className="text-xs sm:text-sm text-[#ECF8F0] leading-relaxed max-w-xs mx-auto md:mx-0">
            Shop from freshly harvested microgreens, germinated sprout bowls, and living wheatgrass trays at farm-direct prices.
          </p>
          <button
            type="button"
            onClick={onShopNow}
            className="inline-flex items-center space-x-2.5 pl-5 pr-2 py-2 rounded-full bg-[#133325] hover:bg-[#0B2117] text-white text-xs font-bold shadow-lg transition"
          >
            <span>Shop Now</span>
            <span className="w-6 h-6 rounded-full bg-white text-[#133325] flex items-center justify-center">
              <ArrowRight size={13} />
            </span>
          </button>
        </div>

        <div className="md:col-span-4 flex justify-center">
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full p-2 bg-white/15 backdrop-blur-xs border border-white/25 shadow-2xl">
            <img src={unsplash(PHOTO.A, 700)} alt="Fresh Sprouts Harvest" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>

        {spotlight && (
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div
              onClick={() => setSelectedProduct(spotlight)}
              className="cursor-pointer w-52 rounded-2xl bg-white/95 backdrop-blur-md text-[#152A1B] p-3 shadow-xl border border-white hover:scale-[1.02] transition"
            >
              <div className="h-24 w-full rounded-xl overflow-hidden bg-[#F5F8F6] mb-2">
                <img src={getProductImage(spotlight)} alt={spotlight.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-xs font-bold text-[#152A1B] truncate">{spotlight.name}</p>
              <div className="flex items-center justify-between mt-1">
                <div>
                  <span className="text-sm font-extrabold text-[#153B2B]">₹{spotlight.price}</span>
                  <span className="text-[10px] text-[#8A9B8E] line-through ml-1.5">₹{spotlight.price + 40}</span>
                </div>
                <button
                  type="button"
                  aria-label="Add to basket"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(spotlight, 1);
                  }}
                  className="w-6 h-6 rounded-full bg-[#153B2B] text-[#98E59E] flex items-center justify-center"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
