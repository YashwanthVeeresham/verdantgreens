import React from 'react';
import { useStore } from '../../context/StoreContext';
import { getProductImage } from '../../utils/images';

export default function ProductMarquee() {
  const { products, setSelectedProduct, addToCart } = useStore();
  // Duplicate array to ensure seamless infinite looping animation
  const marqueeItems = [...products, ...products];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#F2F7F4] border border-[#E2EAE4] rounded-3xl shadow-sm">
      <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#2C6E49]">Live Harvest Ticker</span>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#153B2B]">Fresh from the Greenhouse Today</h2>
        </div>
        <span className="text-xs text-[#6B7E70] font-medium hidden sm:inline">Auto-Scrolling Live Feed</span>
      </div>

      <div className="relative w-full flex overflow-x-hidden group">
        <div className="flex space-x-4 animate-marquee py-2 shrink-0 group-hover:[animation-play-state:paused]">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.sku || item.id}-${index}`}
              onClick={() => setSelectedProduct(item)}
              className="cursor-pointer w-60 bg-white rounded-2xl border border-[#E5ECE7] p-3 shadow-xs hover:shadow-md hover:border-[#2C6E49] transition shrink-0 flex items-center space-x-3"
            >
              <div className="w-16 h-16 rounded-xl bg-[#F5F8F6] overflow-hidden shrink-0">
                <img src={getProductImage(item)} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#EAF5EC] text-[#1E5636]">
                  {item.badge || 'Fresh Harvest'}
                </span>
                <p className="text-xs font-bold text-[#152A1B] truncate mt-1">{item.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-extrabold text-[#153B2B]">₹{item.price}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, 1);
                    }}
                    className="px-2 py-1 rounded-full text-[10px] font-bold bg-[#153B2B] text-[#98E59E] hover:bg-[#0E291D] transition"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}