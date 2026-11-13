import React, { useState } from 'react';
import { Check } from 'lucide-react';
import PageIntro from '../components/ui/PageIntro';
import { useStore } from '../context/StoreContext';
import { BOX_CAPACITIES } from '../constants/config';
import { getBoxPrice } from '../utils/pricing';
import { getProductImage } from '../utils/images';
import { getId } from '../utils/filters';

const FREQUENCIES = [
  { id: 'weekly', label: 'Weekly Delivery', note: 'Save 15% on each box' },
  { id: 'biweekly', label: 'Alternate Weeks', note: 'Save 10% on each box' }
];

const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-3xl border border-[#E2EAE4] space-y-4">
    <h3 className="font-serif text-lg font-bold text-[#152A1B]">{title}</h3>
    {children}
  </div>
);

export default function BoxBuilderPage() {
  const { products, addBoxToCart } = useStore();
  const [boxSize, setBoxSize] = useState('pro');
  const [frequency, setFrequency] = useState('weekly');
  const [selected, setSelected] = useState([]);

  const capacity = BOX_CAPACITIES[boxSize].count;
  const isFull = selected.length === capacity;

  const toggle = (product) => {
    const id = getId(product);
    setSelected((prev) => {
      if (prev.some((p) => getId(p) === id)) return prev.filter((p) => getId(p) !== id);
      return prev.length < capacity ? [...prev, product] : prev;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageIntro
        eyebrow="Hyderabad Kitchen Subscription"
        title="Weekly Fresh Greens & Sprouts Subscription"
        description="Select your varieties to be cut and packed fresh on delivery morning. Pause or cancel anytime via WhatsApp."
      />

      <Card title="1. Select Box Tier">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(BOX_CAPACITIES).map(([key, val]) => (
            <button
              key={key}
              onClick={() => {
                setBoxSize(key);
                setSelected([]);
              }}
              className={`p-4 rounded-2xl text-left border-2 transition ${
                boxSize === key ? 'border-[#153B2B] bg-[#EAF5EC]' : 'border-[#E6ECE7] hover:border-[#C2D1C6]'
              }`}
            >
              <p className="font-serif font-bold text-[#152A1B]">{val.name}</p>
              <p className="text-xs text-[#6C7D6E] mt-1">{val.count} Fresh Living Punnets / Trays</p>
              <p className="text-lg font-bold text-[#2C6E49] mt-2">₹{val.price}</p>
            </button>
          ))}
        </div>
      </Card>

      <Card title="2. Harvest Cadence">
        <div className="grid grid-cols-2 gap-4">
          {FREQUENCIES.map((f) => (
            <button
              key={f.id}
              onClick={() => setFrequency(f.id)}
              className={`p-4 rounded-2xl text-center border-2 transition ${
                frequency === f.id ? 'border-[#153B2B] bg-[#EAF5EC]' : 'border-[#E6ECE7]'
              }`}
            >
              <p className="font-bold text-[#152A1B]">{f.label}</p>
              <p className="text-xs text-[#2C6E49] font-semibold mt-1">{f.note}</p>
            </button>
          ))}
        </div>
      </Card>

      <div className="bg-white p-6 rounded-3xl border border-[#E2EAE4] space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-serif text-lg font-bold text-[#152A1B]">
            3. Select {capacity} Varieties ({selected.length}/{capacity} chosen)
          </h3>
          {isFull && (
            <span className="text-xs text-[#2C6E49] font-bold flex items-center">
              <Check size={14} className="mr-1" /> Box Full
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {products.map((item) => {
            const isSelected = selected.some((c) => getId(c) === getId(item));
            return (
              <div
                key={getId(item)}
                onClick={() => toggle(item)}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  isSelected ? 'border-[#153B2B] bg-[#EAF5EC]' : 'border-[#E6ECE7] hover:bg-[#F5F8F6]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img src={getProductImage(item)} alt={item.name} className="w-12 h-12 object-cover rounded-xl border border-[#E6ECE7]" />
                  <div>
                    <p className="text-sm font-semibold text-[#152A1B]">{item.name.split('/')[0]}</p>
                    <p className="text-xs text-[#7A8C7E]">{item.regional}</p>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 ${
                    isSelected ? 'bg-[#153B2B] border-[#153B2B] text-white' : 'border-[#C2D1C6]'
                  }`}
                >
                  {isSelected && <Check size={14} />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-6 border-t border-[#E6ECE7] flex items-center justify-between">
          <div>
            <p className="text-xs text-[#7A8C7E]">Subscription Total per Cycle</p>
            <p className="text-2xl font-serif font-bold text-[#152A1B]">₹{getBoxPrice(boxSize, frequency)}</p>
          </div>
          <button
            disabled={!isFull}
            onClick={() => {
              addBoxToCart({ boxSize, frequency, items: selected });
              setSelected([]);
            }}
            className={`px-8 py-3 rounded-full text-sm font-bold transition shadow ${
              isFull ? 'bg-[#153B2B] text-white hover:bg-[#234F3C]' : 'bg-[#D6DFD8] text-[#8A9B8E] cursor-not-allowed'
            }`}
          >
            Add Subscription To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
