import React from 'react';
import { Plus } from 'lucide-react';
import { getProductImage } from '../../utils/images';
import { useStore } from '../../context/StoreContext';

export default function ProductCard({ item, highlighted = false }) {
  const { addToCart, setSelectedProduct } = useStore();
  const isBowl = item.category === 'bowls';

  return (
    <div
      onClick={() => setSelectedProduct(item)}
      className={`group cursor-pointer rounded-2xl border p-2.5 transition-all duration-200 flex flex-col justify-between ${
        highlighted
          ? 'bg-white border-[#1B4332] ring-2 ring-[#1B4332]/15 shadow-sm'
          : 'bg-white border-[#E5ECE7] hover:border-[#2C6E49]/60 hover:shadow-md'
      }`}
    >
      <div>
        <div className="relative h-28 w-full rounded-xl bg-[#F5F8F6] overflow-hidden mb-2">
          <img
            src={getProductImage(item)}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
          <span
            className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold backdrop-blur-xs shadow-2xs ${
              isBowl ? 'bg-[#FFF3E6]/95 text-[#B84A14]' : 'bg-[#EAF5EC]/95 text-[#1E5636]'
            }`}
          >
            {item.badge || '5 AM Harvest'}
          </span>
          <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-md text-[9px] font-mono font-semibold bg-black/65 text-white backdrop-blur-xs">
            {isBowl ? 'Fresh Bowl' : `${item.harvestDays || 7}d`}
          </span>
        </div>

        <div className="space-y-0.5 px-0.5">
          <h3
            className="font-sans text-xs font-bold text-[#152A1B] line-clamp-1 group-hover:text-[#2C6E49] transition"
            title={item.name}
          >
            {item.name}
          </h3>
          <p className="text-[10px] font-medium text-[#2C6E49] line-clamp-1">
            {item.regional?.split('(')[0]?.trim() || 'Hyderabad Hub'}
          </p>
          <p className="text-[10px] text-[#6B7E70] line-clamp-1">{item.biomarker}</p>
        </div>
      </div>

      <div className="pt-2 mt-2 border-t border-[#F0F4F1] flex items-center justify-between gap-1.5">
        <div>
          <span className="text-sm font-extrabold text-[#152A1B]">₹{item.price}</span>
          <span className="text-[9px] text-[#7A8C7E] ml-0.5">/{isBowl ? '280g' : '80g'}</span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(item, 1);
          }}
          className={`px-2.5 py-1.5 rounded-full text-[10px] font-bold flex items-center space-x-1 transition shrink-0 ${
            highlighted
              ? 'bg-[#153B2B] text-white hover:bg-[#0E291D]'
              : 'bg-[#F2F6F3] hover:bg-[#153B2B] text-[#152A1B] hover:text-white border border-[#DCE6DF]'
          }`}
        >
          <Plus size={11} />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
