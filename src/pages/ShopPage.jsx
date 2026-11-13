import React, { useMemo, useRef, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { filterByCategory, searchProducts } from '../utils/filters';
import { BEST_SELLER_PILLS } from '../data/products';
import HeroBanner from '../components/home/HeroBanner';
import CategoryTiles from '../components/home/CategoryTiles';
import FreshPicks from '../components/home/FreshPicks';
import PromoBanners from '../components/home/PromoBanners';
import ProductRow from '../components/home/ProductRow';
import CtaBanner from '../components/home/CtaBanner';
import ReviewsSection from '../components/home/ReviewsSection';

function FilterPills({ value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
      {BEST_SELLER_PILLS.map((pill) => (
        <button
          key={pill.id}
          type="button"
          onClick={() => onChange(pill.id)}
          className={`px-3.5 py-1.5 rounded-full transition ${
            value === pill.id ? 'bg-[#153B2B] text-white shadow-xs' : 'bg-[#F2F5F3] text-[#4E6153] hover:bg-[#E4ECE6]'
          }`}
        >
          {pill.label}
        </button>
      ))}
    </div>
  );
}

export default function ShopPage() {
  const { products, loading, searchQuery } = useStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [bestSellerFilter, setBestSellerFilter] = useState('all');
  const catalogRef = useRef(null);

  const searched = useMemo(() => searchProducts(products, searchQuery), [products, searchQuery]);
  const freshPicks = useMemo(() => filterByCategory(searched, activeCategory).slice(0, 8), [searched, activeCategory]);
  const bestSelling = useMemo(() => filterByCategory(searched, bestSellerFilter).slice(0, 5), [searched, bestSellerFilter]);
  const justForYou = useMemo(() => [...searched].reverse().slice(0, 5), [searched]);

  const selectCategory = (id) => {
    setActiveCategory(id);
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-12">
      <HeroBanner onShopNow={() => selectCategory('all')} />
      <CategoryTiles activeCategory={activeCategory} onSelect={selectCategory} />
      <FreshPicks ref={catalogRef} items={freshPicks} loading={loading} onShowAll={() => setActiveCategory('all')} />
      <PromoBanners onSelectCategory={selectCategory} />
      <ProductRow
        title="Weekly Best Selling Items"
        items={bestSelling}
        filters={<FilterPills value={bestSellerFilter} onChange={setBestSellerFilter} />}
      />
      <CtaBanner />
      <ProductRow
        title="Just For You"
        items={justForYou}
        actionLabel="Show All"
        onAction={() => setBestSellerFilter('all')}
      />
      <ReviewsSection />
    </div>
  );
}
