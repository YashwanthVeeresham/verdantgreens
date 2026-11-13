import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import { POPULAR_CATEGORIES } from '../../data/products';

export default function CategoryTiles({ activeCategory, onSelect }) {
  return (
    <section className="space-y-4">
      <SectionHeader title="Popular Categories" actionLabel="Show All" onAction={() => onSelect('all')} />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {POPULAR_CATEGORIES.map((cat) => {
          const selected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              className={`group rounded-2xl p-3.5 text-center transition border ${cat.bg} ${
                selected ? 'border-[#153B2B] ring-2 ring-[#153B2B]/20 shadow-sm' : 'border-transparent hover:border-[#C8D9CC]'
              }`}
            >
              <div className="w-14 h-14 mx-auto mb-2.5 rounded-full overflow-hidden border-2 border-white shadow-xs bg-white">
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <p className="text-xs font-bold text-[#152A1B]">{cat.label}</p>
              <p className="text-[10px] text-[#687A6D] mt-0.5">{cat.count}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
