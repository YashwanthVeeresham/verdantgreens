import React from 'react';
import ProductCard from '../ui/ProductCard';
import SectionHeader from '../ui/SectionHeader';
import { getId } from '../../utils/filters';

/** Generic 5-up product grid used by "Best Selling" and "Just For You". */
export default function ProductRow({ title, items, actionLabel, onAction, filters }) {
  return (
    <section className="space-y-4">
      {filters ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#152A1B]">{title}</h2>
          {filters}
        </div>
      ) : (
        <SectionHeader title={title} actionLabel={actionLabel} onAction={onAction} />
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {items.map((item, idx) => (
          <ProductCard key={getId(item)} item={item} highlighted={idx === 2} />
        ))}
      </div>
    </section>
  );
}
