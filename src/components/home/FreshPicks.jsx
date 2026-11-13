import React, { forwardRef } from 'react';
import SectionHeader from '../ui/SectionHeader';
import ArrowButton from '../ui/ArrowButton';
import Spinner from '../ui/Spinner';
import ProductCard from '../ui/ProductCard';
import { useStore } from '../../context/StoreContext';
import { unsplash } from '../../utils/unsplash';
import { PHOTO } from '../../data/products';
import { getId } from '../../utils/filters';

const FreshPicks = forwardRef(function FreshPicks({ items, loading, onShowAll }, ref) {
  const { selectedLocality, setActiveTab } = useStore();

  return (
    <section ref={ref} className="space-y-4">
      <SectionHeader
        title="Today’s Fresh Picks"
        subtitle="Click any card to view full nutrition details & photo gallery"
        actionLabel="Show All"
        onAction={onShowAll}
      />

      {loading ? (
        <Spinner label="Loading Hyderabad morning harvest..." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {items.length === 0 ? (
              <p className="col-span-full text-xs text-[#687A6D] py-8 text-center">No items match your search.</p>
            ) : (
              items.map((item, idx) => <ProductCard key={getId(item)} item={item} highlighted={idx === 2} />)
            )}
          </div>

          <div className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-[#D5EAF7] via-[#E5F2FA] to-[#F4FAFD] border border-[#C6DFEE] p-6 flex flex-col justify-between text-center shadow-sm">
            <div className="space-y-2.5 pt-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#152A1B] leading-snug">
                Fresh Microgreens & Bowls. Delivered Daily.
              </h3>
              <p className="text-xs text-[#4C6575] leading-relaxed max-w-xs mx-auto">
                We harvest at 5:00 AM and deliver everything straight to your {selectedLocality} doorstep before 9:00 AM.
              </p>
              <div className="pt-1.5">
                <ArrowButton onClick={() => setActiveTab('box-builder')}>Build Weekly Box</ArrowButton>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <img
                src={unsplash(PHOTO.B, 600)}
                alt="Fresh Harvest Basket"
                className="w-52 h-40 object-cover rounded-2xl shadow-md border-4 border-white"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

export default FreshPicks;
