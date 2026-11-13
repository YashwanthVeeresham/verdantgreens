import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { unsplash } from '../../utils/unsplash';
import { PHOTO } from '../../data/products';

function PromoCard({ theme, eyebrow, title, text, cta, ctaClass, chipClass, img, alt, onClick }) {
  return (
    <div className={`rounded-3xl p-5 flex items-center justify-between gap-4 shadow-sm ${theme}`}>
      <div className="space-y-2">
        <span className={`text-[10px] font-bold uppercase tracking-wider ${eyebrow.cls}`}>{eyebrow.text}</span>
        <h3 className="font-serif text-lg font-bold leading-snug">{title}</h3>
        <p className={`text-[11px] ${text.cls}`}>{text.node}</p>
        <button
          type="button"
          onClick={onClick}
          className={`inline-flex items-center space-x-2 pl-4 pr-1.5 py-1.5 rounded-full text-white text-[11px] font-bold ${ctaClass}`}
        >
          <span>{cta}</span>
          <span className={`w-5 h-5 rounded-full bg-white flex items-center justify-center ${chipClass}`}>
            <ArrowRight size={11} />
          </span>
        </button>
      </div>
      <img src={img} alt={alt} className="w-24 h-24 rounded-2xl object-cover shrink-0 border-2 border-white/25 shadow-md" />
    </div>
  );
}

export default function PromoBanners({ onSelectCategory }) {
  const { applyCoupon, appliedCoupon, setIsCartOpen, setActiveTab, selectedLocality } = useStore();

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <PromoCard
        theme="bg-gradient-to-br from-[#2B6E52] to-[#174230] text-white"
        eyebrow={{ text: 'Welcome Offer', cls: 'text-[#98E59E]' }}
        title="New Here? Enjoy 15% OFF Your First Order"
        text={{
          cls: 'text-[#D2E8D9]',
          node: (
            <>
              Use code <strong className="font-mono">HYD15</strong> at checkout.
            </>
          )
        }}
        cta={appliedCoupon === 'HYD15' ? 'Applied ✓' : 'Shop Now'}
        ctaClass="bg-[#102B1F]"
        chipClass="text-[#102B1F]"
        img={unsplash(PHOTO.E, 300)}
        alt="First Order Offer"
        onClick={() => {
          applyCoupon('HYD15');
          setIsCartOpen(true);
        }}
      />
      <PromoCard
        theme="bg-gradient-to-br from-[#B83358] to-[#8C203F] text-white"
        eyebrow={{ text: 'Morning Fleet', cls: 'text-[#FFD6E0]' }}
        title="Free Delivery On Orders Over ₹399"
        text={{ cls: 'text-[#F9DCE4]', node: 'Zero delivery fee across Hyderabad hubs.' }}
        cta="Order Bowls"
        ctaClass="bg-[#611229]"
        chipClass="text-[#611229]"
        img={unsplash(PHOTO.I, 300)}
        alt="Red Amaranth Greens"
        onClick={() => onSelectCategory('bowls')}
      />
      <PromoCard
        theme="bg-gradient-to-br from-[#F9E784] to-[#F3D34A] text-[#152A1B]"
        eyebrow={{ text: 'Family Harvest', cls: 'text-[#5C4D08]' }}
        title="Fresh Greens For Your Family, Without Hassle"
        text={{ cls: 'text-[#453B09]', node: `Weekly harvest box for ${selectedLocality}.` }}
        cta="Customize Box"
        ctaClass="bg-[#153B2B]"
        chipClass="text-[#153B2B]"
        img={unsplash(PHOTO.D, 300)}
        alt="Family Harvest Box"
        onClick={() => setActiveTab('box-builder')}
      />
    </section>
  );
}
