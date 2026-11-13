import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { unsplash } from '../../utils/unsplash';
import { PHOTO } from '../../data/products';

export default function CtaBanner() {
  const { setIsCartOpen, setActiveTab } = useStore();
  return (
    <section className="rounded-3xl bg-gradient-to-r from-[#D5EAF7] via-[#E4F2FA] to-[#CBE4F5] border border-[#BCD9EC] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
      <div className="space-y-2.5 max-w-lg text-center md:text-left">
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#152A1B] leading-tight">
          Ready To Fill Your Basket With Freshness?
        </h2>
        <p className="text-xs sm:text-sm text-[#435D6E] leading-relaxed">
          Order farm-fresh microgreens, germinated sprout bowls, and living wheatgrass trays harvested at 5:00 AM and
          delivered straight to your door.
        </p>
        <div className="pt-1 flex flex-wrap justify-center md:justify-start gap-3">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="px-5 py-2 rounded-full bg-[#153B2B] hover:bg-[#0D261B] text-white text-xs font-bold inline-flex items-center space-x-2 transition shadow"
          >
            <ShoppingBag size={14} />
            <span>Open Harvest Basket</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('health')}
            className="px-5 py-2 rounded-full bg-white hover:bg-[#F4F8FA] text-[#152A1B] text-xs font-bold border border-[#C6DFEE] transition"
          >
            Try Nutrition Matchmaker
          </button>
        </div>
      </div>

      <div className="w-60 sm:w-72 shrink-0">
        <img
          src={unsplash(PHOTO.A, 700)}
          alt="Fresh Harvest Basket"
          className="w-full h-40 object-cover rounded-2xl border-4 border-white shadow-md"
        />
      </div>
    </section>
  );
}
