import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import PageIntro from '../components/ui/PageIntro';
import { useStore } from '../context/StoreContext';
import { HEALTH_GOALS } from '../data/products';
import { getProductImage } from '../utils/images';
import { getId } from '../utils/filters';

export default function HealthPage() {
  const { products, addToCart, setSelectedProduct } = useStore();
  const [goalKey, setGoalKey] = useState('detox');
  const goal = HEALTH_GOALS[goalKey];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageIntro
        eyebrow="Targeted Health Solutions"
        title="Nutrition Matchmaker"
        description="Match Hyderabad supergreens and sprout bowls to your active wellness and dietary goals."
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(HEALTH_GOALS).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setGoalKey(key)}
            className={`p-4 rounded-2xl text-center border-2 transition ${
              goalKey === key
                ? 'border-[#153B2B] bg-[#EAF5EC] font-bold text-[#152A1B]'
                : 'border-[#E6ECE7] bg-white text-[#5C6E5F]'
            }`}
          >
            <p className="text-sm">{val.title.split('&')[0]}</p>
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-[#E2EAE4] shadow-sm space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#152A1B]">{goal.title}</h3>
          <p className="text-sm text-[#5C6E5F] mt-1">{goal.description}</p>
          <div className="mt-3 p-3 bg-[#F5F8F6] border-l-4 border-[#153B2B] text-xs text-[#2A432F] rounded-r-lg">
            <strong>Clinical & Nutritional Note:</strong> {goal.highlight}
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase font-bold tracking-wider text-[#7A8C7E] mb-4">
            Recommended Bowls & Greens for this Goal
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {goal.recommended.map((sku) => {
              const prod = products.find((p) => p.sku === sku || getId(p) === sku);
              if (!prod) return null;
              return (
                <div
                  key={getId(prod)}
                  onClick={() => setSelectedProduct(prod)}
                  className="cursor-pointer p-4 rounded-2xl border border-[#E6ECE7] bg-[#FAFBF9] hover:border-[#2C6E49] transition flex justify-between items-center"
                >
                  <div className="flex items-center space-x-3">
                    <img src={getProductImage(prod)} alt={prod.name} className="w-14 h-14 object-cover rounded-xl border border-[#E6ECE7]" />
                    <div>
                      <p className="font-serif font-bold text-[#152A1B]">{prod.name}</p>
                      <p className="text-xs text-[#2C6E49] font-medium">{prod.regional}</p>
                      <p className="text-xs text-[#7A8C7E] mt-1 font-semibold">₹{prod.price}</p>
                    </div>
                  </div>
                  <button
                    aria-label={`Add ${prod.name} to basket`}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(prod, 1);
                    }}
                    className="p-2.5 rounded-full bg-[#153B2B] text-white hover:bg-[#234F3C]"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
