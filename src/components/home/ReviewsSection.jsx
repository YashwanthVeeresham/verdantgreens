import React, { useState } from 'react';
import { Quote, MessageSquarePlus } from 'lucide-react';
import StarRating from '../ui/StarRating';
import ReviewForm from './ReviewForm';
import { useStore } from '../../context/StoreContext';

export default function ReviewsSection() {
  const { reviews } = useStore();
  const [formOpen, setFormOpen] = useState(false);
  const featured = reviews[0];
  const secondary = reviews.slice(1, 3);

  return (
    <section className="pt-4 border-t border-[#E6ECE7] space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#2C6E49]">
            Hyderabad Community Harvest Notes
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#152A1B] mt-1">Loved Across Hyderabad Kitchens</h2>
        </div>
        <button
          type="button"
          onClick={() => setFormOpen((o) => !o)}
          className="self-start sm:self-auto px-4 py-2 rounded-full bg-white border border-[#DCE6DF] hover:bg-[#F4F7F5] text-xs font-bold text-[#152A1B] flex items-center space-x-2 shadow-2xs transition"
        >
          <MessageSquarePlus size={15} className="text-[#2C6E49]" />
          <span>{formOpen ? 'Close Review Form' : 'Write a Review'}</span>
        </button>
      </div>

      {formOpen && <ReviewForm onDone={() => setFormOpen(false)} />}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-fr">
        {featured && (
          <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-gradient-to-br from-[#2B6E52] to-[#153B2B] text-white p-6 shadow-md flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 text-[#B8F5B1]">
                  Featured Subscriber Story
                </span>
                <Quote size={24} className="text-[#B8F5B1]/50" />
              </div>
              <StarRating value={featured.rating} size={14} />
              <p className="font-serif text-lg sm:text-xl font-light leading-relaxed text-white">
                &ldquo;{featured.comment}&rdquo;
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/15 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#B8F5B1] text-[#153B2B] font-bold text-sm flex items-center justify-center">
                {featured.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-xs text-white">{featured.name}</p>
                <p className="text-[11px] text-[#B8F5B1]">
                  {featured.locality} • {featured.role}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="md:col-span-2 rounded-3xl bg-[#E9F5EC] border border-[#CFE6D5] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-serif text-xl font-bold text-[#152A1B] block">Clean Greens, Good Mood</span>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-3xl font-bold text-[#153B2B]">4.9</span>
              <div>
                <StarRating value={5} />
                <p className="text-[11px] text-[#4C6553] font-semibold">480+ Hyderabad morning deliveries</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center shrink-0">
            {[
              ['5:00 AM', 'Harvest'],
              ['100%', 'RO Clean']
            ].map(([value, label]) => (
              <div key={label} className="bg-white px-3 py-2 rounded-2xl">
                <p className="font-serif text-base font-bold text-[#153B2B]">{value}</p>
                <p className="text-[9px] text-[#687A6D] font-bold uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {secondary.map((rev) => (
          <div
            key={rev.id}
            className="md:col-span-1 rounded-3xl bg-white border border-[#E6ECE7] p-4 shadow-2xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <StarRating value={rev.rating} size={12} />
                <span className="text-[10px] text-[#8A9B8E]">{rev.date}</span>
              </div>
              <p className="text-xs text-[#2C3E31] leading-relaxed">&ldquo;{rev.comment}&rdquo;</p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F0F4F1] flex items-center justify-between text-[11px]">
              <span className="font-bold text-[#152A1B]">{rev.name}</span>
              <span className="text-[#687A6D]">{rev.locality}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
